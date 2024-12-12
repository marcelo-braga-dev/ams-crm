import {useEncaminharLeads} from "@/Pages/Admin/Leads/Encaminhar/Context.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Divider, Grid2, Stack, Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CampoTexto from "@/Components/CampoTexto.jsx";
import {TbBrandWhatsapp, TbFileStack, TbHash, TbHeadset, TbMapPin, TbUser, TbUserEdit} from "react-icons/tb";
import Chip from "@mui/material/Chip";
import SetorIcone from "@/Components/Icons/SetorIcone.jsx";
import LeadShow from "@/Pages/Geral/Leads/Dialogs/LeadShow.jsx";
import {Eye} from "react-bootstrap-icons";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import React from "react";

const CardEncaminhar = () => {
    const {leads, checked, setChecked} = useEncaminharLeads()

    return (
        leads.map(item => (
                <CardContainer key={item.id}>
                    <CardBody>
                        <Grid2 container spacing={2}>
                            <Grid2 size={{xs: 6, md: 1}} textAlign="center">
                                <Checkbox
                                    edge="start" tabIndex={-1}
                                    checked={checked.indexOf(item.id) !== -1}
                                    onChange={() => handleToggle(item.id)}
                                />
                            </Grid2>
                            <Grid2 size={{xs: 6, md: 10}}>
                                {item.razao_social && <CampoTexto titulo="Razão Social" icone={TbUser} texto={item.razao_social}/>}
                                {item.nome && <CampoTexto titulo="Nome/Nome Fantasia" icone={TbUser} texto={item.nome}/>}
                                <Divider sx={{marginBottom: 1}}/>
                                <Chip
                                    label={item.status_dados.nome}
                                    variant="outlined"
                                    sx={{borderColor: item.status_dados.cor, color: item.status_dados.cor, marginBottom: 3, marginTop: 2}}
                                    size="small"/>
                                <Grid2 container spacing={3}>
                                    <Grid2 item size={{md: 6}}>
                                        <CampoTexto titulo="CNPJ" icone={TbFileStack} texto={item.cnpj}/>
                                        <CampoTexto titulo="Localidade" icone={TbMapPin} texto={item.endereco?.cidade_estado} small/>
                                    </Grid2>
                                    <Grid2 item size={{md: 6}}>
                                        <CampoTexto titulo="ID" icone={TbHash} texto={`#${item.id}`}/>
                                        <CampoTexto titulo="Setor" icone={SetorIcone} texto={item.setor.nome}/>
                                    </Grid2>
                                </Grid2>

                                <Grid2 item size={{xs: 12}}>
                                    <Divider sx={{marginBlock: 2}}/>
                                    <Grid2 container alignItems="center">
                                        <CampoTexto titulo="Contatos" icone={TbHeadset}/>
                                        {item?.telefones?.map(telefone => (
                                            <Grid2 item key={telefone.id} marginInlineStart={2}>
                                                <Paper variant="outlined" sx={{padding: 1}}>
                                                    <Stack spacing={1} direction="row" alignItems="center">
                                                        <TbBrandWhatsapp size={20} color={telefone.status_whatsapp === 0 ? 'gray' : 'green'}/>
                                                        <Typography variant="body1">{telefone.telefone}</Typography>
                                                        <Typography variant="body1" fontWeight={300}>{telefone.contato_nome}</Typography>
                                                    </Stack>
                                                </Paper>
                                            </Grid2>
                                        ))}
                                    </Grid2>
                                </Grid2>

                                <Grid2 item size={{xs: 12}}>
                                    <Divider sx={{marginBlock: 2}}/>
                                    <CampoTexto
                                        titulo="Consultor(a) em Atendimento Atualmente"
                                        icone={TbUserEdit}
                                        texto={item.consultor ? <Stack direction="row" spacing={1}>
                                            <Avatar src={item.consultor_avatar} sx={{width: 25, height: 25}}/>
                                            <Typography>{item.consultor}</Typography>
                                        </Stack> : <Typography>Sem Consultor(a)</Typography>}
                                    />
                                </Grid2>

                                {(item.classificacao || item.pedido_emitido || item.enriquecido) && (
                                    <Grid2 item size={{xs: 12}}>
                                        <Divider sx={{marginBlock: 2}}/>
                                        <Stack direction="row" spacing={2}>
                                            {item.classificacao && <Typography>{item.classificacao}</Typography>}
                                            {item.pedido_emitido &&
                                                <Chip label={`Pedido Emitido em ${item.pedido_data} há ${item.pedido_periodo} dias`} size="small"/>}
                                            {item.enriquecido && <Chip label="Enriquecido" size="small"/>}
                                        </Stack>
                                    </Grid2>
                                )}

                                {/*<Grid2 container gap={3}>*/}
                                {/*    <Grid2 item>*/}
                                {/*        /!*<Typography variant="body2">Status atual desde: {item.status_data}</Typography>*!/*/}
                                {/*    </Grid2>*/}
                                {/*    <Grid2 item>*/}
                                {/*        /!*<Typography variant="body2">Cadastro: {item.data_criacao}</Typography>*!/*/}
                                {/*    </Grid2>*/}
                                {/*</Grid2>*/}

                            </Grid2>
                            <Grid2 size={{xs: 6, md: 1}}>
                                <LeadShow leadId={item.id} iconButton={<Eye size={20} color="black"/>}/>
                            </Grid2>
                        </Grid2>
                    </CardBody>
                </CardContainer>
            )
        )
    )
}
export default CardEncaminhar
