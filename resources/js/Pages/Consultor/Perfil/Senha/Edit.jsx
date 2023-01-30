import { router } from '@inertiajs/react'
import Layout from "@/Layouts/Admin/Layout";

import React from 'react';
import {useForm} from '@inertiajs/react';
import {Typography} from "@mui/material";

export default function Create({pedido}) {
    const {data} = useForm();

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.faturado.update', pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout titlePage="Pedido Faturado">
            <div className="container bg-white px-lg-6 py-lg-5">
                <div className="row mb-4">
                    <div className="col">
                        <Typography className="mb-2" variant={"h6"}>Pedido n. {pedido.id}</Typography>
                        <Typography variant={"body1"}><b>Consultor:</b> {pedido.nome}</Typography>
                        <Typography variant={"body1"}><b>Cliente:</b> {pedido.cliente}</Typography>
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
