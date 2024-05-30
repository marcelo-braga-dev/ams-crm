import {TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";

export default function HistoricoLista({historicos, enviarComentario, setData, urlPedidos}) {
    const [qtdHistorico, setQtqHistorico] = useState(historicos.length);

    return (
        historicos?.length > 0 ?
            historicos.map((dado, index) => (
                <div key={index} className="row card card-body mb-3">
                    <div className="col-auto">
                        {qtdHistorico - index}.
                    </div>
                    <div className="col">
                        <span className="h6 mb-6">{dado.id_pedido ? dado.msg : dado.status}</span>
                        <span className="d-block"><b>Autor:</b> {dado.nome}</span>
                        {dado.meio_contato &&
                            <span className="d-block"><b>Meio de Contato:</b> {dado.meio_contato}</span>}
                        {dado.msg &&
                            <span className="d-block"><b>Anotações:</b> {dado.msg}</span>}
                        {dado.id_pedido && <a href={route(urlPedidos, dado.id_pedido)}
                                              className="btn btn-success btn-sm">Ver Pedido</a>}
                        <span className="small d-block">Data: {dado.data_criacao}</span>

                        <div className="mt-3">
                            <small className="d-block">Comentários:</small>
                            <div className="mb-3">
                                {dado.comentarios.map((msg, index) => {
                                    return (
                                        <div key={index} className="card card-body p-2 mb-2 ">
                                            <small className="d-block"><b>Autor:</b> {msg.nome}</small>
                                            <small><b>Mensagem:</b> {msg.msg}</small>
                                            <small><b>Data:</b> {msg.data}</small>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="card card-body">
                                <div className="row">
                                    <div className="col">
                                        <TextField size="small" className="d-block" fullWidth label="Novo Comentário..."
                                                   onChange={e => setData('msg_' + index, e.target.value)}>
                                        </TextField></div>
                                    <div className="col-auto">
                                        <button className="btn btn-success btn-sm mt-1"
                                                onClick={() => enviarComentario('msg_' + index, dado.id)}>
                                            Salvar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )) : <small>Não há histórico de atendimento.</small>
    )
}
