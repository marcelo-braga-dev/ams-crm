import Layout from '@/Layouts/Admin/Layout';

import React from 'react';
import {useForm} from '@inertiajs/react';
import {TextField} from "@mui/material";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({pedido}) {

    const {setData, post} = useForm({
        id: pedido.pedido.id
    });

    function submit(e) {
        e.preventDefault()
        post(route('admin.chamado.store'))
    }

    return (
        <Layout container titlePage="Abrir SAQ" voltar={route('admin.pedidos.index')}
                menu="sac" submenu="chamados">
            <form onSubmit={submit}>
                <div className="row mb-4">
                    <div className="col">
                        <DadosPedidoMinimo dados={pedido}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-4">
                        <TextField label="Título" fullWidth required
                                   onChange={e => setData('titulo', e.target.value)}></TextField>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <TextField multiline rows={6} label="Mensagem" fullWidth required
                                   onChange={e => setData('mensagem', e.target.value)}></TextField>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                        <TextField type="file" fullWidth
                                   onChange={e => setData('anexo_1', e.target.files[0])}>
                        </TextField>
                    </div>
                    <div className="col-md-6 mb-3">
                        <TextField type="file" fullWidth
                                   onChange={e => setData('anexo_2', e.target.files[0])}>
                        </TextField>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col">
                        <button className="btn btn-primary">Abrir SAC</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}









