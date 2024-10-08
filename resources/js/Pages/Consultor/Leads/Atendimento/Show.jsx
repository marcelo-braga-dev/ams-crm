import Layout from "@/Layouts/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {router, useForm} from "@inertiajs/react";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import HistoricoLista from "@/Components/Leads/HistoricoLista";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";

export default function Show({dados, status, contatos, historicos, isSdr}) {
    const {data, setData, post} = useForm({
        msg: '',
        classificacao: dados.cliente.classificacao,
        idLead: dados.id
    });

    function avancaStatus(id) {
        router.post(route('consultor.leads.atendimento.update', id), {
            '_method': 'PUT'
        })
    }

    function onSubmit(e) {
        e.preventDefault();
        post(route('consultor.leads.atualizar-status'))
        window.location.reload()
    }

    function finalizarAtendimento(e) {
        e.preventDefault();
        post(route('consultor.leads.atendimento.store', {id: dados.id}))
    }

    function updateClassificacao(id, valor) {
        post(route('consultor.leads.update-classificacao', {id: id, valor: valor}), {
            preserveScroll: true
        })
        setData('classificacao', valor)
    }

    function enviarComentario(tag, id) {
        post(route('consultor.leads.add-comentarios', {id: id, comentario: data[tag]}));
    }

    router.on('success', () => window.location.reload())

    return (
        <Layout empty menu="leads" voltar={route('consultor.leads.main.index')} titlePage="Lead - Em Atendimento">
            <CardContainer>
                <CardBody>
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
                            <a href={route('consultor.leads.main.edit', dados.id)} className="btn btn-primary btn-sm mb-0">Editar Dados</a></div>
                    </div>
                </CardBody>
            </CardContainer>


            {!isSdr && <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-auto">
                            <button onClick={() => avancaStatus(dados.id)}
                                    className="btn btn-success">Ativar Lead
                            </button>
                        </div>
                        <div className="col-auto">
                            <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal"
                                    data-bs-target="#modalFinalizary">
                                Finalizar Atendimento
                            </button>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>}

            <div className="row mb-4">
                <div className="col">
                    <CardContainer>
                        <CardBody>
                            <form onSubmit={onSubmit}>
                                <h6>Atualizar Status</h6>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
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
                        </CardBody>
                    </CardContainer>
                </div>
            </div>

            <HistoricoLista
                historicos={historicos} enviarComentario={enviarComentario}
                setData={setData} urlPedidos="consultor.pedidos.show"
            />

            {/*Modal*/}
            <div className="modal fade mt-5" id="modalFinalizary" tabIndex="10" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-center ed">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Finalizar Atendimento</h5>
                            <button type="button" className="btn-close bg-dark" data-bs-dismiss="modal"
                                    aria-label="Close"/>
                        </div>
                        <form onSubmit={finalizarAtendimento}>
                            <div className="modal-body">

                                Confirmar finalização do atendimento?

                                <TextField label="Status" className="mt-3" select fullWidth required defaultValue=""
                                           size="small"
                                           onChange={e => setData('status', e.target.value)}>
                                    {status.map((option, index) => (
                                        <MenuItem key={index} value={option.status}>
                                            {option.nome}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField className="mt-3" label="Motivo/Anotações (min. 10 caracteres)" multiline
                                           rows="6" fullWidth required
                                           onChange={e => setData('msg', e.target.value)}/>
                                <div className="text-end">
                                    <small
                                        className={data.msg.length >= 10 ? "text-success" : ''}>({data.msg.length}/10)</small>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div className="row">
                                    <div className="col">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                            Voltar
                                        </button>
                                    </div>
                                    <div className="col">
                                        <button disabled={data.msg.length < 10} type="submit"
                                                className="btn btn-primary"
                                                data-bs-dismiss={(data.msg.length < 10) ? '' : "modal"}>
                                            Finalizar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
