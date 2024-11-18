import {Avatar, Button, Grid, Stack, TextField, Typography} from "@mui/material";
import Switch from "@/Components/Inputs/Switch";
import {useMemo, useState} from "react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {Chat, Dash, Envelope, Person, Plus, Telephone, TelephoneFill, Whatsapp} from "react-bootstrap-icons";
import * as React from "react";
import CampoTexto from "@/Components/CampoTexto.jsx";
import Chip from "@mui/material/Chip";
import OpenIflameChatWhatsapp from '@/Components/Chats/Whatsapp/ChatWhatsapp/OpenIflameChatWhatsapp.jsx';
import {TbEdit} from "react-icons/tb";
import Text from "@/Components/Elementos/Text.jsx";
import Paper from "@mui/material/Paper";

export default function LeadsDados({dados, acoes}) {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [editarLead, setEditarLead] = useState(false)

    const toggleInfo = () => {
        setToggleMenu(e => !e)
    }

    const telefones = useMemo(() => {
        return dados?.telefones?.length > 0 && dados?.telefones?.map(({id, telefone, contato_nome}) => {
            return (
                <Grid item key={id}>
                    <Paper sx={{padding: 1}} variant="outlined">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Telephone size={18} color="blue"/>
                            <Typography display="inline" marginBottom={1}>{telefone}</Typography>
                            {contato_nome && <Typography display="inline" marginBottom={1}>{contato_nome}</Typography>}
                        </Stack>
                    </Paper>
                </Grid>
            )
        })
    }, [dados?.telefones]);

    const dadosLead = useMemo(() => {
        return (
            <Grid container>
                <Grid item md={6}>
                    {dados?.razao_social && <CampoTexto titulo="Razão Social" texto={dados.razao_social}/>}
                    {dados?.nome && <CampoTexto titulo="Nome/Nome Fantasia" texto={dados.nome}/>}
                    {dados?.cnpj && <CampoTexto titulo="CNPJ" texto={dados.cnpj}/>}
                    {dados?.rg && <CampoTexto titulo="RG" texto={dados.rg}/>}
                    {dados?.cpf && <CampoTexto titulo="CPF" texto={dados.cpf}/>}
                    {dados?.endereco?.cidade_estado && <CampoTexto titulo="Localidade" texto={dados?.endereco?.cidade_estado}/>}
                    {dados?.inscricao_estadual && <CampoTexto titulo="Inscrição Estadual" texto={dados.inscricao_estadual}/>}
                </Grid>
                <Grid item md={6}>
                    <CampoTexto titulo="ID" texto={`#${dados.id}`}/>
                    <CampoTexto titulo="Status" texto={dados?.status_nome}/>
                    <CampoTexto titulo="Setor" texto={dados?.setor?.nome}/>
                    {dados?.cliente?.endereco && <CampoTexto titulo="Endereço" texto={dados.cliente.endereco}/>}
                </Grid>
            </Grid>
        )
    }, [dados]);

    const dadosLeadExtra = useMemo(() => {
        return (
            <Grid container>
                <Grid item md={12}>
                    {dados.extras?.cnae && <CampoTexto titulo="CNAE" texto={dados.extras.cnae}/>}
                    {dados.extras?.situacao && <CampoTexto titulo="Situação" texto={`${dados.extras.situacao} ${dados.extras.data_situacao}`}/>}
                    {dados.extras?.atividade_principal && <CampoTexto titulo="Atividade Principal" texto={dados.extras.atividade_principal}/>}
                    {dados.extras?.natureza_juridica && <CampoTexto titulo="Natureza Jurídica" texto={dados.extras.natureza_juridica}/>}
                    {dados.extras?.data_nascimento && <CampoTexto titulo="Data Nascimento" texto={dados.extras.data_nascimento}/>}
                    {dados.extras?.capital_social && <CampoTexto titulo="Capital Social" texto={dados.extras.capital_social}/>}
                    {dados.extras?.tipo && <CampoTexto titulo="Tipo de Empresa" texto={dados.extras.tipo}/>}
                    {dados.extras?.porte && <CampoTexto titulo="Porte de Empresa" texto={dados.extras.porte}/>}
                    {dados.extras?.quadro_societario && <CampoTexto titulo="Quadro Societário" texto={dados.extras.quadro_societario}/>}
                    {dados.extras?.data_abertura && <CampoTexto titulo="Data Abertura" texto={dados.extras.data_abertura}/>}
                </Grid>
            </Grid>
        )
    }, [dados?.extras]);

    return (<>
        <CardContainer>
            <CardTitle title="Informações do Lead" icon={<Person size="22"/>} children={acoes}/>
            <CardBody>

                {/*Dados do Lead*/}
                {dadosLead}

                {/*Extras*/}
                {toggleMenu && dadosLeadExtra}

                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Chip
                            className="cursor-pointer "
                            onClick={toggleInfo}
                            label={<>{toggleMenu ? <Dash/> : <Plus size={15}/>} Informações</>}
                            size="small"
                        />
                    </Grid>
                    <Grid item marginBottom={2}>
                        <Button
                            color="warning"
                            startIcon={<TbEdit/>}
                            onClick={() => setEditarLead(value => !value)}
                        >
                            Solicitar Edição de Dados
                        </Button>
                    </Grid>
                </Grid>

                {editarLead && (
                    <CardContainer>
                        <CardBody>
                            <Typography>Solicitação de Edição das informações do Lead</Typography>
                            <Grid container justifyContent="space-between" marginTop={1}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Detalhe a informações que precisam ser alteradas..."
                                        fullWidth
                                        multiline
                                        minRows={3}
                                    />
                                    <Button color="success" sx={{marginTop: 1}}>Enviar Solicitação</Button>
                                </Grid>
                            </Grid>
                        </CardBody>
                    </CardContainer>
                )}
            </CardBody>
        </CardContainer>

        {/*Telefones*/}
        <CardContainer>
            <CardTitle icon={<Chat size={20}/>} title="Contatos"/>
            <CardBody>
                <Grid container spacing={2}>

                    {/*Telefones*/}
                    {telefones}

                    {/*Emails*/}
                    {dados?.emails?.map(email => {
                        return (
                            email && <Grid item key={email}>
                                <Paper sx={{padding: 1}} variant="outlined">
                                    <Stack direction="row" alignItems="center" spacing={2}>
                                        <Envelope size={18} color="orange"/>
                                        <Typography display="inline" marginBottom={1}>{email}</Typography>
                                    </Stack>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </CardBody>
        </CardContainer>

        {dados?.vendedor?.nome && <CardContainer>
            <CardBody>
                <Stack direction="row" spacing={2}>
                    <Typography fontWeight="bold">Consultor em Atendimento(a):</Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar src={dados?.vendedor?.avatar} sx={{width: 25, height: 25}}/>
                    <Typography>{dados?.vendedor?.nome ?? 'Nenhum Consultor(a)'}</Typography>
                    </Stack>
                </Stack>
            </CardBody>
        </CardContainer>}
    </>)
}
