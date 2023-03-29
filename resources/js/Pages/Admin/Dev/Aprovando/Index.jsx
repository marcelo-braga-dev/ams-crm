import Layout from "@/Layouts/Admin/Layout";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from "react";
import {router, useForm} from "@inertiajs/react";
import DadosDev from "@/Components/Dados/Dev";

export default function ({dados, tarefas}) {
    const {data} = useForm({
        avancarStatus: true,
    });

    function submit() {
        router.post(route('admin.dev-aprovando.update', dados.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout titlePage="Aprovar Suporte" container menu="dev" submenu="registros">

            <DadosDev dados={dados}/>

            <div className="row mt-4">
                <h6>Tarefas:</h6>
                <div className="col-12">

                    <ul className="list-group">
                    {tarefas.map((dados, index) => {
                        return (
                                <li key={index} className="list-group-item">
                                    {dados.status === 'novo' ?
                                        <AccessTimeIcon /> : <CheckCircleOutlineIcon className="text-success"/>}
                                    <span className="ps-3">{dados.texto}</span>
                                </li>
                        )
                    })}
                    </ul>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <button onClick={() => submit()} className="btn btn-primary">Aprovar</button>
                </div>
            </div>
        </Layout>
    )
}
