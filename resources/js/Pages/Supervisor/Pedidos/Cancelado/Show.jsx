import { router } from '@inertiajs/react'

import React from 'react';
import {useForm} from '@inertiajs/react';

//step
import {TextField} from "@mui/material";
import Layout from "@/Layouts/Supervisor/Layout";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({pedido}) {

    const {data, setData} = useForm({
        motivo: ''
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('supervisor.pedidos.cancelado.update', pedido.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (<Layout titlePage="Pedidos">

        <div className="bg-white px-lg-6 py-lg-5">
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
        </div>

    </Layout>)
}
