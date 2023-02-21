import Layout from '@/Layouts/Consultor/Layout';

import {useForm, usePage} from '@inertiajs/react';

import InfoCliente from './Partials/InfoCliente';
import Anexos from "./Partials/Anexos";
import Pedidos from "./Partials/Pedido";
import AlertDanger from "./Partials/AlertDanger";


export default function Create({fornecedores, integradores}) {
    const {errors} = usePage().props;

    const {data, setData, post, progress, processing} = useForm({
        pessoa: 'Pessoa Física',
        documentos_check: 'cnh'
    });

    function submit(e) {
        e.preventDefault()
        post(route('consultor.pedidos.store'))
    }

    return (
        <Layout container titlePage="Cadastrar Pedido" voltar={route('consultor.pedidos.index')}>

            <form onSubmit={submit}>
                <div className="row mb-5 pb-4 border-bottom">
                    <AlertDanger errors={errors}></AlertDanger>
                    <InfoCliente setData={setData} data={data}></InfoCliente>
                </div>
                <div className="row mb-5 border-bottom">
                    <Anexos setData={setData} data={data}></Anexos>
                </div>
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









