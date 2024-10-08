import Layout from '@/Layouts/Layout';
import {router} from '@inertiajs/react'

import {Typography} from "@mui/material";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import Avatar from "@mui/material/Avatar";

import {converterDataHorario} from "@/Helpers/converterDataHorario";

import * as React from 'react';
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";

export default function Create({notificacoes}) {

    const alterarNotificar = (id, value) => {
        router.post(route('admin.notificacoes.sac.update', id), {
            _method: 'put',
            status: value,
        })
    }

    function marcarComoLidas() {
        router.post(route('admin.notificacoes.sac.marcar-lidas'), {
            _method: 'put',
        })
    }

    function deletar() {
        router.post(route('admin.notificacoes.sac.destroy', 0), {
            _method: 'delete',
        })
    }

    router.on('success', () => window.location.reload())

    return (
        <Layout empty titlePage="Notificações de SAC">
            <div className="container bg-wh ite rounded px-3 px-md-6 py-4 mb-4">
                <div className="row justify-content-end">
                    <div className="col-auto">
                        <button type="submit" className="btn btn-outline-primary"
                                onClick={() => marcarComoLidas()}>
                            <i className="fas fa-eye pe-2"></i>Marcar todas como lidas
                        </button>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-outline-danger"
                                data-bs-toggle="modal" data-bs-target="#exampleModal">
                            <i className="fas fa-trash pe-2"></i>Deletar Todas Notificações
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3 p-3">

                        {notificacoes.map((dados, index) => {
                            return (<div className="card card-body mb-4" key={index}>
                                {/*Card*/}
                                <div className="row px-4">
                                    <div className="col-1 text-center p-0">
                                        <Avatar sx={{bgcolor: 'black'}}>
                                            <HeadsetMicOutlinedIcon/>
                                        </Avatar>
                                        <br/>
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox"
                                                   defaultChecked={!!dados.notificar}
                                                   onChange={e => alterarNotificar(dados.id, e.target.checked)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-10 p-0">
                                        <div className="row mb-2">
                                            <div className="col-auto">
                                                <Typography><b>{dados.titulo.toUpperCase()}.</b></Typography>
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

                                    <div className="col-1">
                                        {dados.url && <a className="btn btn-dark btn-sm" href={route('admin.chamados.show', dados.url)}>Abrir</a>}
                                    </div>
                                </div>
                            </div>)
                        })}

                        {/*Sem Notificações*/}
                        {notificacoes.length === 0 ?
                            <div className="row shadow p-4 bg-white rounded">
                                <div className="col-12 text-center">
                                    <Typography>Não há registros de notificações.</Typography>
                                </div>
                            </div> : ''}
                    </div>
                </div>
            </div>

            <div className="modal fade mt-5" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir notificações</h5>
                            <a type="button" data-bs-dismiss="modal" aria-label="Close"><b>x</b></a>
                        </div>
                        <div className="modal-body">
                            Deletar todos os históricos de notificações?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => deletar()}>Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
