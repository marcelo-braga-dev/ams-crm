import {Stack} from "@mui/material";
import * as React from "react";
import CampoTexto from "@/Components/CampoTexto.jsx";

const DadosPedidoFrete = ({dados}) => {
    return (
        <Stack spacing={1}>
            <CampoTexto titulo="Valor" texto={dados.frete.preco}/>
            <CampoTexto titulo="Transportadora" texto={dados.frete.transportadora_nome}/>
            <CampoTexto titulo="Rastreio" texto={dados.frete.rastreio}/>
            <CampoTexto titulo="Previsão de Entrega" texto={dados.frete.rastreio_data}/>
        </Stack>
    )
}

export default DadosPedidoFrete
