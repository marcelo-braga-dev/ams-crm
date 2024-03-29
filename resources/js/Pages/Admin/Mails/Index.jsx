import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

import * as React from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SimCardAlertOutlinedIcon from '@mui/icons-material/SimCardAlertOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';

import {useForm} from "@inertiajs/react";

import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import DeleteIcon from "@mui/icons-material/Delete";

export default function Index({emails, folders, folderAtual}) {
    const {get} = useForm({
        folderAtual: folderAtual
    })

    function selecionarPasta(folderx) {
        handleOpen()
        get(route('admin.emails.index', {folder: folderx}))
    }

    function abrir(id) {
        get(route('admin.emails.show', id))
    }

    // List
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const [checked, setChecked] = React.useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    // List - fim

    // Nav
    const [value, setValue] = React.useState('recents');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Nav - fim

    function icone(e) {
        switch (e) {
            case 'Caixa de Entrada':
                return <InboxOutlinedIcon/>
            case 'Arquivo':
                return <Inventory2OutlinedIcon/>
            case 'Rascunhos':
                return <DraftsOutlinedIcon/>
            case 'Span':
                return <SimCardAlertOutlinedIcon/>
            case 'Enviados':
                return <ForwardToInboxIcon/>
            case 'Lixeira':
                return <DeleteOutlineIcon/>
            default:
                return <FolderOpenIcon/>
        }
    }

    return (
        <Layout container titlePage="Caixa de Entrada" menu="ferramentas" submenu="ferramentas-email">
            <div className="row">
                <div className="col-md-3 p-0">
                    <form>
                        <Box>
                            <nav aria-label="main mailbox folders">
                                <List className="p-0 m-0">
                                    {folders.map((folder, i) => {
                                        return (
                                            <ListItem key={i} disablePadding
                                                      className={'ps-' + ((folder.nivel * 2) - 2)}
                                                      onClick={() => selecionarPasta(folder.tag)}>
                                                <ListItemButton
                                                    className="ps-1"
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
                            </nav>
                            <a href={route('admin.emails.config')}>Configuraçoes</a>
                        </Box>
                    </form>
                </div>
                <div className="col-md-9">
                    <div className="row justify-content-between">
                        <div className="col">
                            <a href={route('admin.emails.create')}>Criar</a>
                        </div>
                        <div className="col-auto text-center">
                            <a className="cursor-pointer" onClick={() => {
                            }}>
                                <DeleteIcon/>
                                <small className="d-block" style={{fontSize: 12}}>Excluir</small>
                            </a>
                        </div>
                    </div>

                    <List>
                        {emails.map((email, value) => {
                            const labelId = `checkbox-list-secondary-label-${value}`;
                            return (
                                <ListItem key={value} className="border-bottom p-0 m-0" disablePadding
                                          onClick={() => abrir(email.id)}>
                                    <ListItemButton className="p-0" alignItems="top">
                                        <Checkbox size="small" className="me-1"
                                                  onChange={handleToggle(value)}
                                                  checked={checked.indexOf(value) !== -1}
                                                  inputProps={{'aria-labelledby': labelId}}
                                        />
                                        <div className="row justify-content-between w-100"
                                             onClick={() => handleOpen()}>
                                            <ListItemText
                                                primary={
                                                    <div
                                                        className={"row justify-content-between mb-1 " + (email.flags?.visualizado ? 'text-muted' : 'font-weight-bolder')}>
                                                        <div className="col text-truncate text-dark">
                                                            <small><small>{email.autor}</small></small>
                                                        </div>
                                                        <div className="col-auto text-dark">
                                                            <small
                                                                className="fst-italic pe-2"><small>{email.data}</small></small>
                                                        </div>
                                                    </div>}
                                                secondary={
                                                    <div className="row">
                                                        <div className="col text-dark">
                                                            <span style={{fontSize: 16}}
                                                                  className={email.flags?.visualizado ? 'text-muted' : 'font-weight-bolder'}>
                                                                {email.titulo}
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
                    {emails.length ? '' : <>
                        <div className="row justify-content-center mt-6">
                            <div className="col-auto text-center">
                                <MailOutlinedIcon style={{fontSize: 40}}/>
                                <span className="d-block text-center">Não há mensagens</span>
                            </div>
                        </div>
                    </>
                    }
                </div>
            </div>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={open}
                onClick={handleClose}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Layout>
    )
}
