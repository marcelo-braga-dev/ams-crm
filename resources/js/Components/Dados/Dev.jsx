import React from "react";

export default function DadosDev({dados}) {
    return (
        <>
            <div className="row row-cols-2">
                <div className="col">
                    <span className="d-block"><b>ID:</b> #{dados.id}</span>
                    <span className="d-block"><b>Título:</b> {dados.titulo}</span>
                    <span className="d-block"><b>Descrição:</b> {dados.descricao}</span>
                    <span className="d-block"><b>Anotações:</b> {dados.anotacoes}</span>
                    <span className="d-block"><b>Área:</b> {dados.area}</span>
                    <span className="d-block"><b>Prioridade:</b> {dados.prioridade === 'urgente' ?
                        <span className="badge rounded-pill bg-danger">Urgente</span> :
                        "Normal"}</span>
                </div>
                <div className="col">
                    <span className="d-block"><b>Setor:</b> {dados.setor}</span>
                    <span className="d-block"><b>Valor Inicial:</b> R$ {dados.valor_inicial}</span>
                    <span className="d-block"><b>Valor Final:</b> R$ {dados.valor_final}</span>
                    <span className="d-block"><b>Prazo Inicial:</b> {dados.data_inicial}</span>
                    <span className="d-block"><b>Prazo Final:</b> {dados.data_final}</span>
                    <span className="d-block"><b>Sequência:</b> {dados.sequencia}</span>
                    <span className="d-block"><b>Status do Pagamento:</b> {dados.status_pagamento}</span>
                </div>
            </div>
        </>
    )
}
