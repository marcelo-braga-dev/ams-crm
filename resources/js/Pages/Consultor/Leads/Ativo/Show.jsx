import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/react";
import {router} from '@inertiajs/react'
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import * as React from "react";
import {useState} from "react";
import HistoricoLista from "@/Components/Leads/HistoricoLista";

export default function Show({dados, status, contatos, historicos, permissaoPedido}) {
    const {data, setData, post} = useForm({
        msg: '',
        classificacao: dados.cliente.classificacao,
        idLead: dados.id
    });

    function onSubmit(e) {
        e.preventDefault();
        post(route('consultor.leads.atualizar-status'))
        window.location.reload()
    }

    function updateClassificacao(id, valor) {
        post(route('consultor.leads.update-classificacao', {id: id, valor: valor}), {
            preserveScroll: true
        })
        setData('classificacao', valor)
    }

    function enviarComentario(tag, id) {

        post(route('consultor.leads.add-comentarios', {id: id, comentario: data[tag]}));
        window.location.reload()
    }

    return (
        <Layout container voltar={route('consultor.leads.main.index')} titlePage="Lead - Ativo"
                menu="clientes-lista">
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
                            {permissaoPedido ?
                                <a href={route('consultor.pedidos.create', {lead: dados.id})}
                                   className="btn btn-warning">
                                    <RequestPageOutlinedIcon/> Lançar Pedido
                                </a> : 'Você não tem permissão para emitir pedidos.'}
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

                            <HistoricoLista
                                historicos={historicos} enviarComentario={enviarComentario}
                                setData={setData} urlPedidos="consultor.pedidos.show"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
