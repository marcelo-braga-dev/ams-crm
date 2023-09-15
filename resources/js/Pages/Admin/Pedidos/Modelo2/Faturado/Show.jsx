import Layout from '@/Layouts/Consultor/Layout';
import React from 'react';
import DadosPedidoFiles from "@/Components/Pedidos/DadosPedidoFiles";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import ImagePdf from "@/Components/Inputs/ImagePdf";

export default function Create({pedido}) {

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
        </Layout>
    )
}

