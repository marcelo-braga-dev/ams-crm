import CardBody from "@/Components/Cards/CardBody.jsx";
import {Divider, Grid, Stack, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CampoTexto from "@/Components/CampoTexto.jsx";
import {TbBrandWhatsapp, TbFileStack, TbHash, TbHeadset, TbMapPin, TbUser, TbUserEdit} from "react-icons/tb";
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
                    <Grid item xs={12} md={1} textAlign="center">
                        <Checkbox
                            edge="start" tabIndex={-1}
                            checked={leadsChecked.indexOf(lead.id) !== -1}
                            onChange={() => handleToggle(lead.id)}
                        />
                    </Grid>
                    <Grid item xs={12} md={10}>
                        {lead.razao_social && <CampoTexto titulo="Razão Social" icone={TbUser} texto={lead.razao_social}/>}
                        {lead.nome && <CampoTexto titulo="Nome/Nome Fantasia" icone={TbUser} texto={lead.nome}/>}
                        <Divider sx={{marginBottom: 1}}/>
                        <Chip
                            label={lead.status_nome.nome}
                            variant="outlined"
                            sx={{borderColor: lead.status_nome.cor, color: lead.status_nome.cor, marginBottom: 3, marginTop: 2}}
                            size="small"/>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <CampoTexto titulo="CNPJ" icone={TbFileStack} texto={lead.cnpj}/>
                                <CampoTexto titulo="Localidade" icone={TbMapPin} texto={lead.cidade_estado} small/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CampoTexto titulo="ID" icone={TbHash} texto={`#${lead.id}`}/>
                                <CampoTexto titulo="Setor" icone={SetorIcone} texto={lead.setor}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={1} textAlign="center">
                        <LeadShow leadId={lead.id} iconButton={<Eye size={20} color="black"/>}/>
                    </Grid>
                </Grid>

                {/*Contatos*/}
                <Grid container>
                    <Grid item xs={12} md={1}>
                    </Grid>
                    <Grid item xs={12} md={10}>
                        <Divider sx={{marginBlock: 2}}/>
                        <Grid container alignItems="center">
                            <CampoTexto titulo="Contatos" icone={TbHeadset}/>
                            {lead?.telefones?.map(telefone => (
                                <Grid item key={telefone.id} marginInlineStart={2}>
                                    <Paper variant="outlined" sx={{padding: 1}}>
                                        <Stack spacing={1} direction="row" alignItems="center">
                                            <TbBrandWhatsapp size={20} color={telefone.status_whatsapp === 0 ? 'gray' : 'green'}/>
                                            <Typography variant="body1">{telefone.telefone}</Typography>
                                            <Typography variant="body1" fontWeight={300}>{telefone.contato_nome}</Typography>
                                        </Stack>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12} md={1}>
                    </Grid>
                    <Grid item xs={12} md={10}>
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
                        <Grid item xs={12} md={1}>
                        </Grid>
                        <Grid item xs={12} md={10}>
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
