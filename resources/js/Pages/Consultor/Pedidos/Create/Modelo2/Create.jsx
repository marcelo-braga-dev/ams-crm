import Layout from '@/Layouts/Consultor/Layout';

import {useForm} from '@inertiajs/react';

import InfoCliente from './Partials/InfoCliente';
import Anexos from "./Partials/Anexos";
import Pedidos from "./Partials/Pedido";
import AlertDanger from "./Partials/AlertDanger";
import {useState} from "react";


export default function Create({fornecedores, integradores, clientes, lead, errors}) {

    const {data, setData, post, progress, processing} = useForm({
        id_lead: lead.id
    });

    function submit(e) {
        e.preventDefault()
        post(route('consultor.pedidos.store'))
    }

    return (
        <Layout container titlePage="Cadastrar Pedido" voltar={route('consultor.pedidos.index')}>

            <form onSubmit={submit}>
                <div className="">
                    <AlertDanger errors={errors}/>
                    <Pedidos fornecedores={fornecedores} integradores={integradores} setData={setData} data={data}/>

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









