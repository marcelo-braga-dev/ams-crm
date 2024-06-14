import React from 'react'
import {Typography} from "@mui/material";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import Chip from "@mui/material/Chip";

export default function CardChamados({dados}) {

    function url() {
        switch (dados.status) {
            case 'novo':
                return route('consultor.chamado.aberto.show', dados.id)
            case 'atendimento':
                return route('consultor.chamado.atendimento.show', dados.id)
            case 'finalizado':
                return route('consultor.chamado.finalizado.show', dados.id)
        }
    }

    return (
        <>
            <div className="row bg-white shadow p-1 py-2 m-1 mb-4 rounded">
                <div className="col-12 mb-2">
                    <Typography><b>{dados.titulo}</b></Typography>
                </div>
                <div className="col-12">
                    <Typography><b>Autor:</b> {dados.autor}</Typography>
                </div>
                <div className="col-12">
                    <Typography><b>ID do Pedido:</b> #{dados.pedido_id}</Typography>
                    <Typography><b>Status Pedido:</b> {dados.pedido_status}</Typography>
                    <Typography><b>Valor:</b> R$ {convertFloatToMoney(dados.valor)}</Typography>
                    {dados.fornecedor_nome && <Typography><b>Distribudora:</b> {dados.fornecedor_nome}</Typography>}
                </div>
                <div className="col-12">
                    <div className="row">
                        <div className="col">
                            <small className="">Data: {dados.data_cadastro}</small>
                        </div>
                        <div className="col-auto">
                            <small className="text-muted d-block">ID: #{dados.id}</small>
                        </div>
                    </div>
                </div>

                <div className="col-12">
                    <div className="row">
                        <div className="col">
                            {!!dados.avaria && <Chip label="AVARIA" size="small"/>}

                        </div>
                        <div className="col-auto">
                            <a href={url()} className="btn btn-primary btn-sm p-1 px-3">Abrir</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
