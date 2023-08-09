import {TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";

export default function HistoricoLista({historicos, enviarComentario, setData}) {
    const [qtdHistorico, setQtqHistorico] = useState(historicos.length);

    return (
        historicos.map((dado, index) => (
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
                        <TextField size="small" className="d-block" fullWidth label="Novo Comentário..."
                                   onChange={e => setData('msg_' + index, e.target.value)}></TextField>
                        <button className="btn btn-link btn-sm text-dark p-0"
                                onClick={() => enviarComentario('msg_' + index, dado.id)}>
                            + Adicionar comentário
                        </button>
                    </div>
                </div>
            </div>
        ))
    )
}
