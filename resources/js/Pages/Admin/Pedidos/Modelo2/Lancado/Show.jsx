import Layout from '@/Layouts/Admin/Layout';
import {router} from '@inertiajs/react'
import * as React from 'react';

import {useForm} from '@inertiajs/react';
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import {TextField} from "@mui/material";
import DadosProdutos from "@/Components/Pedidos/DadosProdutos";

export default function Pedidos({dados, produtos}) {
    const {data, put, setData} = useForm()

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.modelo-2.pedidos.lancado.update', dados.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout container voltar={route('admin.pedidos.index')} titlePage="Pedido Lançado"
                menu="pedidos" submenu="lista">
            <div className="row mb-4 shadow p-2">
                <div className="col">
                    <DadosPedido dados={dados}/>
                </div>
                <div className="col">
                    <DadosPedidoCliente dados={dados}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <DadosProdutos dados={produtos}/>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="row shadow p-2">
                    <div className="row mb-4">
                        <div className="col-md-4 mb-4">
                            <TextField
                                label="Nota Fiscal" required fullWidth type="file" InputLabelProps={{shrink: true}}
                                onChange={e => setData('file_nota_fiscal', e.target.files[0])}>
                            </TextField>
                        </div>
                        <div className="col-md-4 mb-4">
                            <TextField
                                label="Boleto" fullWidth type="file" InputLabelProps={{shrink: true}}
                                onChange={e => setData('file_boleto', e.target.files[0])}>
                            </TextField>
                        </div>
                        <div className="col-md-4 mb-4">
                            <TextField
                                label="Link de Pagamento" fullWidth
                                onChange={e => setData('url_pagamento', e.target.value)}>
                            </TextField>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="mb-3">
                            <button className="btn btn-primary" color={"primary"}>Salvar</button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
