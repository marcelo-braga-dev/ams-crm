import Layout from '@/Layouts/Consultor/Layout';

import {useForm} from '@inertiajs/react';

import InfoCliente from './Partials/InfoCliente';
import Anexos from "./Partials/Anexos";
import Pedidos from "./Partials/Pedido";
import AlertDanger from "./Partials/AlertDanger";
import {useState} from "react";


export default function Create({fornecedores, integradores, clientes, lead, errors}) {

    const [cliente, setCliente] = useState(true)
    const {data, setData, post, progress, processing} = useForm({
        pessoa: 'Pessoa Física',
        documentos_check: 'cnh',
        idCliente: '',
        integrador: lead.id
    });

    function submit(e) {
        e.preventDefault()
        post(route('consultor.pedidos.store'))
    }

    return (
        <Layout container titlePage="Cadastrar Pedido" voltar={route('consultor.pedidos.index')}>

            <form onSubmit={submit}>
                <div className="row mb-5 pb-4 border-bottom">
                    <AlertDanger errors={errors}/>
                    <InfoCliente
                        setData={setData} data={data} clientes={clientes}
                        cliente={cliente} setCliente={setCliente}
                    />
                </div>
                {!cliente &&
                    <div className="row mb-5 border-bottom">
                        <Anexos setData={setData} data={data} cliente={cliente}></Anexos>
                    </div>
                }
                <div className="">
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









