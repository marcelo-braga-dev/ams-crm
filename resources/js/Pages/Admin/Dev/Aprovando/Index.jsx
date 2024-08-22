import Layout from "@/Layouts/Layout";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from "react";
import {router, useForm} from "@inertiajs/react";
import DadosDev from "@/Components/Dados/Dev";
import { MenuItem, TextField } from "@mui/material";

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

    function atualizarStatus(id, status) {
        axios.post(route('admin.dev-andamento.update', id), {_method: 'put', status: status})
            .then(results => {
            })
    }

    return (
        <Layout titlePage="Aprovar DEV" container menu="dev" submenu="registros">

            <DadosDev dados={dados}/>

            <div className="row mt-4">
                <h6>Tarefas:</h6>
                <table className="table">
                    <tbody>
                    {tarefas.map((dados, index) => {
                        return (
                            <tr>
                                <td className="col-2">
                                    <TextField select fullWidth defaultValue={dados.status}
                                        onChange={e => atualizarStatus(dados.id, e.target.value)}>
                                            <MenuItem value="aprovando">Aguardando Aprovação</MenuItem>
                                            <MenuItem value="aprovado">Aprovado</MenuItem>
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
            <div className="row mt-4">
                <div className="col">
                    <button onClick={() => submit()} className="btn btn-primary">Finalizar Suporte</button>
                </div>
            </div>
        </Layout>
    )
}
