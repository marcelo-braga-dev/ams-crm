import Layout from "@/Layouts/Layout";
import {router} from '@inertiajs/react'

import {Typography} from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import Avatar from "@mui/material/Avatar";

import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function Create({notificacoes}) {

    const alterarNotificar = (id, value) => {
        router.post(route('consultor.notificacoes.pedidos.update', id), {
            _method: 'put',
            status: value,
        })

    }
    return (
        <Layout container titlePage="Notificações">
            <h6>Histórico de Notificações - LEADS</h6>

            {notificacoes.map((dados, index) => {
                return (
                    <div className="p-4" key={index}>
                        {/*Card*/}
                        <div className="row mb-4 p-4 rounded bg-white bord er-2 border-dark shadow">
                            <div className="col-1 text-center p-0">
                                <Avatar sx={{bgcolor: 'black'}}>
                                    <NoteAltOutlinedIcon/>
                                </Avatar>
                            </div>
                            <div className="col-9 p-0">
                                <div className="row mb-2">
                                    <div className="col-auto">
                                        <Typography><b>{dados.titulo}</b></Typography>
                                        <Typography className="pl-2" variant="body1">
                                            {dados.msg}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="row justify-content-between">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col-auto">
                                                <CalendarMonthIcon fontSize="small"/>
                                                <Typography variant="body2" component="span">
                                                    {dados.data}
                                                </Typography>
                                            </div>
                                            <div className="col-auto">
                                                <Typography variant="body2" component="span">
                                                    <b>Categoria:</b> {dados.categoria}
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-2">
                                {dados.url &&
                                    <a className="btn btn-dark btn-sm" href={dados.url}>
                                        Abrir
                                    </a>
                                }
                                <Switch
                                    defaultChecked={!!dados.notificar}
                                    onChange={e => alterarNotificar(dados.id, e.target.checked)}/>

                            </div>
                        </div>
                    </div>
                )
            })}

            {/*Sem Notificações*/}
            {notificacoes.length === 0 ?
                <div className="row shadow p-4 bg-white rounded">
                    <div className="col-12 text-center">
                        <Typography>Não há registros de notificações.</Typography>
                    </div>
                </div> : ''}

        </Layout>
    )
}
