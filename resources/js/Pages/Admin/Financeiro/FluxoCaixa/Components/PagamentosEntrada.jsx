import React from "react";
import Switch from "@mui/material/Switch";
import {InputAdornment, TextField} from "@mui/material";
import {convertInputMoney} from "@/Components/Inputs/TextFieldMoney.jsx";
import MenuItem from "@mui/material/MenuItem";

const pagamentoDados = (pagamentos, chave, valor, i) => {
    return {
        ...pagamentos, [i]: {
            ...pagamentos[i],
            [chave]: valor
        }
    }
}

const PagamentosEntrada = ({setPagamentos, pagamentos, qtdPagamentos, bancos}) => {
    let camposValores = []
    const camposPagamentos = () => {
        for (let i = 0; i < qtdPagamentos; i++)
            camposValores.push(
                <tr key={i}>
                    <td className="text-center">
                        <Switch size="small"
                                onChange={e => setPagamentos(pagamentoDados(pagamentos, 'status', e.target.checked, i))}/>
                    </td>
                    <td>
                        <TextField fullWidth label={`Valor da ${i + 1}° Parcela`}
                                   InputProps={{startAdornment: <InputAdornment position="start">R$</InputAdornment>}}
                                   onChange={e => setPagamentos(pagamentoDados(pagamentos, 'valor', convertInputMoney(e), i))}/>
                    </td>
                    <td>
                        <TextField
                            type="date" label="Data Recebimento" fullWidth InputLabelProps={{shrink: true}} required
                            onChange={e => setPagamentos(pagamentoDados(pagamentos, 'data', e.target.value, i))}
                        />
                    </td>
                    <td>
                        {pagamentos?.[i]?.status &&
                            <TextField label="Forma Pagamento" fullWidth required select
                                       onChange={e => setPagamentos(pagamentoDados(pagamentos, 'forma_pagamento', e.target.value, i))}>
                                <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                                <MenuItem value="PIX">PIX</MenuItem>
                                <MenuItem value="Boleto">Boleto</MenuItem>
                                <MenuItem value="Cheque">Cheque</MenuItem>
                            </TextField>}
                    </td>
                    <td>
                        {pagamentos?.[i]?.status &&
                            <TextField select required label="Banco" fullWidth
                                       onChange={e => setPagamentos(pagamentoDados(pagamentos, 'banco', e.target.value, i))}>
                                {bancos.map(item => <MenuItem key={item.id} value={item.id}>{item.valor}</MenuItem>)}
                            </TextField>}
                    </td>
                </tr>
            )
        return camposValores
    }

    return (
        <table className="table-1">
            <thead>
            <tr>
                <th style={{width: 50}} className="text-center">Pago</th>
                <th style={{width: 250}}>Valor</th>
                <th style={{width: 250}}>Data Recebimento</th>
                <th style={{width: 250}}>Forma Pagamento</th>
                <th style={{width: 250}}>Banco</th>
            </tr>
            </thead>
            <thead>
            {camposPagamentos()}
            </thead>
        </table>
    )
}

export default PagamentosEntrada
