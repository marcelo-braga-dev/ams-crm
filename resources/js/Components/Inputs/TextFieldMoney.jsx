import {InputAdornment, TextField} from "@mui/material";

export default function TextFieldMoney({ label, value, setData, index, required }) {

    //if (required) required=true
    function maskMoney(valor) {
        let value = valor.replace('.', '').replace(',', '').replace(/\D/g, '')
        const options = { minimumFractionDigits: 2 }
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
