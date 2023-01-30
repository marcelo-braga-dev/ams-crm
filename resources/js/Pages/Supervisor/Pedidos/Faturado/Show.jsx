import {router} from '@inertiajs/react';
import Layout from "@/Layouts/Supervisor/Layout";

import React from 'react';
import {useForm} from '@inertiajs/react';
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({pedido}) {
    const {data} = useForm();

    function submit(e) {
        e.preventDefault()
        router.post(route('supervisor.pedidos.faturado.update', pedido.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout titlePage="Pedido Faturado">
            <div className="bg-white px-lg-6 py-lg-5">
                <div className="row mb-4">
                    <div className="col">
                        <DadosPedidoMinimo dados={pedido}/>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <button className="btn btn-primary" type='submit'>
                        Atualizar Status para Entregue
                    </button>
                </form>
            </div>
        </Layout>
    )
}
