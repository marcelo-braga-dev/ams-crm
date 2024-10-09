import React, { useState } from 'react';
import { Grid, Stack, Typography, Divider, IconButton, Avatar } from '@mui/material';
import {
    ArrowDownShort, Box, Hash,
} from 'react-bootstrap-icons';

import ChatWhatsapp from '@/Components/Chats/Whatsapp/ChatWhatsapp/ChatWhatsapp.jsx';
import AbrirTelefone from '@/Components/Chats/Telefone/AbrirTelefone.jsx';
import Link from '@/Components/Link.jsx';
import AbrirEmail from '@/Components/Chats/Email/AbrirEmail.jsx';
import Tooltip from '@mui/material/Tooltip';
import DialogMui from '@/Components/Modals/DialogMui.jsx';
import { router } from '@inertiajs/react';
import styled from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';
import { round } from 'lodash';
import {
    TbArrowBigRightFilled, TbArrowNarrowDown,
    TbBox, TbClockHour5,
    TbEye, TbFileDollar, TbFileInvoice,
    TbFiles, TbHash, TbInvoice,
    TbMapPin,
    TbPin,
    TbPinFilled,
    TbUser,
} from 'react-icons/tb';
import LeadShow from '@/Pages/Geral/Leads/Dialogs/LeadShow.jsx';
import { useFunilVendas } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import Chip from '@mui/material/Chip';

const Card = styled.div`
    border-radius: 10px;
    overflow-wrap: break-word;
    margin-bottom: 2rem;
    background-color: ${(props) => props.bgColor || 'white'};
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border: 1px solid #eee;
    border-left: 2px solid ${(props) => props.border || 'white'};

`;

