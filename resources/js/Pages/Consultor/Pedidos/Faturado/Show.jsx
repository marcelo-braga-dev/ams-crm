import Layout from "@/Layouts/Layout";
import { router } from '@inertiajs/react'

import React from 'react';
import {useForm} from '@inertiajs/react';
import ImagePdf from "@/Components/Elementos/ImagePdf";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";

export default function Create({pedido}) {

    const atualizarStatus = () => {
        router.post(route('consultor.pedidos.atualizar-status'), {id: pedido.id})
    }

    return (
        <Layout container voltar={route('consultor.pedidos.index', {id_card:  pedido.pedido.id})} titlePage="Pedido Faturado" >
            <div className="row mb-4">
                <div className="col mb-4">
                    <DadosPedido dados={pedido}/>
                </div>
                <div className="col mb-4">
                    <DadosPedidoCliente dados={pedido}/>
                </div>
            </div>
            <div className="row">
                <div className="col mb-4">
                    <h6>Baixar Nota/Boleto</h6>
                    <div onClick={atualizarStatus}>
                        <ImagePdf url={pedido.pedido_files.nota_fiscal}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
