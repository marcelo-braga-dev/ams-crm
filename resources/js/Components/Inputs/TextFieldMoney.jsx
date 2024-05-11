import {InputAdornment, TextField} from "@mui/material";

export default function TextFieldMoney({label, value, setData, index, required}) {

    //if (required) required=true
    function maskMoney(valor) {
        let value = valor.replace('.', '').replace(',', '').replace(/\D/g, '')
        const options = {minimumFractionDigits: 2}
        const result = new Intl.NumberFormat('pt-BR', options).format(
            parseFloat(value) / 100
        )
        setData(index, result)
    }

    return (
        <TextField
            label={label} fullWidth required={required} value={value ?? ''}
            InputProps={{startAdornment: <InputAdornment position="start">R$</InputAdornment>}}
            onChange={e => maskMoney(e.target.value)}/>
    );
}

export function TextFieldMoney2({label, value, chave, indice, setData, required, data, i}) {

    function maskMoney(valor) {
        let value = valor.replace('.', '').replace(',', '').replace(/\D/g, '')
        const options = {minimumFractionDigits: 2}
        return new Intl.NumberFormat('pt-BR', options).format(
            parseFloat(value) / 100
        )
    }

    return (
        <TextField
            label={label} fullWidth required={required}
            value={value}
            InputProps={{startAdornment: <InputAdornment position="start">R$</InputAdornment>}}
            onChange={e => setData(chave, {
                ...data?.[chave],
                [i]: {
                    ...data?.[chave]?.[i],
                    [indice]: maskMoney(e.target.value)
                }
            })}/>
    );
}
