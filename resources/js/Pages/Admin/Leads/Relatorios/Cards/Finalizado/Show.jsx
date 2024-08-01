import Layout from "@/Layouts/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import {router, useForm} from "@inertiajs/react";
import MenuItem from "@mui/material/MenuItem";
import HistoricoLista from "@/Components/Leads/HistoricoLista";

export default function Show({dados, historicos, consultores}) {
    const {data, setData, post} = useForm({
        lead: dados.id,
        consultor: dados.consultor.id
    });

    function remover() {
        post(route('admin.leads.limpar-consultor', {id: dados.id, consultor: dados.consultor.id}))
    }

    function voltarStatus() {
        post(route('admin.leads.finalizado-voltar', dados.id))
    }

    function alterarConsultor() {
        console.log(data)
        post(route('admin.leads.update-consultor'))
    }

    function excluirLead() {
        router.post(route('admin.leads.cards-finalizado.destroy', dados.id), {
            consultor: dados.consultor.id,
            '_method': 'DELETE'
        })
    }

    function nomeConsultorSelecionado() {
        const nome = consultores[consultores.findIndex(i => i.id === data.novo_consultor)]?.name;
        return nome ? <>
            <b>TROCAR</b> o consultor(a) do Lead para:<br/>
            <h5>{nome}</h5>
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>
    }

    function enviarComentario(tag, id) {
        post(route('admin.leads.adicionar-comentarios', {id: id, msg: data[tag]}));
        window.location.reload()
    }

    return (
        <Layout titlePage="Lead - Finalizado" menu="leads" submenu="leads-cards"
                voltar={route('admin.leads.cards-leads.index', {id: dados.consultor.id})}>


            <div className="card card-body mb-3">
                <small>Consultor(a)</small>
                <h5>{dados.consultor.nome}</h5>
            </div>

            <div className="card card-body mb-3">
                <LeadsDados dados={dados}/>
            </div>

            <div className="card card-body mb-6">
                <div className="row border-bottom mb-3">
                    <div className="col-auto">
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#limparLead">Limpar LEAD
                        </button>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal"
                                data-bs-target="#statusVoltar">Voltar Status "Iniciar Atendimento"
                        </button>
                    </div>
                    <div className="col-auto">
                        <button type="button" className="btn btn-danger" data-bs-toggle="modal"
                                data-bs-target="#deletarLead">
                            <i className="fas fa-trash"></i> Deletar LEAD
                        </button>
                    </div>
                </div>
                <div className="row">
                    <span>Alterar consultor</span>
                    <div className="col-md-4">
                        <TextField label="Selecione o Consultor..." select
                                   fullWidth required size="small" defaultValue=""
                                   onChange={e => setData('novo_consultor', e.target.value)}>
                            {consultores.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-4 p-0">
                        <button type="button" className="btn btn-dark" data-bs-toggle="modal"
                                data-bs-target="#alterarConsultor">
                            ENVIAR
                        </button>
                    </div>
                </div>
            </div>

            <h6 className="mb-3">Histórico de Atendimento</h6>
            <HistoricoLista
                historicos={historicos} enviarComentario={enviarComentario}
                setData={setData} urlPedidos="admin.pedidos.show"
            />

            {/*Modal Limpar Lead*/}
            <div className="modal fade mt-5" id="limparLead" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Limpar LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Remover esse Lead deste consultor(a)?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => remover()}>Remover Consultor(a)
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Voltar Status*/}
            <div className="modal fade mt-5" id="statusVoltar" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Limpar LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Voltar Status deste leads para "EM ATENDIMENTO"?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                    onClick={() => voltarStatus()}>Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Deletar LEAD*/}
            <div className="modal fade mt-5" id="deletarLead" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">DELETAR LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja EXCLUIR PERMANENTEMENTE esse LEAD?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => excluirLead()}>Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Alterar consultor*/}
            <div className="modal fade mt-5" id="alterarConsultor" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Alterar consultor</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {nomeConsultorSelecionado()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => alterarConsultor()}>Alterar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
