import Layout from "@/Layouts/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import TextField from "@mui/material/TextField";
import {useForm} from "@inertiajs/react";
import HistoricoLista from "@/Components/Leads/HistoricoLista";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";

export default function Show({dados, historicos, consultores, isSdr, idUsuarioCard, status, contatos}) {

    const {data, setData, post} = useForm({
        lead: dados.id,
        consultor: dados.consultor.id
    });

    function enviarComentario(tag, id) {
        post(route('admin.leads.adicionar-comentarios', {id: id, msg: data[tag]}));
        window.location.reload()
    }

    function remover() {
        post(route('admin.leads.limpar-consultor', {id: dados.id, consultor: dados.consultor.id}))
    }

    function voltarStatus() {
        post(route('admin.leads.aberto-voltar', dados.id))
    }

    function avancarStatus() {
        post(route('admin.leads.aberto-avancar', dados.id))
    }

    function finalizarStatus() {
        post(route('admin.clientes.leads.finalizar-status-lead', dados.id))
    }

    function nomeConsultorSelecionado() {
        const nome = consultores[consultores.findIndex(i => i.id === data.novo_consultor)]?.name;
        return nome ? <>
            <b>TROCAR</b> o consultor(a) do Lead para:<br/>
            <h5>{nome}</h5>
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>
    }

    function alterarConsultor() {
        post(route('admin.leads.update-consultor'))
    }

    function onSubmit(e) {
        e.preventDefault();
        post(route('admin.leads.atualizar-status'))
        window.location.reload()
    }

    return (
        <Layout empty menu="leads" submenu="leads-cards" titlePage="Lead - Em Aberto"
                voltar={route('admin.leads.cards-leads.index', {id: dados.sdr.id})}>
            <div className="card card-body mb-3">
                <small>Consultor(a)</small>
                <h5>{dados.consultor.nome}</h5>
            </div>

            <div className="card card-body mb-3">
                <LeadsDados dados={dados}/>
            </div>

            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col-auto">
                        <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal"
                                data-bs-target="#statusAvancar">Avançar Status "ATENDIMENTO"
                        </button>
                    </div>

                    <div className="col-auto">
                        <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal"
                                data-bs-target="#statusFinalizar">Marcar como "FINALIZADO"
                        </button>
                    </div>
                </div>
            </div>


            <div className="card card-body mb-4">
                <form onSubmit={onSubmit}>
                    <h6>Atualizar Status do Lead</h6>
                    <div className="row">
                        <div className="col mb-4">
                            {/*<TextField label="Meio Contato" select fullWidth required defaultValue=""*/}
                            {/*           size="small"*/}
                            {/*           onChange={e => setData('meio_contato', e.target.value)}>*/}
                            {/*    {contatos.map((option, index) => (*/}
                            {/*        <MenuItem key={index} value={option.key}>*/}
                            {/*            {option.nome}*/}
                            {/*        </MenuItem>*/}
                            {/*    ))}*/}
                            {/*</TextField>*/}
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

            <div className="card card-body mb-4">
                <div className="mb-4 border-bottom">
                    <div className="mt-4">
                        <h6 className="mb-3">Histórico de Atendimento</h6>
                        <HistoricoLista
                            historicos={historicos} enviarComentario={enviarComentario}
                            setData={setData} urlPedidos="admin.pedidos.show"
                        />
                    </div>
                </div>
            </div>

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
                                    onClick={() => remover()}>Remover
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
                            Voltar Status deste leads para "EM ABERTO"?
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

            {/*Avancar Status*/}
            <div className="modal fade mt-5" id="statusAvancar" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Limpar LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Avançar Status deste leads para "EM ATENDIMENTO"?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                    onClick={() => avancarStatus()}>Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Finalizar Status*/}
            <div className="modal fade mt-5" id="statusFinalizar" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Limpar LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Avançar Status deste leads para "FINALIZADO"?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                    onClick={() => finalizarStatus()}>Confirmar
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
