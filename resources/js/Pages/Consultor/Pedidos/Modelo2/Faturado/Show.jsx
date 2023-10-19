import Layout from '@/Layouts/Consultor/Layout';
import {router} from '@inertiajs/react'

import React from 'react';
import ImagePdf from "@/Components/Inputs/ImagePdf";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro";

export default function Create({pedido}) {
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

            <DadosPedidoFinanceiro dados={pedido}/>

            <div className="row mt-4">
                {pedido.pedido_files.nota_fiscal &&
                    <div className="col mb-4">
                        <h6>Nota Fiscal</h6>
                        <ImagePdf url={pedido.pedido_files.nota_fiscal}/>
                    </div>
                }
                {pedido.pedido_files.boleto &&
                    <div className="shadow rounded p-3">
                        <span className="d-block"><b>Boleto/Nota</b></span>
                        <ImagePdf url={pedido.pedido_files.boleto}/>
                    </div>}
                {pedido.pedido_files.boleto_2 &&
                    <div className="shadow rounded p-3">
                        <span className="d-block"><b>Boleto/Nota</b></span>
                        <ImagePdf url={pedido.pedido_files.boleto_2}/>
                    </div>}
            </div>

            <div className="row row-cols-3">
                {pedido.financeiro.boletos.map((item, index) => {
                    return (
                        <div key={index} className="col mb-4 ">
                            <div className="shadow rounded p-3">
                                <span className="d-block"><b>{item.indice}° Boleto</b></span>
                                <span>Vencimento: {item.data}</span>
                                <ImagePdf url={item.url}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}
