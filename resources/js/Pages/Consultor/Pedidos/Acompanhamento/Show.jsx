import React from 'react';
import {router, useForm} from '@inertiajs/react';

//step
import {TextField} from "@mui/material";
import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({pedido, historicos, infoEntrega}) {

    const {data, setData, post} = useForm({
        msg: '',
        idPedido: pedido.pedido.id,
        msgStatus: ''
    });

    function enviarMsg(e) {
        e.preventDefault()
        post(route('consultor.acompanhamento.store'))
        setData('msg', '')
    }

    function avancarStatus() {
        if (data.msgStatus.length && data.msgStatus.length <= 500) {
            router.post(route('consultor.acompanhamento.update', pedido.pedido.id), {
                _method: 'put',
                ...data
            })
        }
    }

    return (
        <Layout container titlePage="Acompanhamento do Pedido" menu="pedidos" submenu="pedidos-lista"
                voltar={route('consultor.pedidos.index')}>
            <div className="row mb-4">
                <div className="col-12 mb-3">
                    <DadosPedidoMinimo dados={pedido}/>
                </div>
                <div className="col-12">
                    <span><b>Informações de Entrega:</b> {infoEntrega}</span>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#modalAvancarStatus">
                        Alterar para Entregue
                    </button>
                </div>
            </div>

            <h6>Anotações</h6>
            <div className="row">
                <div className="col-12 shadow p-2 mb-3">
                    <b>Mensagem:</b> {infoEntrega}
                </div>
                {historicos.map((item, index) => {
                    return (
                        <div key={index} className="col-12 shadow p-2 mb-3">
                            <b>Nome:</b> {item.nome}<br/>
                            <b>Mensagem:</b> {item.msg}
                        </div>
                    )
                })}
            </div>

            {/*Modal*/}
            <div className="modal fade mt-5" id="modalAvancarStatus" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Anotações da Entrega</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <TextField label="Anotações da Entrega" required multiline fullWidth rows="4"
                                       onChange={e => setData('msgStatus', e.target.value)}/>
                            <small className={data.msgStatus.length > 500 ? "text-danger" : "text-muted"}>
                                {data.msgStatus.length}/500
                            </small>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                    onClick={() => avancarStatus()}>
                                Avançar Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
