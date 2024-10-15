import React from 'react'
import {Stack, Typography} from "@mui/material";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import Chip from "@mui/material/Chip";
import Link from "@/Components/Link.jsx";

export default function CardChamados({dados}) {

    function url() {
        switch (dados.status) {
            case 'novo':
                return route('admin.chamado.aberto.show', dados.id)
            case 'atendimento':
                return route('admin.chamado.atendimento.show', dados.id)
            case 'finalizado':
                return route('admin.chamado.finalizado.show', dados.id)
        }
    }

    return (
        <div className="row bg-white shadow p-1 py-2 m-1 mb-4 rounded">

            <Stack spacing={1}>
                {!!dados.avaria && <Chip label="AVARIA" size="small" color="warning"/>}
                <Typography variant="body2"><b>Cliente:</b> {dados.cliente_nome}</Typography>
                <Typography variant="body2"><b>Autor:</b> {dados.autor}</Typography>
                <Typography variant="body2"><b>Integrador:</b> {dados.lead_nome}</Typography>
                <Typography variant="body2"><b>ID do Pedido:</b> #{dados.pedido_id}</Typography>
                <Typography variant="body2"><b>Status Pedido:</b> {dados.pedido_status}</Typography>
                <Typography variant="body2"><b>Valor:</b> R$ {convertFloatToMoney(dados.valor)}</Typography>
                {dados.fornecedor_nome && <Typography variant="body2"><b>Distribudora:</b> {dados.fornecedor_nome}</Typography>}
            </Stack>
            <div className="col-12">
                <div className="row">
                    <div className="col">
                        <Typography variant="body2">Data: {dados.data_cadastro}</Typography>
                    </div>
                    <div className="col-auto">
                        <Typography variant="body2">ID: #{dados.id}</Typography>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="row mt-3">
                    <div className="col">

                    </div>
                    <div className="col-auto">
                        <Link label="Abrir" href={url()}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
