import {router, usePage} from '@inertiajs/react'

import React from 'react';
import {useForm} from '@inertiajs/react';
import {TextField} from "@mui/material";
import Layout from "@/Layouts/Layout";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";

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
                voltar={route('admin.pedidos.index', {id_card: pedido.pedido.id})}>
            <CardContainer>
                <CardBody>
                    <div className="row mb-4">
                        <div className="col-12 mb-3">
                            <DadosPedidoMinimo dados={pedido}/>
                        </div>
                        <div className="col">
                            <b>Informações da entrega:</b> {infoEntrega}
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <button className="btn btn-warning mb-0" data-bs-toggle="modal" data-bs-target="#modal">
                        Enviar pedido para entregue
                    </button>
                </CardBody>
            </CardContainer>

            <div className="row">
                <div className="col-md-6">
                    <CardContainer>
                        <CardTitle title="Anotações"/>
                        <CardBody>
                            {!historicos.length && <small>Não há registros de anotações.</small>}
                            {historicos.map((item, index) => {
                                return (
                                    <div key={index} className="col-12 shadow p-2 mb-3">
                                        <b>Nome:</b> {item.nome}<br/>
                                        <b>Mensagem:</b> {item.msg}
                                    </div>
                                )
                            })}
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col">
                    <CardContainer>
                        <CardTitle title="Adicionar Anotações"/>
                        <CardBody>
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
                        </CardBody>
                    </CardContainer>
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
