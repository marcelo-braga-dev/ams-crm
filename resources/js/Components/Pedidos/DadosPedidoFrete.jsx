import {Stack, Typography} from "@mui/material";
import * as React from "react";

const DadosPedidoFrete = ({dados}) => {
    return (
        <Stack spacing={1}>
            <Typography><b>Valor:</b> {dados.frete.preco}</Typography>
            <Typography><b>Transportadora:</b> {dados.frete.transportadora_nome}</Typography>
            <Typography><b>Rastreio:</b> {dados.frete.rastreio}</Typography>
        </Stack>
    )
}

export default DadosPedidoFrete
