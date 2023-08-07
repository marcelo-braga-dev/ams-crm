import Layout from "@/Layouts/Admin/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/react";
import TextField from "@mui/material/TextField";
import {useState} from "react";

export default function Edit({dados, historicos}) {

    const [qtdHistorico, setQtqHistorico] = useState(historicos.length);

    const {data, setData, post} = useForm();
    function remover() {
        post(route('admin.leads.limpar-consultor', {id: dados.id, consultor: dados.consultor.id}))
    }

    function avancarStatus() {
        post(route('admin.leads.novo-avancar', dados.id))
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

            <div className="row mb-6">
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

            <h6 className="mb-3">Histórico de Atendimento</h6>
            {historicos.map((dado, index) => (
                <div key={index} className="card card-body mb-3">
                    <div className="row p-3">
                        <div className="col">
                            <h6 className="mb-2">{qtdHistorico - index}. {dado.status}</h6>
                            <span className="d-block"><b>Autor:</b> {dado.nome}</span>
                            <span className="d-block"><b>Meio de Contato:</b> {dado.meio_contato}</span>
                            <span className="d-block"><b>Anotações:</b> {dado.msg}</span>
                            <span className="small">Data: {dado.data_criacao}</span>
                        </div>
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
                            <TextField size="small" className="d-block" fullWidth label="Novo Comentário..."
                                       onChange={e => setData('msg_' + index, e.target.value)}></TextField>
                            <button className="btn btn-link btn-sm text-dark p-0"
                                    onClick={() => enviarComentario('msg_' + index, dado.id)}>+ Adicionar
                                comentário
                            </button>
                        </div>
                    </div>
                </div>
            ))}

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
                                    onClick={() => remover()}>Remover</button>
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
        </Layout>
    )
}
