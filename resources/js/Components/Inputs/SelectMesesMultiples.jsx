import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from "@mui/material/MenuItem";

const nomesMeses = {
    1: 'Jan', 2: 'Fev', 3: 'Mar', 4: 'Abr', 5: 'Mai', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Set', 10: 'Out', 11: 'Nov', 12: 'Dez'
}

const selectMeses = [
    { id: '1', nome: 'Janeiro' },
    { id: '2', nome: 'Fevereiro' },
    { id: '3', nome: 'Março' },
    { id: '4', nome: 'Abril' },
    { id: '5', nome: 'Maio' },
    { id: '6', nome: 'Junho' },
    { id: '7', nome: 'Julho' },
    { id: '8', nome: 'Agosto' },
    { id: '9', nome: 'Setembro' },
    { id: '10', nome: 'Outubro' },
    { id: '11', nome: 'Novembro' },
    { id: '12', nome: 'Dezembro' },
]

export default function SelectMesesMultiples({value, useState, label}) {

    const handleChange = (event) => {
        const { target: { value } } = event;
        useState(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="select" label="Lang">
                {label ? label : 'Meses'}
            </InputLabel>
            <Select
                multiple
                value={value}
                onChange={handleChange}
                renderValue={(item) => {
                    item.sort();
                    return item.map((value) => (
                        <span key={value}>{nomesMeses[value]}, </span>
                    ))
                }}
            >
                {selectMeses.map(item =>
                    <MenuItem key={item.id} value={item.id}><Checkbox checked={value.indexOf(item.id) > -1} />{item.nome}</MenuItem>
                )}

            </Select>
        </FormControl>
    )
}