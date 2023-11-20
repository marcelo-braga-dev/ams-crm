import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/react";
import HistoricoLista from "@/Components/Leads/HistoricoLista";
import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function Edit({dados, historicos, consultores}) {

    const {data, setData, post} = useForm({
        lead: dados.id,
        consultor: dados.consultor.id
    });

    function remover() {
        post(route('admin.leads.limpar-consultor', {id: dados.id, consultor: dados.consultor.id}))
    }

    function avancarStatus() {
        post(route('admin.leads.novo-avancar', dados.id))
    }

    function enviarComentario(tag, id) {
        post(route('admin.leads.adicionar-comentarios', {id: id, msg: data[tag]}));
        window.location.reload()
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

    return (
        <Layout container titlePage="Lead - Em aberto"
                voltar={route('admin.leads.consultores-cards.index', {id: dados.consultor.id})}>
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
                                data-bs-target="#statusAvancar">Avançar Status "Em Atendimento"
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
            <div className="modal fade" id="limparLead" tabIndex="-1" aria-labelledby="limparLeadLabel"
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

            {/*Avancar Status*/}
            <div className="modal fade" id="statusAvancar" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Limpar LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Avançar Status deste leads para "Em Atendimento"?
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

            {/*Alterar consultor*/}
            <div className="modal fade" id="alterarConsultor" tabIndex="-1" aria-labelledby="limparLeadLabel"
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
