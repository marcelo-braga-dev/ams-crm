import Layout from "@/Layouts/Admin/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useState} from "react";
import TextField from "@mui/material/TextField";

export default function Show({dados, historicos}) {

    const [qtdHistorico, setQtqHistorico] = useState(historicos.length);

    return (
        <Layout container voltar={route('admin.leads.consultores-cards.index', {id: dados.consultor.id})}
                titlePage="Lead - Finalizado">

            <div className="card card-body mb-3">
                <small>Consultor(a)</small>
                <h5>{dados.consultor.nome}</h5>
            </div>

            <div className="card card-body mb-6">
                <LeadsDados dados={dados}/>
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
                            {dado.comentarios.length === 0 ? 'Não há comentários.' :
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
                            }
                        </div>
                    </div>
                </div>
            ))}
        </Layout>
    )
}
