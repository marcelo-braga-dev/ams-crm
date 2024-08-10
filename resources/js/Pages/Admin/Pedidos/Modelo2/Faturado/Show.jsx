import Layout from "@/Layouts/Layout";

import React from 'react';
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoFinanceiroFiles from "@/Components/Pedidos/DadosPedidoFinanceiroFiles";
import {router, usePage} from "@inertiajs/react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function Create({pedido}) {
    const funcaoUsuario = usePage().props.auth.user.is_financeiro == 1
    const avancarStatus = () => {
        router.post(route('admin.modelo-2.pedidos.faturado.update', pedido.id), {
            _method: 'PUT'
        })
    }

    return (
        <Layout titlePage="Pedido Faturado" menu="pedidos" submenu="pedidos-lista"
                voltar={route('admin.pedidos.index', {id_card: pedido.pedido.id})}>

            <div className="row">
                <div className="col">
                    <CardContainer>
                        <CardBody>
                            <DadosPedido dados={pedido}/>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col">
                    <CardContainer>
                        <CardBody>
                            <DadosPedidoCliente dados={pedido}/>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>

            <CardContainer>
                <CardBody>
                    {funcaoUsuario &&
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <button className="btn btn-warning" onClick={() => avancarStatus()}>
                                    Marcar como Entregue
                                </button>
                            </div>
                        </div>}
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    {pedido.pedido_files.link_pagamento &&
                        <div className="row">
                            <div className="col mb-4">
                                <h6>Link de pagamento</h6>
                                <span>{pedido.pedido_files.link_pagamento}</span>
                            </div>
                        </div>
                    }

                    <div className="row row-cols-4">
                        <DadosPedidoFinanceiroFiles dados={pedido}/>
                    </div>
                </CardBody>
            </CardContainer>

        </Layout>
    )
}

