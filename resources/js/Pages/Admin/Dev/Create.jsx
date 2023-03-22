import React, {useState} from "react";
import Layout from '@/Layouts/Admin/Layout';
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuItem from "@mui/material/MenuItem";

export default function Create({dataAtual}) {
    const [qtdTarefas, setQtdTarefas] = useState(3);

    const {data, setData, post} = useForm({
        prazo: dataAtual,
        descricao: '',
        tarefas: ''
    })

    function submit(e) {
        e.preventDefault();
        if (data.descricao.length <= 500)
            post(route('admin.dev.store'))
    }

    let rows = [];
    for (let i = 1; i <= qtdTarefas; i++) {
        rows.push(
            <div className="row mt-3">
                <div className="col">
                    <TextField fullWidth
                               onChange={e => setData('tarefas', {...data.tarefas, [i]: e.target.value})}/>
                </div>
            </div>
        )
    }
    console.log(data)
    return (
        <Layout container titlePage="Cadastrar - Desenvolvimento"
                menu="dev" submenu="cadastrar">
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col mb-4">
                        <TextField label="Título" fullWidth required
                                   onChange={e => setData('titulo', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                <div className="col-md-4 mb-4">
                    <TextField label="Área" select fullWidth required defaultValue=""
                               onChange={e => setData('area', e.target.value)}>
                        <MenuItem value="pedidos">Pedidos</MenuItem>
                        <MenuItem value="chat_interno">Chat Interno</MenuItem>
                        <MenuItem value="agenda">Agenda</MenuItem>
                        <MenuItem value="leads">Leads</MenuItem>
                        <MenuItem value="emails">Emails</MenuItem>
                        <MenuItem value="contas_usuarios">Contas Usuários</MenuItem>
                        <MenuItem value="sac">SAC</MenuItem>
                        <MenuItem value="fornecedores">Fornecedores</MenuItem>
                        <MenuItem value="outros">Outros</MenuItem>
                    </TextField>
                </div>
                    <div className="col-md-4 mb-4">
                        <TextField label="Prioridade" select fullWidth required defaultValue=""
                                   onChange={e => setData('prioridade', e.target.value)}>
                            <MenuItem value="normal">Normal</MenuItem>
                            <MenuItem value="urgente">Urgente</MenuItem>
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    {data.descricao.length > 500 ?
                        <div className="text-danger mb-2">Limite do texto atingido!</div> : ""}
                    <div className="col-12">
                        <TextField multiline minRows="5" label="Breve Descrição" fullWidth required
                                   onChange={e => setData('descricao', e.target.value)}/>
                    </div>
                    <div className="col-12 text-end">
                        <small className={data.descricao.length > 500 ? 'text-danger' : ''}>
                            {data.descricao.length}/500</small>
                    </div>
                </div>
                <div className="row">
                    <div className="col-auto"><h5>Tarefas</h5></div>
                    <div className="col-auto">
                        <ChevronLeftIcon onClick={() => setQtdTarefas(qtdTarefas - 1)}/>
                        {qtdTarefas}
                        <ChevronRightIcon onClick={() => setQtdTarefas(qtdTarefas + 1)}/>
                    </div>
                </div>

                {rows}

                <div className="row mt-4">
                    <div className="col-md-4 mb-4 mt-4">
                        <TextField type="datetime-local" label="Prazo" fullWidth required
                                   defaultValue={data.prazo} onChange={e => setData('prazo', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-auto mx-auto">
                        <button className="btn btn-primary" type="submit">Enviar</button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
