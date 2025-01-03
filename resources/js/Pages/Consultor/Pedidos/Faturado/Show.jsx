import Layout from "@/Layouts/Layout";
import {router} from '@inertiajs/react'

import React from 'react';
import {useForm} from '@inertiajs/react';
import ImagePdf from "@/Components/Elementos/ImagePdf";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";

export default function Create({pedido}) {
    return (
        <Layout container voltar={route('consultor.pedidos.index', {id_card: pedido.pedido.id})} titlePage="Pedido Faturado">
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
            <div className="row">
                <div className="col mb-4">
                    <CardContainer>
                        <CardBody>
                            <h6>Baixar Nota/Boleto</h6>
                            <ImagePdf url={pedido.pedido_files.nota_fiscal}/>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>
        </Layout>
    )
}
