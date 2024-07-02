import Layout from "@/Layouts/Layout";

import {router, useForm} from '@inertiajs/react';

import InfoCliente from './Partials/InfoCliente';
import Pedidos from "./Partials/Pedido";
import AlertDanger from "./Partials/AlertDanger";
import {useState} from "react";


export default function Edit({pedido, fornecedores, cliente, preco, errors}) {
    const {data, setData, post, progress, processing} = useForm({
        pessoa: 'Pessoa Física',
        documentos_check: 'cnh',
        preco: preco,
        forma_pagamento: pedido.forma_pagamento
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('consultor.revisar.update', pedido.id), {
            '_method': 'put',
            ...data
        })
    }

    return (
        <Layout titlePage="Cadastrar Pedido" menu="pedidos" submenu="pedidos-lista"                voltar={route('consultor.pedidos.index', {id_card:  pedido.pedido.id})}>

            <form onSubmit={submit}>
                <div className="row mb-5 pb-4 border-bottom">
                    <AlertDanger errors={errors}/>
                    <InfoCliente dados={cliente}/>
                </div>
                <div className="">
                    <Pedidos fornecedores={fornecedores} pedido={pedido} setData={setData} data={data}/>

                    <div className="row text-center mb-3">
                        <div className="col">
                            {progress && (
                                <progress value={progress.percentage} max="100">
                                    {progress.percentage}%
                                </progress>
                            )}
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col">
                            <button className="btn btn-primary" disabled={processing}>Cadastrar</button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}









