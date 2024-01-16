import {router, usePage} from '@inertiajs/react'

import React from 'react';
import {useForm} from '@inertiajs/react';

//step
import {TextField} from "@mui/material";
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({pedido, historicos, infoEntrega}) {
    const {data, setData, post} = useForm({
        msg: '',
        idPedido: pedido.pedido.id
    });

    function enviarMsg(e) {
        e.preventDefault()
        post(route('admin.acompanhamento.store'))
        setData('msg', '')
    }

    function atualizarStatus() {
        router.post(route('admin.acompanhamento.update', pedido.pedido.id), {_method: 'PUT'})
    }

    return (
        <Layout container titlePage="Acompanhamento do Pedido" menu="pedidos" submenu="pedidos-lista"
                voltar={route('admin.pedidos.index')}>
            <div className="row mb-4">
                <div className="col-12 mb-3">
                    <DadosPedidoMinimo dados={pedido}/>
                </div>
                <div className="col">
                    <b>Informações da entrega:</b> {infoEntrega}
                </div>
            </div>

            <h6>Anotações:</h6>
            {!historicos.length && <small>Não há histórico.</small>}
            <div className="row">
                <div className="col-md-6 shadow p-2 mb-3">
                    {historicos.map((item, index) => {
                        return (
                            <div key={index} className="col-12 shadow p-2 mb-3">
                                <b>Nome:</b> {item.nome}<br/>
                                <b>Mensagem:</b> {item.msg}
                            </div>
                        )
                    })}
                </div>
                <div className="col text-center mb-3">
                    <form onSubmit={enviarMsg}>
                        <TextField
                            label="Anotações sobre o andamento do pedido:" fullWidth multiline rows={3} required
                            value={data.msg} className="mb-3"
                            onChange={e => setData('msg', e.target.value)}
                        />
                        <button className="btn btn-primary" type="submit">
                            Salvar Anotação
                        </button>
                    </form>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col">
                    <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal">
                        Enviar pedido para entregue
                    </button>
                </div>
            </div>

            {/*MODAL*/}
            <div className="modal fade mt-5" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Atualizar Status</h5>
                            <button type="button" className="btn-close text-dark" data-bs-dismiss="modal"
                                    aria-label="Close">X
                            </button>
                        </div>
                        <div className="modal-body">
                            Atualizar status do pedido para Entregue?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => atualizarStatus()}>
                                Atualizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
