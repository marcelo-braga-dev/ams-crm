import Layout from "@/Layouts/Layout";

import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SimCardAlertOutlinedIcon from '@mui/icons-material/SimCardAlertOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import {router, useForm} from "@inertiajs/react";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from '@mui/material/Tooltip';

import ImagePdf from "@/Components/Elementos/ImagePdf";

import ForwardIcon from '@mui/icons-material/Forward';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import {useState} from "react";
import axios from "axios";
import {Stack} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function Index({emails, folders, folderAtual}) {

    const [email, setEmail] = useState([])
    const [open, setOpen] = useState(false);

    function getEmail(id) {
        axios.get(route('admin.emails.get-email', {id: id, folder: folderAtual}))
            .then(response => {
                setEmail(response.data);
            })
        setOpen(false)
    }

    function enviarLixeira() {
        router.post(route('admin.emails.enviar-lixeira'))
    }

    const abrirPasta = (pasta) => {
        router.get(route('admin.emails.index', {folder: pasta}))
    }

    // List

    function icone(e) {
        switch (e) {
            case 'Caixa de Entrada':
                return <InboxOutlinedIcon fontSize="small"/>
            case 'Arquivo':
                return <Inventory2OutlinedIcon fontSize="small"/>
            case 'Rascunhos':
                return <DraftsOutlinedIcon fontSize="small"/>
            case 'Span':
                return <SimCardAlertOutlinedIcon fontSize="small"/>
            case 'Enviados':
                return <ForwardToInboxIcon fontSize="small"/>
            case 'Lixeira':
                return <DeleteOutlineIcon fontSize="small"/>
            default:
                return <FolderOpenIcon fontSize="small"/>
        }
    }

    return (
        <Layout container titlePage="Caixa de Entrada" menu="ferramentas" submenu="ferramentas-email">
            <CardContainer>
                <CardBody>
                    <div className="row g-1">
                        <div className="col-2 border-end">
                            <div className="px-2 mb-1 row">
                                <div className="col text-end">
                                    <small>teste@ams360.com.br</small>
                                </div>
                                <div className="col text-end">
                                    <a href={route('admin.emails.config')}><SettingsOutlinedIcon fontSize="small"/></a>
                                </div>
                            </div>
                            <List className="p-0 m-0">
                                {folders.map((folder, i) => {
                                    return (
                                        <ListItem key={i} disablePadding
                                                  className={'ps-' + ((folder.nivel * 2) - 2)}
                                                  onClick={() => abrirPasta(folder.tag)}>
                                            <ListItemButton
                                                className="ps-3"
                                                selected={folder.selecionado}>
                                                {icone(folder.nome)}
                                                <ListItemText className="ms-2"
                                                              primary={<small>{folder.nome}</small>}/>
                                                <small className="">{folder.qtd && folder.qtd}</small>
                                            </ListItemButton>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </div>
                        <div className="bg-white col-3">
                            <List>
                                {emails.map((item, value) => {
                                    return (
                                        <ListItem key={value} className="m-0 border-bottom" disablePadding
                                                  onClick={() => getEmail(item.id)}>
                                            <ListItemButton className="px-2" alignItems="top" selected={item.id == email?.id}>
                                                <div className="row justify-content-between w-100"
                                                     onClick={() => setOpen(true)}>
                                                    <ListItemText
                                                        primary={
                                                            <div
                                                                className={"row justify-content-between mb-1 " + (item.flags?.visualizado ? 'text-muted' : 'font-weight-bolder')}>
                                                                <div className="col text-truncate text-dark">
                                                                    <small><small>{item.autor}</small></small>
                                                                </div>
                                                                <div className="col-auto text-dark">
                                                                    <small
                                                                        className="fst-italic"><small>{item.data}</small></small>
                                                                </div>
                                                            </div>}
                                                        secondary={
                                                            <div className="row">
                                                                <div className="col text-dark">
                                                            <span style={{fontSize: 14}}
                                                                  className={item.flags?.visualizado ? 'text-muted' : 'font-weight-bolder'}>
                                                                {item.titulo}
                                                            </span>
                                                                </div>
                                                            </div>}
                                                    />
                                                </div>
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </div>
                        <div className="border-start col">
                            {email?.id && <div className="p-2">
                                <div className="pb-2 mb-4 border-bottom">
                                    <div className="row justify-content-between">
                                        <div className="col">
                                            <small className="d-block font-weight-bold">De:</small>
                                            <span className="d-block">{email?.remetente?.nome}</span>
                                        </div>
                                        <div className="col-auto">
                                            <Stack direction="row" spacing={3}>
                                                <Tooltip title="Encaminhar" placement="top-start">
                                                    <a className="">
                                                        <ForwardIcon/>
                                                    </a>
                                                </Tooltip>
                                                <Tooltip title="Lixeira" placement="top-start">
                                                    <a className="cursor-pointer" onClick={() => enviarLixeira()}>
                                                        <DeleteIcon/>
                                                    </a>
                                                </Tooltip>

                                                <Tooltip title="Responder" placement="top-start">
                                                    <a className="pe-3" href={route('admin.emails.create', {folder: folderAtual, id: email.id})}>
                                                        <ReplyOutlinedIcon/>
                                                    </a>
                                                </Tooltip>
                                            </Stack>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-2 mb-4 border-bottom">
                                    <div className="row">
                                        <div className="col">
                                            <small className="d-block font-weight-bold">Assunto:</small>
                                            {email?.titulo}
                                        </div>
                                    </div>
                                </div>
                                {(email.pdf.length || email.imagem.length) ?
                                    <div className="pb-2 mb-4 border-bottom">
                                        <small className="d-block font-weight-bold">Anexos:</small>
                                        <div className="row row-cols-6">
                                            {email.pdf.map((valor) => {
                                                return (<div className="col text-truncate">
                                                    <small className="mx-4 d-block">{valor.nome}</small>
                                                    <a href={valor.conteudo}>PDF</a>
                                                </div>)
                                            })}
                                            {email.imagem.map((valor) => {
                                                return (<div className="col">
                                                    <small className="d-block">{valor.nome}</small>
                                                    <ImagePdf string={valor.conteudo}/>
                                                </div>)
                                            })}
                                        </div>
                                    </div> : ''}

                                <div className="row">
                                    <div className="col-12">
                                        <div className="pb-2 mb-4 border-bottom">
                                            {email.html.map((valor) => {
                                                return (<div className="mb-4 row">
                                                    <iframe srcDoc={valor} width="100%" height="300"
                                                    />
                                                </div>)
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
