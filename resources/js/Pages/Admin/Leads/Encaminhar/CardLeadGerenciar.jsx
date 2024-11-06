import CardBody from "@/Components/Cards/CardBody.jsx";
import {Divider, Grid, Stack, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CampoTexto from "@/Components/CampoTexto.jsx";
import {TbBrandWhatsapp, TbFileStack, TbHash, TbHeadset, TbMapPin, TbPoint, TbUser, TbUserEdit} from "react-icons/tb";
import SetorIcone from "@/Components/Icons/SetorIcone.jsx";
import Chip from "@mui/material/Chip";
import LeadShow from "@/Pages/Geral/Leads/Dialogs/LeadShow.jsx";
import {Eye} from "react-bootstrap-icons";
import Avatar from "@mui/material/Avatar";
import React from "react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import Paper from "@mui/material/Paper";

const CardLeadGerenciar = ({lead, leadsChecked, handleToggle}) => {
    return (
        <CardContainer key={lead.id}>
            <CardBody>
                <Grid container>
                    <Grid xs={12} md={1} textAlign="center">
                        <Checkbox
                            edge="start" tabIndex={-1}
                            checked={leadsChecked.indexOf(lead.id) !== -1}
                            onChange={() => handleToggle(lead.id)}
                        />
                    </Grid>
                    <Grid xs={12} md={10}>
                        {lead.razao_social && <CampoTexto titulo="Razão Social" icone={TbUser} texto={lead.razao_social}/>}
                        {lead.nome && <CampoTexto titulo="Nome/Nome Fantasia" icone={TbUser} texto={lead.nome}/>}
                        <Divider sx={{marginBottom: 1}}/>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                {/*<CampoTexto titulo="Status" icone={TbPoint} texto={<Chip*/}
                                {/*    className="mb-3 mt-2"*/}
                                {/*    label={lead.status_nome.nome}*/}
                                {/*    variant="outlined" sx={{borderColor: lead.status_nome.cor, color: lead.status_nome.cor}}*/}
                                {/*    size="small"/>}/>*/}
                                <Chip
                                    className="mb-3 mt-2"
                                    label={lead.status_nome.nome}
                                    variant="outlined" sx={{borderColor: lead.status_nome.cor, color: lead.status_nome.cor}}
                                    size="small"/>
                                <CampoTexto titulo="ID" icone={TbHash} texto={`#${lead.id}`}/>
                                <CampoTexto titulo="Setor" icone={SetorIcone} texto={lead.setor}/>
                                <CampoTexto titulo="CNPJ" icone={TbFileStack} texto={lead.cnpj}/>
                                <CampoTexto titulo="Localidade" icone={TbMapPin} texto={lead.cidade_estado}/>
                            </Grid>
                            <Grid item xs={12} md={2}>


                            </Grid>
                            <Grid item xs={12} md={2}>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} md={1} textAlign="center">
                        <LeadShow leadId={lead.id} iconButton={<Eye size={20} color="black"/>}/>
                    </Grid>
                </Grid>

                {/*Contatos*/}
                <Grid container>
                    <Grid xs={12} md={1}>
                    </Grid>
                    <Grid xs={12} md={10}>
                        <Divider sx={{marginBlock: 2}}/>
                        <Grid container alignItems="center">
                            <CampoTexto titulo="Contatos" icone={TbHeadset}/>
                            {lead?.telefones?.map(telefone => (
                                <Grid item key={telefone.id} marginInlineStart={2}>
                                    <Paper variant="outlined" sx={{padding: 1}}>
                                        <Stack spacing={1} direction="row" alignItems="center">
                                            <TbBrandWhatsapp size={20} color={telefone.status_whatsapp === 0 ? 'gray' : 'green'}/>
                                            <Typography variant="body1">{telefone.telefone}</Typography>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>

                    </Grid>
                </Grid>

                <Grid container>
                    <Grid xs={12} md={1}>
                    </Grid>
                    <Grid xs={12} md={10}>
                        <Divider sx={{marginBlock: 2}}/>
                        <CampoTexto
                            titulo="Consultor(a) em Atendimento Atualmente"
                            icone={TbUserEdit}
                            texto={lead.consultor ? <Stack direction="row" spacing={1}>
                                <Avatar src={lead.consultor_avatar} sx={{width: 25, height: 25}}/>
                                <Typography>{lead.consultor}</Typography>
                            </Stack> : <Typography>Sem Consultor(a)</Typography>}
                        />
                    </Grid>
                </Grid>

                {(lead.classificacao || lead.pedido_emitido || lead.enriquecido) && (
                    <Grid container>
                        <Grid xs={12} md={1}>
                        </Grid>
                        <Grid xs={12} md={10}>
                            <Divider sx={{marginBlock: 2}}/>
                            <Stack direction="row" spacing={2}>
                                {lead.classificacao && <Typography>{lead.classificacao}</Typography>}
                                {lead.pedido_emitido &&
                                    <Chip label={`Pedido Emitido em ${lead.pedido_data} há ${lead.pedido_periodo} dias`} size="small"/>}
                                {lead.enriquecido && <Chip label="Enriquecido" size="small"/>}
                            </Stack>
                        </Grid>
                    </Grid>
                )}

                {/*info extras*/}
                <Grid container marginBottom={1}>
                    <Grid item xs={12} md={1}>
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <Divider sx={{marginBlock: 2}}/>
                        <Grid container gap={3}>
                            <Grid item>
                                <Typography variant="body2">Status atual desde: {lead.status_data}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">Cadastro: {lead.data_criacao}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardBody>
        </CardContainer>
    )
}
export default CardLeadGerenciar
