import React, {useState} from 'react';
import {Grid, Stack, Typography, Divider, IconButton, Avatar} from "@mui/material";
import {
    ArrowDownShort, Box,
    Eye,
    ForwardFill, Geo, GeoAlt,
    Hash,
    Pencil,
    PersonFill,
    PersonVideo2,
    PinAngle,
    PinAngleFill,
    TicketFill
} from "react-bootstrap-icons";
import CardContainer from "@/Components/Cards/CardContainer";
import AbrirChatWhatsapp from "@/Components/Chats/Whatsapp/AbrirChatWhatsapp.jsx";
import AbrirTelefone from "@/Components/Chats/Telefone/AbrirTelefone.jsx";
import Link from "@/Components/Link.jsx";
import AbrirEmail from "@/Components/Chats/Email/AbrirEmail.jsx";
import Tooltip from "@mui/material/Tooltip";
import DialogMui from "@/Components/Modals/DialogMui.jsx";
import {router} from "@inertiajs/react";

const CardKanbanLeads = ({item, emitePedidos, atualizarCards}) => {
    const {
        razao_social, nome, cnpj, cpf, id, telefones, consultor, status_data, status_data_dias, classificacao,
        setor, avancar_status_url, index
    } = item

    const [openModalConfirmStatus, setOpenModalConfirmStatus] = useState()
    const handleOpen = () => setOpenModalConfirmStatus(true)
    const handleClose = () => setOpenModalConfirmStatus(false)

    const [pin, setPin] = useState(false)
    const armazenarStatusPinCard = () => {
        axios.post(route('auth.pins.leads'), {lead_id: id})
    }

    const avancarStatus = () => {
        router.post(route(avancar_status_url, id))
        handleClose()
        atualizarCards()
    }

    return (
        <CardContainer>
            <div style={{width: 350, padding: '20px'}}>
                <Grid container spacing={2}>
                    {/* Coluna da esquerda com o conteúdo principal */}
                    <Grid item xs={11}>
                        {/*nome e razao social*/}
                        <Grid container spacing={3} marginBottom={1} alignItems="center">
                            <Grid item xs={1}>
                                <PersonFill size={20}/>
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
                                <PersonVideo2 size={18}/>
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
                            <Grid item xs={11}>
                                <Tooltip title="Setor" placement="bottom-start" arrow>
                                    <Typography>CIDADE/ESTADO</Typography>
                                </Tooltip>
                            </Grid>
                        </Grid>

                        {/*setor*/}
                        <Grid container spacing={3} marginBottom={1} alignItems="center">
                            <Grid item xs={1}>
                                <TicketFill size={18} color={setor.cor ?? 'black'}/>
                            </Grid>
                            <Grid item xs={11}>
                                <Tooltip title="Setor" placement="bottom-start" arrow>
                                    <Typography>{setor.nome ?? '-'}</Typography>
                                </Tooltip>
                            </Grid>
                        </Grid>

                        <Divider sx={{marginBlock: 2}}/>

                        {/*vendedor*/}
                        <Grid container spacing={3} marginBottom={1} alignItems="center">
                            <Grid item xs={1}>
                                <Tooltip title="Consultor(a)" placement="left">
                                    <Pencil size={16}/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={11}>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    {consultor.foto && <Avatar src={consultor.foto ?? ''} sx={{width: 25, height: 25}}/>}
                                    <Tooltip title="Consultor(a)" placement="top-start" arrow>
                                        <Typography>{consultor.nome ?? '-'}</Typography>
                                    </Tooltip>
                                </Stack>
                            </Grid>
                        </Grid>

                        <Divider sx={{marginTop: 2}}/>

                        <Stack direction="row" spacing={2} marginTop={2}>
                            <AbrirChatWhatsapp telefones={telefones} leadId={id} atualizarCards={atualizarCards}/>
                            <AbrirTelefone telefones={telefones} atualizarCards={atualizarCards}/>
                            <AbrirEmail/>
                            {/*<Hourglass size={25}/>*/}
                            {/*{index}*/}
                        </Stack>

                        <Divider sx={{marginBlock: 2}}/>

                        <Stack direction="row" spacing={2} alignItems="center">
                            <Stack direction="row" spacing={0} alignItems="center">
                                <Hash size={16}/>
                                <Typography variant="body2">{id}</Typography>
                            </Stack>

                            <Typography variant="body2">{classificacao}</Typography>

                            <Stack direction="row" spacing={0}>
                                <ArrowDownShort size={20}/>
                                <Typography variant="body2">{status_data} há {status_data_dias} dias</Typography>
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
                                <ForwardFill size={50} color="green"/>
                            </IconButton>
                            <Link href={route('auth.leads.show', id)} icon={<Eye size={20} color="black"/>}/>

                            {emitePedidos && <Link href={route('auth.pedidos.create', {lead_id: id})} icon={<Box size={18} color="black"/>}/>}

                            {pin
                                ? <IconButton
                                    onClick={() => {
                                        setPin(e => !e)
                                        armazenarStatusPinCard()
                                    }}>
                                    <PinAngleFill color="red" size={18}/>
                                </IconButton>
                                : <IconButton
                                    onClick={() => {
                                        setPin(e => !e)
                                        armazenarStatusPinCard()
                                    }}>
                                    <PinAngle color="black" size={18}/>
                                </IconButton>}

                        </Stack>
                    </Grid>
                </Grid>
            </div>
            <DialogMui
                content={
                    <Stack>
                        <Typography>CONFIRMAR O AVANCO DO STATUS: #{id}</Typography>
                        <Typography>LEAD: {razao_social || nome}</Typography>
                    </Stack>
                }
                open={openModalConfirmStatus} title="AVANÇAR STATUS"
                onConfirm={avancarStatus}
                href={route(avancar_status_url, id)}
                onClose={handleClose}/>
        </CardContainer>
    )
};

export default CardKanbanLeads;
