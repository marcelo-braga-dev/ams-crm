import Layout from "@/Layouts/Consultor/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import * as React from "react";
import {useState} from "react";
import {TextField} from "@mui/material";

export default function Show({dados, status, contatos, historicos}) {

    const [qtdHistorico, setQtqHistorico] = useState(historicos.length);

    return (
        <Layout container voltar={route('consultor.leads.main.index')} titlePage="Lead Finalizado">

            <div className="row justify-content-between">
                <div className="col-auto"><h6>Lead Finalizado</h6></div>
            </div>

            <div className="card mb-3">
                <div className="card-body">
                    <LeadsDados dados={dados}/>
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
