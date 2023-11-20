import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import React from 'react';
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoFinanceiroFiles from "@/Components/Pedidos/DadosPedidoFinanceiroFiles";
import {router} from "@inertiajs/react";

export default function Create({pedido}) {
    const avancarStatus = () => {
        router.post(route('admin.modelo-2.pedidos.faturado.update', pedido.id), {
            _method: 'PUT'
        })
    }

    return (
        <Layout container voltar={route('consultor.pedidos.index')} titlePage="Pedido Faturado">
            <div className="row">
                <div className="col mb-4">
                    <DadosPedido dados={pedido}/>
                </div>
                <div className="col mb-4">
                    <DadosPedidoCliente dados={pedido}/>
                </div>
            </div>
            {pedido.pedido_files.link_pagamento &&
                <div className="row">
                    <div className="col mb-4">
                        <h6>Link de pagamento</h6>
                        <span>{pedido.pedido_files.link_pagamento}</span>
                    </div>
                </div>}
            <div className="row justify-content-center mt-4">
                <div className="col-auto">
                    <button className="btn btn-warning" onClick={() => avancarStatus()}>
                        Marcar como Entregue
                    </button>
                </div>
            </div>

            <DadosPedidoFinanceiroFiles dados={pedido}/>
        </Layout>
    )
}

