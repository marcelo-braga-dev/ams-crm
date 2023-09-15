import Layout from '@/Layouts/Consultor/Layout';
import {router} from '@inertiajs/react'

import React from 'react';
import ImagePdf from "@/Components/Inputs/ImagePdf";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";

export default function Create({pedido}) {
    function submit(e) {
        e.preventDefault()
        router.post(route('consultor.pedidos.modelo-2.faturado.update', pedido.id), {
            _method: 'put',
        })
    }

    return (
        <Layout container voltar={route('consultor.pedidos.index')} titlePage="Pedido Faturado">
            <div className="row mb-4">
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
            <div className="row">
                {pedido.pedido_files.boleto &&
                    <div className="col mb-4">
                        <h6>Nota/Boleto</h6>
                        <ImagePdf url={pedido.pedido_files.boleto}/>
                    </div>}
                {pedido.pedido_files.nota_fiscal &&
                    <div className="col mb-4">
                        <h6>Nota Fiscal</h6>
                        <ImagePdf url={pedido.pedido_files.nota_fiscal}/>
                    </div>}
            </div>
            <form onSubmit={submit}>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Enviar para Entregue</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
