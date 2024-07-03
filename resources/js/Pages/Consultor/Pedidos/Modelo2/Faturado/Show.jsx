import Layout from "@/Layouts/Layout";
import {router, useForm} from '@inertiajs/react'

import React from 'react';
import ImagePdf from "@/Components/Elementos/ImagePdf";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro";
import {TextField, Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import {Paperclip} from "react-bootstrap-icons";

export default function Create({pedido}) {
    const {data, setData, post} = useForm()

    function submit(e) {
        e.preventDefault()
        router.post(route('consultor.pedidos.modelo-2.faturado.update', pedido.id),
            {_method: 'put', ...data})
    }

    return (
        <Layout menu="pedidos" submenu="pedidos-lista"
                voltar={route('consultor.pedidos.index', {id_card: pedido.pedido.id})} titlePage="Pedido Faturado">

            <div className="row mb-4">
                <div className="col mb-4">
                    <CardContainer>
                        <CardBody>
                            <DadosPedido dados={pedido}/>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col mb-4">
                    <CardContainer>
                        <CardBody>
                            <DadosPedidoCliente dados={pedido}/>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>

            <CardContainer>
                <CardTitle title="Anexos" icon={<Paperclip size={22}/>}/>
                <CardBody>
                    <div className="row row-cols-4">
                        {pedido.pedido_files.nota_fiscal &&
                            <div className="col mb-4">
                                <CardContainer>
                                    <CardBody>
                                        <h6>Nota Fiscal</h6>
                                        <ImagePdf url={pedido.pedido_files.nota_fiscal}/>
                                    </CardBody>
                                </CardContainer>
                            </div>
                        }
                        {pedido.pedido_files.boleto &&
                            <CardContainer>
                                <CardBody>
                                    <span className="d-block"><b>Boleto/Nota</b></span>
                                    <ImagePdf url={pedido.pedido_files.boleto}/>
                                </CardBody>
                            </CardContainer>}
                        {pedido.pedido_files.boleto_2 &&
                            <CardContainer>
                                <CardBody>
                                    <span className="d-block"><b>Boleto/Nota</b></span>
                                    <ImagePdf url={pedido.pedido_files.boleto_2}/>
                                </CardBody>
                            </CardContainer>}
                        {pedido.financeiro.boletos.map((item, index) => {
                            return (
                                <div key={index} className="col">
                                    <CardContainer>
                                        <CardBody>
                                            <Typography variant="body2"><b>{item.indice}° Boleto</b></Typography>
                                            <Typography>Vencimento: {item.data}</Typography>
                                            <ImagePdf url={item.url}/>
                                        </CardBody>
                                    </CardContainer>
                                </div>
                            )
                        })}
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
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
                    <div className="col">
                        <form onSubmit={submit}>
                            <div className="row justify-content-center">
                                {pedido.financeiro.forma_pagamento?.includes('PIX') &&
                                    <div className="col-md-12">
                                        <TextField
                                            type="file" label="Comprovante de Pagamento PIX"
                                            required={!pedido.financeiro?.pix?.length}
                                            InputLabelProps={{shrink: true}} fullWidth
                                            onChange={e => setData('file_pix', e.target.files[0])}/>
                                    </div>
                                }
                                <div className="col-auto pt-2">
                                    <button type="submit" className="btn btn-success">Marcar como Entregue</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
