import Layout from "@/Layouts/Layout";
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
        axios.post(route('admin.dev-andamento.update', id), {_method: 'put', status: status})
            .then(results => {
            })
    }

    return (
        <Layout titlePage="DEV" container menu="dev" submenu="registros">
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
                <div className="col">
                    <button onClick={() => avancarStatus()} className="btn btn-primary">Avançar Status para Em Andamento</button>
                </div>
            </div>

            <div className="row mt-4">
                <h5>Tarefas:</h5>
                <table className="table">
                    <tbody>
                    {tarefas.map((dados, index) => {
                            return (
                                <tr key={index}>
                                    <td className="col-1">
                                        <TextField label="Status" select fullWidth required defaultValue={dados.status}
                                                   onChange={e => atualizarStatus(dados.id, e.target.value)}>
                                            <MenuItem value="novo">Novo</MenuItem>
                                            <MenuItem value="aprovando">Aprovar</MenuItem>
                                        </TextField>
                                    </td>
                                    <td>
                                        <span className="ps-3">{dados.texto}</span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
