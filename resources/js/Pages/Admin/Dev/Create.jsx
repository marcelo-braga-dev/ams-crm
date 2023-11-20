import React, {useState} from "react";
import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuItem from "@mui/material/MenuItem";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";

export default function Create({dataAtual, setores}) {
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
            <div key={i} className="row mt-3">
                <div className="col">
                    <TextField fullWidth
                               onChange={e => setData('tarefas', {...data.tarefas, [i]: e.target.value})}/>
                </div>
            </div>
        )
    }

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
                    <div className="col-md-3 mb-4">
                        <TextField label="Área" select fullWidth required defaultValue=""
                                   onChange={e => setData('area', e.target.value)}>
                            <MenuItem value="Pedidos">Pedidos</MenuItem>
                            <MenuItem value="Chat Interno">Chat Interno</MenuItem>
                            <MenuItem value="Agenda">Agenda</MenuItem>
                            <MenuItem value="Leads">Leads</MenuItem>
                            <MenuItem value="Emails">Emails</MenuItem>
                            <MenuItem value="Contas Usuários">Contas Usuários</MenuItem>
                            <MenuItem value="SAC">SAC</MenuItem>
                            <MenuItem value="Fornecedores">Fornecedores</MenuItem>
                            <MenuItem value="Outros">Outros</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-md-3 mb-4">
                        <TextField label="Setor" select fullWidth required defaultValue=""
                                   onChange={e => setData('setor', e.target.value)}>
                            <MenuItem value="Todos">Todos</MenuItem>
                            {setores.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.id}>{item.nome}</MenuItem>
                                )
                            })}
                        </TextField>
                    </div>
                    <div className="col-md-3 mb-4">
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
                    <div className="col-md-3 mb-4 mt-4">
                        <TextFieldMoney label="Valor do Serviço" value={data.valor_servico} setData={setData} index="valor_servico" />
                    </div>
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
