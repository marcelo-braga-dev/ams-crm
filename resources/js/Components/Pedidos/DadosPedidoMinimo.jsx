import Typography from "@mui/material/Typography";
import {Stack} from "@mui/material";
import * as React from "react";
import CampoTexto from "@/Components/CampoTexto.jsx";

export default function DadosPedidoMinimo({dados}) {
    return (
        <Stack spacing={1}>
            {dados.pedido.id && <CampoTexto titulo="ID do Pedido" texto={`#${dados.pedido.id}`}/>}
            {dados.consultor.nome && <CampoTexto titulo="Consultor" texto={dados.consultor.nome}/>}
            {dados.integrador.nome && <CampoTexto titulo="Integrador" texto={dados.integrador.nome}/>}
            {dados.cliente.nome && <CampoTexto titulo="Nome do Cliente" texto={dados.cliente.nome}/>}
            {dados.pedido.status && <CampoTexto titulo="Status do Pedido" texto={dados.pedido.status}/>}
        </Stack>
    )
}
