import {InputAdornment, TextField} from "@mui/material";
import {useState} from "react";

export default function TextFieldMoney({label, set, defaultValue, required}) {

    function mascaraMoeda(valor, dig = 2) {
        let valorAlterado = valor.target.value;
        valorAlterado = valorAlterado.replace(/\D/g, "");

        valorAlterado = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: dig}).format(
            parseFloat(valorAlterado) / (10 ** dig)
        )

        valor.target.value = valorAlterado;
        set(valorAlterado)
        return valorAlterado;
    }

    return (
        <TextField
            label={label} fullWidth required={required} defaultValue={defaultValue}
            InputProps={{startAdornment: <InputAdornment position="start">R$</InputAdornment>}}
            onChange={e => mascaraMoeda(e)}
        />
    );
}
