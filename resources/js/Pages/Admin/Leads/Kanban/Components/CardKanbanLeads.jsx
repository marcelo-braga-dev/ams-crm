import React, { useState } from 'react';
import { Grid, Stack, Typography, Divider, IconButton, Avatar } from '@mui/material';
import {
    ArrowDownShort, Box, Dot,
    Eye,
    ForwardFill, Geo, GeoAlt,
    Hash,
    Pencil,
    PersonFill,
    PersonVideo2,
    PinAngle,
    PinAngleFill, Stopwatch,
    TicketFill,
} from 'react-bootstrap-icons';

import AbrirChatWhatsapp from '@/Components/Chats/Whatsapp/AbrirChatWhatsapp.jsx';
import AbrirTelefone from '@/Components/Chats/Telefone/AbrirTelefone.jsx';
import Link from '@/Components/Link.jsx';
import AbrirEmail from '@/Components/Chats/Email/AbrirEmail.jsx';
import Tooltip from '@mui/material/Tooltip';
import DialogMui from '@/Components/Modals/DialogMui.jsx';
import { router } from '@inertiajs/react';
import styled from 'styled-components';
import LinearProgress from '@mui/material/LinearProgress';
import { round } from 'lodash';
import { TbArrowBigRightFilled } from 'react-icons/tb';
import LeadShow from '@/Pages/Geral/Pedidos/LeadShow.jsx';

const Card = styled.div`
    border-radius: 10px;
    overflow-wrap: break-word;
    margin-bottom: 2rem;
    background-color: ${(props) => props.bgColor || 'white'};
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border: 1px solid #eee;
    border-left: 2px solid ${(props) => props.border || 'white'};

`;

const CardKanbanLeads = ({ card, emitePedidos, atualizarCards, cor, urlAvancarStatus, prazoDias }) => {
    const {
        razao_social, nome, cnpj, cpf, id, telefones, consultor, status_data, classificacao,
        setor,
    } = card;

    const [openModalConfirmStatus, setOpenModalConfirmStatus] = useState();
    const handleOpen = () => setOpenModalConfirmStatus(true);
    const handleClose = () => setOpenModalConfirmStatus(false);

    const [pin, setPin] = useState(false);
    const armazenarStatusPinCard = () => {
        axios.post(route('auth.pins.leads'), { lead_id: id });
    };

    const avancarStatus = () => {
        router.post(route(urlAvancarStatus, id));
        handleClose();
        atualizarCards();
    };

    const prazoRestante = prazoDias + card.status_prazo

    const margemPrazo = round((1 + card.status_prazo / prazoDias) * 100);

    const margemPrazoStatus = prazoRestante < 0 ? 100 : margemPrazo;

    return (
        <Card border={cor}>

            <div style={{ width: 350, padding: '20px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={11}>
                        {/*nome e razao social*/}
                        <Grid container spacing={3} marginBottom={1} alignItems="center">
                            <Grid item xs={1}>
                                <PersonFill size={20} />
                            </Grid>
                            <Grid item xs={11}>
                                <Tooltip title="Nome/Razão Social do Lead" placement="top-start" arrow>
                                    <Typography
                                        fontWeight="bold"
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
                                <PersonVideo2 size={18} />
                            </Grid>
                            <Grid item xs={11}>
                                <Tooltip title="Documentos do lead" arrow>
                                    {cnpj || cpf ? (
                                        <Stack>
                                            <Typography>{cnpj}</Typography>
                                            <Typography>{cpf}</Typography>
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
                                <GeoAlt size={18} />
                            </Grid>
                            <Grid item xs={10}>
                                <Tooltip title="Localidade" arrow>
                                    <Typography>{card.cidade_estado?.cidade ?? '-'}/{card.cidade_estado?.estado ?? '-'}</Typography>
                                </Tooltip>
                            </Grid>
                        </Grid>

                        {/*setor*/}
                        <Tooltip title="Setor" arrow>
                            <Grid container spacing={3} marginBottom={1} alignItems="center">
                                <Grid item xs={1}>
                                    <Box size={18} />
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography>
                                        {/*<Dot size={30}  color={setor.cor ?? 'black'}/>*/}
                                        {setor.nome ?? '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Tooltip>
                    </Grid>

                    {/* Coluna da direita com o ícone, centralizado */}
                    <Grid item xs={1} container>
                        <Stack spacing={3} alignItems="center">
                            <LeadShow leadId={id} iconButton={<Eye size={20} color="black" />} />

                            {emitePedidos && <Link href={route('auth.pedidos.create', { lead_id: id })} icon={<Box size={18} color="black" />} />}

                            {pin
                                ? <IconButton
                                    onClick={() => {
                                        setPin(e => !e);
                                        armazenarStatusPinCard();
                                    }}>
                                    <PinAngleFill color="red" size={18} />
                                </IconButton>
                                : <IconButton
                                    onClick={() => {
                                        setPin(e => !e);
                                        armazenarStatusPinCard();
                                    }}>
                                    <PinAngle color="black" size={18} />
                                </IconButton>}
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ marginBlock: 2 }} color="#fafafa" />

                {/*vendedor*/}
                <Grid container spacing={3} marginBottom={1} alignItems="center">
                    <Grid item xs={1}>
                        <Tooltip title="Consultor(a)" placement="left">
                            <Pencil size={16} />
                        </Tooltip>
                    </Grid>
                    <Grid item xs={11}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            {consultor.foto && <Avatar src={consultor.foto ?? ''} sx={{ width: 25, height: 25 }} />}
                            <Tooltip title="Consultor(a)" placement="top-start" arrow>
                                <Typography>{consultor.nome ?? '-'}</Typography>
                            </Tooltip>
                        </Stack>
                    </Grid>
                </Grid>

                <Divider sx={{ marginBlock: 2 }} color="#fafafa" />

                {/*prazo atendimento*/}
                <Tooltip title="Prazo para atendimento" placement="bottom-start" arrow>
                    <Grid container spacing={3} marginBottom={1}>
                        <Grid item xs={1}>
                            <Stopwatch size={18} />
                        </Grid>
                        <Grid item xs={11} style={{ color: margemPrazo > 75 ? 'red' : 'inherit' }}>
                            <Stack marginTop={1} alignContent="end" textAlign="end">
                                <LinearProgress variant="determinate" color="inherit" value={margemPrazoStatus} />
                                <Typography variant="body2">{`restam ${prazoRestante} de ${prazoDias} dias`}</Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Tooltip>

                <Divider sx={{ marginTop: 2 }} color="#fafafa" />

                <Stack direction="row" spacing={2} marginTop={2} justifyContent="space-between">
                    <Stack direction="row" spacing={2}>
                        <AbrirChatWhatsapp telefones={telefones} leadId={id} atualizarCards={atualizarCards} />
                        <AbrirTelefone telefones={telefones} atualizarCards={atualizarCards} />
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
                <Stack direction="row" spacing={2} alignItems="center">
                    <Stack direction="row" spacing={0} alignItems="center">
                        <Hash size={16} />
                        <Typography variant="body2">{id}</Typography>
                    </Stack>

                    <Typography variant="body2">{classificacao}</Typography>

                    <Stack direction="row" spacing={0}>
                        <ArrowDownShort size={20} />
                        <Typography variant="body2">{status_data}</Typography>
                    </Stack>
                </Stack>
            </div>

            <DialogMui
                content={
                    <Stack>
                        <Typography>CONFIRMAR O AVANCO DO STATUS DO LEAD</Typography>
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

export default CardKanbanLeads;
