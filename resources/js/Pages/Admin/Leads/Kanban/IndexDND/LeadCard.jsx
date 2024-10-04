import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Avatar, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { ArrowDownShort, Box, Eye, ForwardFill, GeoAlt, Hash, Pencil, PersonFill, PersonVideo2, PinAngle, PinAngleFill, Stopwatch } from 'react-bootstrap-icons';
import Tooltip from '@mui/material/Tooltip';
import LinearProgress from '@mui/material/LinearProgress';
import ChatWhatsapp from '@/Components/Chats/Whatsapp/ChatWhatsapp/ChatWhatsapp.jsx';
import AbrirTelefone from '@/Components/Chats/Telefone/AbrirTelefone.jsx';
import AbrirEmail from '@/Components/Chats/Email/AbrirEmail.jsx';
import Link from '@/Components/Link.jsx';
import { round } from 'lodash';
import styled from 'styled-components';

const Card = styled.div`
    border-radius: 15px;
    overflow-wrap: break-word;
    margin-bottom: 2rem;
    background-color: ${(props) => props.bgColor || 'white'};
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.05);
    border-left: 3px solid ${(props) => props.border || 'white'};
`;

const LeadCard = ({ lead }) => {

    const razao_social = lead?.dados?.razao_social;
    const nome = lead?.dados?.nome;
    const cnpj = lead?.cnpj;
    const cpf = lead?.cpf;
    const id = lead?.id;
    const telefones = [];
    const consultor = lead?.vendedor?.nome;
    const avatar = lead?.vendedor?.avatar;
    const status_data = '';
    const classificacao = '';
    const setor = lead?.setor?.nome;
    const cidade = 'CIDADE';
    const estado = 'ESTADO';
    const status_prazo = 'ESTADO';
    const cor = 'red';
    const prazo = 15;

    const margemPrazo = round((1 + status_prazo / prazo) * 100);


    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: lead.id,
        data: lead,
    });

    const style = {
        transform: `translate3d(${transform?.x ?? 0}px, ${transform?.y ?? 0}px, 0)`,
    };

    const [openModalConfirmStatus, setOpenModalConfirmStatus] = useState();
    const handleOpen = () => setOpenModalConfirmStatus(true);
    const handleClose = () => setOpenModalConfirmStatus(false);

    return (
        // <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="lead-card">
            <Card border={cor}>
                <div style={{ width: 300, padding: '20px' }}>
                    <Grid container spacing={2}>
                        {/* Coluna da esquerda com o conteúdo principal */}
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
                                        <Typography>{cidade ?? '-'}/{estado ?? '-'}</Typography>
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
                                            {setor ?? '-'}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Tooltip>

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
                                        {avatar && <Avatar src={avatar ?? ''} sx={{ width: 25, height: 25 }} />}
                                        <Tooltip title="Consultor(a)" placement="top-start" arrow>
                                            <Typography>{consultor ?? '-'}</Typography>
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
                                        <Stack marginTop={1} alignContent={'end'} textAlign={'end'}>
                                            <LinearProgress variant="determinate" color="inherit" value={margemPrazo} />
                                            <Typography variant="body2">{`restam ${prazo + status_prazo} de ${prazo} dias`}</Typography>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Tooltip>

                            <Divider sx={{ marginTop: 2 }} color="#fafafa" />

                            <Stack direction="row" spacing={2} marginTop={2}>
                                {/*<AbrirChatWhatsapp telefones={telefones} leadId={id} atualizarCards={atualizarCards} />*/}
                                {/*<AbrirTelefone telefones={telefones} atualizarCards={atualizarCards} />*/}
                                <AbrirEmail />
                                {/*<Hourglass size={25}/>*/}
                                {/*{index}*/}
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

                            {/*<Divider sx={{marginTop: 2}}/>*/}

                            {/*<Stack direction="row" spacing={2} marginTop={2}>*/}
                            {/*    <Typography variant="body2">Origem:</Typography>*/}
                            {/*    <Chip label="Instagram" size="small" variant="outlined"/>*/}
                            {/*</Stack>*/}
                        </Grid>

                        {/* Coluna da direita com o ícone, centralizado */}
                        <Grid item xs={1} container>
                            <Stack spacing={1} alignItems="center">
                                <IconButton onClick={handleOpen}>
                                    <ForwardFill size={50} color="green" />
                                </IconButton>
                                <Link href={route('auth.leads.show', id)} icon={<Eye size={20} color="black" />} />

                                {/*{emitePedidos && <Link href={route('auth.pedidos.create', { lead_id: id })} icon={<Box size={18} color="black" />} />}*/}

                                {/*{pin*/}
                                {/*    ? <IconButton*/}
                                {/*        onClick={() => {*/}
                                {/*            setPin(e => !e)*/}
                                {/*            armazenarStatusPinCard()*/}
                                {/*        }}>*/}
                                {/*        <PinAngleFill color="red" size={18} />*/}
                                {/*    </IconButton>*/}
                                {/*    : <IconButton*/}
                                {/*        onClick={() => {*/}
                                {/*            setPin(e => !e)*/}
                                {/*            armazenarStatusPinCard()*/}
                                {/*        }}>*/}
                                {/*        <PinAngle color="black" size={18} />*/}
                                {/*    </IconButton>}*/}
                            </Stack>
                        </Grid>
                    </Grid>
                </div>
            </Card>
        // </div>
    );
};

export default LeadCard;
