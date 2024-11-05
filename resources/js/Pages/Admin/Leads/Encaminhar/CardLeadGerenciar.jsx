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
                        <Divider sx={{marginBottom:1}}/>
                        <Grid container>
                            <Grid xs={12} md={6}>
                                <CampoTexto titulo="ID" icone={TbHash} texto={`#${lead.id}`}/>
                                <CampoTexto titulo="Setor" icone={SetorIcone} texto={lead.setor}/>
                                <CampoTexto titulo="CNPJ" icone={TbFileStack} texto={lead.cnpj}/>
                                <CampoTexto titulo="Localidade" icone={TbMapPin} texto={lead.cidade_estado}/>
                            </Grid>
                            <Grid xs={12} md={4}>
                                <Chip
                                    className="mb-3 mt-2"
                                    label={lead.status_nome.nome}
                                    variant="outlined" sx={{borderColor: lead.status_nome.cor, color: lead.status_nome.cor}}
                                    size="small"/>
                                <Typography variant="body2">Status: {lead.status_data}</Typography>
                                <Typography variant="body2">Cadastro: {lead.data_criacao}</Typography>
                            </Grid>
                            <Grid xs={12} md={2}>
                                <CampoTexto titulo="Contatos" icone={TbHeadset}/>
                                <Stack spacing={1}>
                                    {lead?.telefones?.map(telefone => (
                                        <Stack key={telefone.id} spacing={1} direction="row" alignItems="center">
                                            <TbBrandWhatsapp size={15} color={telefone.status_whatsapp === 0 ? 'gray' : 'green'}/>
                                            <Typography variant="body2">{telefone.telefone}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid xs={12} md={1} textAlign="center">
                        <LeadShow leadId={lead.id} iconButton={<Eye size={20} color="black"/>}/>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid xs={12} md={1}>
                    </Grid>
                    <Grid xs={12} md={10}>
                        <Divider sx={{marginBlock: 2}}/>
                        <CampoTexto
                            titulo="Consultor(a)"
                            icone={TbUserEdit}
                            texto={lead.consultor && <Stack direction="row" spacing={1}>
                                <Avatar src={lead.consultor_avatar} sx={{width: 25, height: 25}}/>
                                <Typography>{lead.consultor}</Typography>
                            </Stack>}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid xs={12} md={1}>
                    </Grid>
                    <Grid xs={12} md={10}>
                        {(lead.classificacao || lead.pedido_emitido || lead.enriquecido) && (
                            <div className="row mb-2">
                                <div className="col-auto" style={{width: 70}}/>
                                <div className="col">
                                    <Divider sx={{marginBlock: 2}}/>
                                    <Stack direction="row" spacing={2}>
                                        {lead.classificacao && <Typography>{lead.classificacao}</Typography>}
                                        {lead.pedido_emitido &&
                                            <Chip label={`Pedido Emitido em ${lead.pedido_data} há ${lead.pedido_periodo} dias`} size="small"/>}
                                        {lead.enriquecido && <Chip label="Enriquecido" size="small"/>}
                                    </Stack>
                                </div>
                            </div>
                        )}
                    </Grid>
                </Grid>
            </CardBody>
        </CardContainer>
    )
}
export default CardLeadGerenciar
