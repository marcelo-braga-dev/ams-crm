import {router} from '@inertiajs/react'

import React from 'react';
import {useForm} from '@inertiajs/react';

import {TextField} from "@mui/material";
import Layout from "@/Layouts/Layout";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function Create({pedido}) {

    const {data, setData} = useForm({
        motivo: ''
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.cancelado.update', pedido.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout titlePage="Pedido Cancelado" container voltar={route('admin.pedidos.index', {id_card: pedido.pedido.id})}
                menu="pedidos" submenu="pedidos-lista">
            <CardContainer>
                <CardBody>
                    <DadosPedidoMinimo dados={pedido}/>
                </CardBody>
            </CardContainer>

            <form onSubmit={submit}>
                <CardContainer>
                    <CardBody>
                        <TextField
                            label="Motivos do Cancelamento" fullWidth multiline rows={4} required
                            value={data.obs} onChange={e => setData('motivo', e.target.value)}
                        />
                        <div className="mt-3">
                            <button className="btn btn-danger" type="submit">Cancelar Pedido</button>
                        </div>
                    </CardBody>
                </CardContainer>
            </form>
        </Layout>
    )
}
