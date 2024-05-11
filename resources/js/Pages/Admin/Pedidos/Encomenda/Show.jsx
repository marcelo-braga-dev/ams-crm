import * as React from 'react';
import {router} from '@inertiajs/react'
import Layout from '@/Layouts/AdminLayout/LayoutAdmin';

import {useForm} from '@inertiajs/react'
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosProdutos from "@/Components/Pedidos/DadosProdutos";

export default function Pedidos({pedido, produtos}) {

    const {data, setData} = useForm()

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.modelo-2.pedidos.encomenda.update', pedido.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout container voltar={route('admin.pedidos.index', {id_card:  pedido.pedido.id})} titlePage="Pedido em Encomenda"
                menu="pedidos" submenu="pedidos-lista">
            <div className="row">
                <div className="col mb-3">
                    <DadosPedido dados={pedido}/>
                </div>
                <div className="col mb-3">
                    <DadosPedidoCliente dados={pedido}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <DadosProdutos dados={produtos}/>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="row card card-body mt-4 text-center">
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">Enviar para Lançado</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
