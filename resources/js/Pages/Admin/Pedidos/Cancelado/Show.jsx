import {router} from '@inertiajs/react'

import React from 'react';
import {useForm} from '@inertiajs/react';

//step
import {TextField} from "@mui/material";
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

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

    return (<Layout titlePage="Pedido Cancelado" container voltar={route('admin.pedidos.index', {id_card:  pedido.pedido.id})}
                    menu="pedidos" submenu="pedidos-lista">
        <div className="row">
            <div className="col">
                <DadosPedidoMinimo dados={pedido}/>
            </div>
        </div>
        <form onSubmit={submit}>

            <div className="row my-4">
                <TextField
                    label="Motivos do Cancelamento" fullWidth multiline rows={4} required
                    value={data.obs} onChange={e => setData('motivo', e.target.value)}
                />
            </div>

            <button className="btn btn-danger" type="submit">
                Cancelar Pedido
            </button>
        </form>

    </Layout>)
}
