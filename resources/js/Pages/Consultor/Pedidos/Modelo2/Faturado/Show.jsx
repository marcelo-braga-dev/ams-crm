import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import {router, useForm} from '@inertiajs/react'

import React from 'react';
import ImagePdf from "@/Components/Elementos/ImagePdf";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro";
import {TextField} from "@mui/material";

export default function Create({pedido}) {
    const {data, setData, post} = useForm()

    function submit(e) {
        e.preventDefault()
        router.post(route('consultor.pedidos.modelo-2.faturado.update', pedido.id),
            {_method: 'put', ...data})
    }

    return (
        <Layout menu="pedidos-lista" voltar={route('consultor.pedidos.index')} titlePage="Pedido Faturado">
            <div className="row mb-4">
                <div className="col mb-4">
                    <DadosPedido dados={pedido}/>
                </div>
                <div className="col mb-4">
                    <DadosPedidoCliente dados={pedido}/>
                </div>
            </div>

            <DadosPedidoFinanceiro dados={pedido}/>
            {pedido.financeiro.forma_pagamento?.includes('PIX') && <>
                <div className="row mt-3">
                    {pedido.financeiro?.pix?.map((item, index) => {
                        return (
                            <div key={index} className="col">
                                <h6>Comprovante de Pagamento</h6>
                                <ImagePdf url={item.url}/>
                            </div>
                        )
                    })}
                </div>
                <form onSubmit={submit}>
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <TextField
                                type="file" label="Comprovante de Pagamento PIX"
                                required={!pedido.financeiro?.pix?.length}
                                InputLabelProps={{shrink: true}} fullWidth
                                onChange={e => setData('file_pix', e.target.files[0])}/>
                        </div>
                        <div className="col-auto pt-2">
                            <button type="submit" className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </form>
            </>
            }


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
