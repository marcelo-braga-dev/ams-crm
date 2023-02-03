import Layout from '@/Layouts/Admin/Layout';

import React from 'react';
import {useForm} from '@inertiajs/react';
import {TextField, Typography} from "@mui/material";
import DadosPedidoMinimo from "@/Components/Pedidos/DadosPedidoMinimo";

export default function Create({pedido}) {

    const {setData, post} = useForm();

    function submit(e) {
        e.preventDefault()
        post(route('admin.chamado.store', {id: pedido.id}))
    }

    return (
        <Layout
            titlePage="Abrir SAQ"
            url={route('admin.chamado.index')} textButton={'Voltar'}>

            <form onSubmit={submit}>
                <div className="container bg-white px-lg-6 py-lg-5 mb-4">
                    <div className="row mb-4">
                        <div className="col">
                            <DadosPedidoMinimo dados={pedido}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <TextField label="Título" fullWidth required
                                       onChange={e => setData('titulo', e.target.value)}></TextField>
                        </div>
                        <div className="col-md-6 mb-4">
                            <TextField
                                type="file" label="Foto/PDF" InputLabelProps={{shrink: true}} fullWidth
                                onChange={e => setData('img_1', e.target.files[0])}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 mb-4">
                            <TextField multiline rows={6} label="Mensagem" fullWidth required
                                       onChange={e => setData('mensagem', e.target.value)}></TextField>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col">
                            <button className="btn btn-primary">Abrir SAC</button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}









