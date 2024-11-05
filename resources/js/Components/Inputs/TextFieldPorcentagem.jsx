import {InputAdornment, TextField} from "@mui/material";

export default function TextFieldPorcentagem({ label, value, setData, index, required }) {

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
            className="text-end"
            label={label} fullWidth required={required}
            InputProps={{endAdornment: <InputAdornment position="start">%</InputAdornment>}}
            value={value ?? ''}
            onChange={e => maskMoney(e.target.value)}/>
    );
}
