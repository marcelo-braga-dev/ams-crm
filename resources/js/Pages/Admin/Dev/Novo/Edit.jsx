import Layout from "@/Layouts/Admin/Layout";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import axios from "axios";
import {router, useForm} from "@inertiajs/react";

export default function ({dados, tarefas}) {
    const {data} = useForm({
        avancarStatus: true,
    });

    function avancarStatus() {
        router.post(route('admin.dev-novo.update', dados.id), {
            _method: 'put',
            ...data
        })
    }

    function atualizarStatus(id, status) {
        axios.put(route('admin.dev-andamento.update', id), {_method: 'put', status: status})
            .then(results => {
            })
    }

    return (
        <Layout titlePage="Suporte em Aberto" container menu="dev" submenu="registros">
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
                <h5>Tarefas:</h5>
                <div className="col-12">

                    <ul className="list-group">
                        {tarefas.map((dados, index) => {
                            return (
                                <div key={index} className="row shadow mt-3 p-2">
                                    <div className="col-md-3">
                                        <TextField label="Status" select fullWidth required defaultValue={dados.status}
                                                   onChange={e => atualizarStatus(dados.id, e.target.value)}>
                                            <MenuItem value="novo">Novo</MenuItem>
                                            <MenuItem value="aprovando">Aprovar</MenuItem>
                                        </TextField>
                                    </div>
                                    <div className="col">
                                        <span className="ps-3">{dados.texto}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <button onClick={() => avancarStatus()} className="btn btn-primary">Avançar Status</button>
                </div>
            </div>
        </Layout>
    )
}
