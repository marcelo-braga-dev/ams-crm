import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import React, {useState, useEffect} from "react";

import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Switch from '@mui/material/Switch';

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {Badge, IconButton, List} from "@mui/material";

import { router } from '@inertiajs/react'
import {styled} from "@mui/material/styles";

const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export default function ({ notificacoesPedidos }) {
    const [usuariosOnline, setUsuariosOnline] = useState([]);

    const alterarNotificar = (id, value) => {
        router.post(route('admin.notificacoes.pedidos.update', id), {
            _method: 'put',
            status: value,
        })
    }

    function getUsuariosOnline() {
        axios.post(route('geral.usuarios.usuarios-online'))
            .then(response => {
                setUsuariosOnline(response.data)
            })

        setTimeout(function () {
            getUsuariosOnline();
        }, 60000)
    }

    useEffect(() => getUsuariosOnline(), [])

    return (
        <Layout titlePage="Home">
            <div className="row row-cols-3">
                <div className="col mb-4">
                    <div className="card card-body p-2">
                        <Typography className="px-4"><b>Notificações de Pedidos</b></Typography>
                        {notificacoesPedidos.map((dados, index) => {
                            return (<div key={index}>
                                {/*Card*/}
                                <div className="card card-body p-2 px-4 mb-3">
                                    <Typography><b>{dados.titulo}</b></Typography>
                                    <small>{dados.msg}</small>
                                    <div className="row justify-content-between">

                                        <div className="col-auto">
                                            <Typography variant="body2" component="span">
                                                {dados.data}
                                            </Typography>
                                        </div>
                                        <div className="col-auto">
                                            <Typography variant="body2" component="span">
                                                <b>Categoria:</b> {dados.categoria}
                                            </Typography>
                                        </div>
                                        <div className="col-auto">
                                            <Switch defaultChecked={!!dados.notificar} className="m-0" size="small"
                                                onChange={e => alterarNotificar(dados.id, e.target.checked)} />
                                        </div>
                                    </div>

                                </div>
                            </div>)
                        })}
                        <a className="btn btn-link text-dark text-end p-0 m-0">Ver Todos</a>
                    </div>

                    {/*Sem Notificações*/}
                    {notificacoesPedidos.length === 0 ?
                        <div className="row shadow p-4 bg-white rounded">
                            <div className="col-12 text-center">
                                <Typography>Não há registros de notificações.</Typography>
                            </div>
                        </div> : ''}
                </div>
                <div className="col">
                    <div className="card card-body p-2">
                    <Typography className="px-4"><b>Usuários Online</b></Typography>
                        <List>
                            {usuariosOnline.map((dado, index) => {
                                return (
                                    <ListItem key={dado.id} className="pb-0 cursor-pointer"
                                        onClick={() => window.location.href = route('admin.usuarios.consultores.show', dado.id)}>
                                        <ListItemAvatar>
                                            <StyledBadge
                                                overlap="circular"
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right'
                                                }}
                                                variant="dot">
                                                <Avatar src={dado.foto} />
                                            </StyledBadge>

                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={dado.nome}
                                            secondary={dado.setor_nome}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
