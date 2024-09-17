import React, {useEffect, useState} from "react";
import {TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import convertFloatToMoney from "@/Helpers/converterDataHorario.jsx";
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";

const PagarEntrada = ({dadosPagamento}) => {

    const {data, setData} = useForm({
        'pagamento_id': dadosPagamento.id
    })

    const [opcoes, setOpcoes] = useState()

    useEffect(() => {
        axios.get(route('admin.financeiro.opcoes'))
            .then(res => setOpcoes(res.data))
    }, []);

    const submit = (e) => {
        e.preventDefault()
        router.post(route('admin.financeiro.fluxo-caixa.atualizar-pagamento'), {...data})
    }

    return (
        <form onSubmit={submit}>
            <table className="table-1">
                <thead>
                <tr>
                    <th style={{width: 250}}>Valor</th>
                    <th style={{width: 250}}>Data Pagamento</th>
                    <th style={{width: 250}}>Data Recebimento</th>
                    <th style={{width: 250}}>Forma Pagamento</th>
                    <th style={{width: 250}}>Banco</th>
                    <th></th>
                </tr>
                </thead>
                <thead>
                <tr>
                    <td>
                        <Typography>R$ {convertFloatToMoney(dadosPagamento.valor)}</Typography>
                    </td>
                    <td>
                        <Typography>{dadosPagamento.data}</Typography>
                    </td>
                    <td>
                        <TextField
                            type="date" label="Data Recebimento" fullWidth InputLabelProps={{shrink: true}} required
                            onChange={e => setData('data_baixa', e.target.value)}/>
                    </td>
                    <td>
                        <TextField
                            label="Forma Pagamento" fullWidth required select
                            onChange={e => setData('forma_pagamento', e.target.value)}>
                            {opcoes?.formasPagamento?.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                        </TextField>
                    </td>
                    <td>
                        <TextField
                            select required label="Banco" fullWidth
                            onChange={e => setData('banco', e.target.value)}>
                            {opcoes?.bancos?.map(item => <MenuItem key={item.id} value={item.id}>{item.valor}</MenuItem>)}
                        </TextField>
                    </td>
                    <td>
                        <button type="submit" className="btn btn-success mt-2">Salvar</button>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    )
}
export default PagarEntrada
