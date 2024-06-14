// import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import React, {useState, useEffect} from "react";

import {Box, Card, CardActions, CardContent, TextField, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Switch from '@mui/material/Switch';

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import {Badge, IconButton, List} from "@mui/material";

import {router} from '@inertiajs/react'
import {styled} from "@mui/material/styles";
import Layout from "@/Layouts/Layout";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTitle from "@/Components/Cards/CardTitle";
import CardBody from "@/Components/Cards/CardBody";
import ButtonPrimary from "@/Components/Buttons/ButtonPrimary";
import Grid from "@mui/material/Unstable_Grid2";


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

export default function ({notificacoesPedidos}) {
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
            <Grid container spacing={3}>
                <Grid>
                    <CardContainer>
                        <CardTitle title="Notificações de Pedidos"/>
                        <CardBody>
                            {notificacoesPedidos.map((dados, index) => {
                                return (
                                    <div key={index} className="mb-2 border-bottom pb-1">
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
                                                        onChange={e => alterarNotificar(dados.id, e.target.checked)}/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </CardBody>
                    </CardContainer>
                </Grid>
                <Grid>
                    <CardContainer>
                        <CardTitle title="Usuários Online">
                            {/*<ButtonPrimary>Ver Mais EDIT</ButtonPrimary>*/}
                        </CardTitle>
                        <CardBody>
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
                                                    <Avatar src={dado.foto}/>
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
                        </CardBody>
                    </CardContainer></Grid>
            </Grid>


            {/*    <div className="col">*/}
            {/*        <div className=" p-2">*/}
            {/*        <Typography className="px-4"><b>Usuários Online</b></Typography>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Layout>
    )
}
