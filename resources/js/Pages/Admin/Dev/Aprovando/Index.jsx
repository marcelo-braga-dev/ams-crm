import Layout from "@/Layouts/Admin/Layout";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from "react";
import {router, useForm} from "@inertiajs/react";

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
            <div className="row">
                <div className="col">
                    <span className="d-block">Título: {dados.titulo}</span>
                    <span className="d-block">Descrição: {dados.descricao}</span>
                    <span className="d-block">Anotações: {dados.anotacoes}</span>
                    <span className="d-block">Área: {dados.area}</span>
                    <span className="d-block">Prioridade: {dados.prioridade}</span>
                    <span className="d-block">ID: #{dados.id}</span>
                </div>
            </div>
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
