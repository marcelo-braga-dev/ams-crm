import Layout from "@/Layouts/Consultor/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/react";
import {router} from '@inertiajs/react'
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import * as React from "react";
import {useState} from "react";

export default function Show({dados, status, contatos, historicos}) {
    const {data, setData, post} = useForm({
        msg: '',
        classificacao: dados.cliente.classificacao
    });

    const [qtdHistorico, setQtqHistorico] = useState(historicos.length);

    function onSubmit(e) {
        e.preventDefault();
        router.post(route('consultor.leads.atendimento.update', dados.id), {
            _method: 'put',
            ...data
        })
        window.location.reload()
    }

    function updateClassificacao(id, valor) {
        post(route('consultor.leads.update-classificacao', {id: id, valor: valor}), {
            preserveScroll: true
        })
        setData('classificacao', valor)
    }

    function enviarComentario(tag, id) {
        console.log(data[tag])
        post(route('consultor.leads.add-comentarios', {id: id, comentario: data[tag]}));
        window.location.reload()
    }

    return (
        <Layout container voltar={route('consultor.leads.main.index')} titlePage="Lead - Ativo">
            <div className="row justify-content-between">
                <div className="col-auto"><h6>Lead Ativo</h6></div>
                <div className="col-auto"></div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <LeadsDados dados={dados}/>
                    <div className="row">
                        <div className="col">
                            <span className="text-bold pe-2">Classificação:</span>
                            <span
                                className={'mx-1 cursor-pointer' + (data.classificacao === '❌' ? " border p-2 rounded bg-dark" : '')}
                                onClick={() => updateClassificacao(dados.id, '❌')}>❌</span>
                            <span
                                className={'mx-1 cursor-pointer' + (data.classificacao === '☹️' ? " border p-2 rounded bg-dark" : '')}
                                onClick={() => updateClassificacao(dados.id, '☹️')}>☹️</span>
                            <span
                                className={'mx-1 cursor-pointer' + (data.classificacao === '😐' ? " border p-2 rounded bg-dark" : '')}
                                onClick={() => updateClassificacao(dados.id, '😐')}>😐</span>
                            <span
                                className={'mx-1 cursor-pointer' + (data.classificacao === '🙂' ? " border p-2 rounded bg-dark" : '')}
                                onClick={() => updateClassificacao(dados.id, '🙂')}>🙂</span>
                            <span
                                className={'mx-1 cursor-pointer' + (data.classificacao === '😁' ? " border p-2 rounded bg-dark" : '')}
                                onClick={() => updateClassificacao(dados.id, '😁')}>😁</span>
                        </div>
                        <div className="col text-end">
                            <a href={route('consultor.leads.main.edit', dados.id)}
                               className="btn btn-primary btn-sm mb-0">Editar Dados</a></div>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-auto">
                            <a href={route('consultor.pedidos.create', {lead: dados.id})} className="btn btn-warning">
                                <RequestPageOutlinedIcon/> Lançar Pedido
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <h6>Atualizar Status</h6>
                                <div className="row">
                                    <div className="col">
                                        <TextField label="Status" select fullWidth required defaultValue="" size="small"
                                                   onChange={e => setData('status', e.target.value)}>
                                            {status.map((option, index) => (
                                                <MenuItem key={index} value={option.status}>
                                                    {option.nome}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div className="col mb-4">
                                        <TextField label="Meio Contato" select fullWidth required defaultValue=""
                                                   size="small"
                                                   onChange={e => setData('meio_contato', e.target.value)}>
                                            {contatos.map((option, index) => (
                                                <MenuItem key={index} value={option.key}>
                                                    {option.nome}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col">
                                        <TextField label="Anotações" multiline rows="2" fullWidth
                                                   onChange={e => setData('msg', e.target.value)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="text-center">
                                            <button className="btn btn-primary"
                                                    onClick={() => setData('salvar_msg', true)}
                                                    type="submit">
                                                Enviar Anotações
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-3">Histórico de Atendimento</h6>
                            {historicos.map((dado, index) => (
                                <div key={index} className="row shadow p-2 mb-3 rounded">

                                    <div className="col-auto">
                                        {qtdHistorico - index}.
                                    </div>
                                    <div className="col">
                                        <span className="h6 mb-6">{dado.id_pedido ? dado.msg : dado.status}</span>
                                        <span className="d-block"><b>Autor:</b> {dado.nome}</span>
                                        {dado.meio_contato &&
                                            <span className="d-block">
                                                <b>Meio de Contato:</b> {dado.meio_contato}</span>}
                                        {dado.id_pedido ? '' :
                                            <span className="d-block"><b>Anotações:</b> {dado.msg}</span>}
                                        {dado.id_pedido && <a href={route('consultor.pedidos.show', dado.id_pedido)}
                                                              className="btn btn-success btn-sm">Ver Pedido</a>}
                                        <span className="small d-block">Data: {dado.data_criacao}</span>

                                        <div className="mt-3">
                                            <small className="d-block">Comentários:</small>
                                            <div className="mb-3">
                                                {dado.comentarios.map((msg, index) => {
                                                    return (
                                                        <div key={index} className="card border p-2 mb-2 rounded">
                                                            <small className="d-block"><b>Autor:</b> {msg.nome}</small>
                                                            <small><b>Mensagem:</b> {msg.msg}</small>
                                                            <small><b>Data:</b> {msg.data}</small>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                            <TextField size="small" className="d-block" fullWidth
                                                       label="Novo Comentário..."
                                                       onChange={e => setData('msg_' + index, e.target.value)}></TextField>
                                            <button className="btn btn-link btn-sm text-dark p-0"
                                                    onClick={() => enviarComentario('msg_' + index, dado.id)}>+
                                                Adicionar
                                                comentário
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
