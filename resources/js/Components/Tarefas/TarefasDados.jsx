import React from "react";
import {Typography} from "@mui/material";

export default function TarefasDados({dados}) {
    return (
        <div className="row row-cols-2">
            <div className="col">
                <Typography><b>Título:</b> {dados.titulo}</Typography>
                <Typography><b>Descrição:</b> {dados.descricao}</Typography>
                <Typography><b>ID:</b> #{dados.id}</Typography>
                <Typography><b>Status:</b> {dados.status}</Typography>
                <Typography><b>Anotações:</b> {dados.anotacoes}</Typography>
                <Typography><b>Área:</b> {dados.area}</Typography>
                <span><b>Prioridade:</b> {dados.prioridade === 'urgente' ?
                    <span className="badge rounded-pill bg-danger">Urgente</span> :
                    "Normal"}</span>
            </div>
            <div className="col">
                <Typography><b>Valor Inicial:</b> R$ {dados.valor_inicial}</Typography>
                <Typography><b>Valor Final:</b> R$ {dados.valor_final}</Typography>
                <Typography><b>Prazo Inicial:</b> {dados.data_inicial}</Typography>
                <Typography><b>Prazo Final:</b> {dados.data_final}</Typography>
                <Typography><b>Sequência:</b> {dados.sequencia}</Typography>
                <Typography><b>Status do Pagamento:</b> {dados.status_pagamento}</Typography>
            </div>
        </div>
    )
}