const CardFunilVendas = ({ card, emitePedidos, cor, urlAvancarStatus, prazoDias }) => {
    const {
        razao_social, nome, cnpj, cpf, id, telefones, consultor, status_data, classificacao,
        setor, ultimo_pedido,
    } = card;

    const { handleAtualizar } = useFunilVendas();

    const [openModalConfirmStatus, setOpenModalConfirmStatus] = useState();
    const handleOpen = () => setOpenModalConfirmStatus(true);
    const handleClose = () => setOpenModalConfirmStatus(false);

    const [pin, setPin] = useState(false);
    const armazenarStatusPinCard = () => {
        axios.post(route('auth.pins.leads'), { lead_id: id });
    };

    const avancarStatus = () => {
        router.post(route(urlAvancarStatus, id));
        handleAtualizar();
        handleClose();
    };

    // card.status_prazo = 2;
    const prazoStatus = card.status_prazo;
    const prazoRestante = prazoDias + prazoStatus;
    const margemPrazo = round(prazoStatus / prazoDias * 100);
    const margemPrazoStatus = prazoRestante <= 0 ? 100 : (margemPrazo * -1);

    return (
        <Card border={cor}>
            <div style={{ width: 290, padding: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={11}>
                        {/*nome e razao social*/}
                        <Grid container spacing={3} marginBottom={1} alignItems="center">
                            <Grid item md={1}>
                                <TbUser size={17} />
                            </Grid>
                            <Grid item md={10}>
                                <Tooltip title="Nome/Razão Social do Lead" placement="top-start" arrow>
                                    <Typography
                                        fontWeight="bold"
                                        variant="body2"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {razao_social || nome}
                                    </Typography>
                                </Tooltip>
                            </Grid>
                        </Grid>

                        {/*cnpj || cpf*/}
                        <Grid container spacing={3} marginBottom={1} alignItems="center">
                            <Grid item xs={1}>
                                <TbFiles size={18} />
                            </Grid>
                            <Grid item xs={10}>
                                <Tooltip title="Documentos do lead" arrow>
                                    {cnpj || cpf ? (
                                        <Stack>
                                            <Typography variant="body2">{cnpj}</Typography>
                                            <Typography variant="body2">{cpf}</Typography>
                                        </Stack>
                                    ) : (
                                        <Typography variant="body2">-</Typography>
                                    )}
                                </Tooltip>
                            </Grid>
                        </Grid>

                        {/*localidade*/}
                        <Grid container spacing={3} marginBottom={1} alignItems="center">
                            <Grid item xs={1}>
                                <TbMapPin size={17} />
                            </Grid>
                            <Grid item xs={10}>
                                <Tooltip title="Localidade" arrow>
                                    <Typography variant="body2">{card.cidade_estado?.cidade ?? '-'}/{card.cidade_estado?.estado ?? '-'}</Typography>
                                </Tooltip>
                            </Grid>
                        </Grid>

                        {/*setor*/}
                        <Tooltip title="Setor" arrow>
                            <Grid container spacing={3} marginBottom={1} alignItems="center">
                                <Grid item xs={1}>
                                    <TbBox size={18} />
                                </Grid>
                                <Grid item xs={10}>
                                    <Typography variant="body2">
                                        {setor.nome ?? '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Tooltip>
                    </Grid>

                    {/* Coluna da direita com o ícone, centralizado */}
                    <Grid item xs={1} container>
                        <Stack spacing={3} alignItems="center">
                            <LeadShow leadId={id} iconButton={<TbEye size={18} color="#555" />} />

                            {emitePedidos && <Link href={route('auth.pedidos.create', { lead_id: id })} icon={<Box size={18} color="black" />} />}

                            {pin
                                ? <IconButton
                                    onClick={() => {
                                        setPin(e => !e);
                                        armazenarStatusPinCard();
                                    }}>
                                    <TbPinFilled color="red" size={18} />
                                </IconButton>
                                : <IconButton
                                    onClick={() => {
                                        setPin(e => !e);
                                        armazenarStatusPinCard();
                                    }}>
                                    <TbPin size={17} color="#555" />
                                </IconButton>}
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ marginBlock: 1 }} color="#fafafa" />

                {/*vendedor*/}
                <Grid container spacing={3} marginBottom={1} alignItems="center">
                    <Grid item xs={10}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Avatar src={consultor.avatar ?? ''} sx={{ width: 23, height: 23 }} />
                            <Tooltip title="Consultor(a)" placement="top-start" arrow>
                                <Typography variant="body2">{consultor.nome ?? '-'}</Typography>
                            </Tooltip>
                        </Stack>
                    </Grid>
                </Grid>

                {/*prazo atendimento*/}
                {prazoDias > 0 && <>
                    <Divider sx={{ marginBlock: 1 }} color="#fafafa" />

                    <Tooltip title="Prazo para atendimento" placement="bottom-start" arrow>
                        <Grid container spacing={3} marginBottom={1}>
                            <Grid item xs={1}>
                                <TbClockHour5 size={18} className="mb-1" />
                            </Grid>
                            <Grid item xs={10} style={{ color: margemPrazo > 75 ? 'red' : 'inherit' }}>
                                <Stack marginTop={1} alignContent="end" textAlign="end">
                                    <LinearProgress variant="determinate" color={margemPrazoStatus >= 75 ? 'error' : 'inherit'} value={margemPrazoStatus} />
                                    <Typography variant="body2">{`restam ${prazoRestante < 0 ? 0 : prazoRestante} de ${prazoDias} dias`}</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Tooltip>
                </>}

                <Divider sx={{ marginTop: 2 }} color="#fafafa" />

                {/*Conatatos*/}
                <Stack direction="row" spacing={2} marginTop={2} justifyContent="space-between">
                    <Stack direction="row" spacing={2}>
                        <ChatWhatsapp telefones={telefones} leadId={id} />
                        <AbrirTelefone telefones={telefones} />
                        <AbrirEmail />
                    </Stack>
                    <Stack direction="row">
                        {urlAvancarStatus && <IconButton onClick={handleOpen}>
                            <TbArrowBigRightFilled size={25} color="green" />
                        </IconButton>}
                    </Stack>
                </Stack>

                <Divider sx={{ marginBlock: 2 }} color="#fafafa" />

                {/*rodape*/}
                <Stack direction="row" spacing={4} alignItems="center">
                    <Stack direction="row" spacing={0} alignItems="center">
                        <TbHash size={14} />
                        <Typography variant="body2">{id}</Typography>
                    </Stack>
                    <Typography variant="body2">{classificacao}</Typography>
                </Stack>
                {ultimo_pedido > 0 && (
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" marginTop={2}>
                        <Chip icon={<TbFileDollar size={18} />} label={`Último pedido há ${ultimo_pedido} dias`}  size="small"
                              color={ultimo_pedido > 15 ? 'error' : 'success'} />
                    </Stack>
                )}

            </div>

            <DialogMui
                content={
                    <Stack>
                        <Typography>CONFIRMAR O AVANCO DO STATUS DO LEAD?</Typography>
                        <Typography>ID DO LEAD: #{id}</Typography>
                        <Typography>LEAD: {razao_social || nome}</Typography>
                    </Stack>
                }
                open={openModalConfirmStatus} title="AVANÇAR STATUS"
                onConfirm={avancarStatus}
                href={route(urlAvancarStatus, id)}
                onClose={handleClose} />
        </Card>
    );
};

export default CardFunilVendas;
