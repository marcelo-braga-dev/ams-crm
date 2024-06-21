import {TextField, Typography} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

export default function HistoricoLista({historicos, enviarComentario, setData, urlPedidos}) {
    const [qtdHistorico, setQtqHistorico] = useState(historicos.length);

    return (
        historicos?.length > 0 ?
            historicos.map((dado, index) => (
                <CardContainer key={index}>
                    <CardBody>
                        <div className="row">
                            <div className="col">
                                <span className="h6 mb-6">{qtdHistorico - index}. {dado.id_pedido ? dado.msg : dado.status}</span>
                                <span className="d-block"><b>Autor:</b> {dado.nome}</span>
                                {dado.meio_contato && <span className="d-block"><b>Meio de Contato:</b> {dado.meio_contato}</span>}
                                {dado.msg && <span className="d-block"><b>Anotações:</b> {dado.msg}</span>}
                                {dado.id_pedido && <a href={route(urlPedidos, dado.id_pedido)} className="btn btn-success btn-sm">Ver Pedido</a>}
                                <span className="small d-block">Data: {dado.data_criacao}</span>
                            </div>
                            <div className="col">
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
                                    <div className="row">
                                        <div className="col">
                                            <TextField size="small" className="d-block" fullWidth label="Adicionar Comentário..."
                                                       onChange={e => setData('msg_' + index, e.target.value)}>
                                            </TextField></div>
                                        <div className="col-auto">
                                            <button className="btn btn-success btn-sm mt-0 px-3" onClick={() => enviarComentario('msg_' + index, dado.id)}>
                                                Salvar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>
            )) :
            <Typography variant="body1">Não há histórico de atendimento.</Typography>
    )
}
