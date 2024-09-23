import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import convertFloatToMoney from "@/Helpers/converterDataHorario.jsx";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext, useEffect, useState } from 'react';
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";
import {convertInputMoney} from "@/Components/Inputs/TextFieldMoney.jsx";
import { ContextFluxoCaixa } from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/ContextFluxoCaixa.jsx';

const PagarSaida = ({pagamento, variaveis, setData, submit}) => {

    return (
        <form onSubmit={submit}>
            <table className="table-1">
                <thead>
                <tr>
                    <th style={{width: 250}}>Valor</th>
                    <th style={{width: 250}}>Data Vencimento</th>
                    <th style={{width: 250}}>Valor Baixa</th>
                    <th style={{width: 250}}>Forma Pagamento</th>
                    <th style={{width: 250}}>Banco</th>
                    <th style={{width: 250}}>Data Baixa</th>
                    <th>Comprovante</th>
                    <th></th>
                </tr>
                </thead>
                <thead>
                <tr>
                    <td>
                        <Typography>R$ {convertFloatToMoney(pagamento.valor)}</Typography>
                    </td>
                    <td>
                        <Typography>{pagamento.data}</Typography>
                    </td>
                    <td>
                        <TextField
                            fullWidth label="Valor Baixa"
                            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                            onChange={e => setData('valor_baixa', convertInputMoney(e))} />
                    </td>
                    <td>
                        <TextField
                            label="Forma Pagamento" fullWidth required select
                            onChange={e => setData('forma_pagamento', e.target.value)}>
                            {variaveis?.formas_pagamento?.map(item => <MenuItem value={item}>{item}</MenuItem>)}
                        </TextField>
                    </td>
                    <td>
                        <TextField
                            select required label="Banco" fullWidth
                            onChange={e => setData('banco_id', e.target.value)}>
                            {variaveis?.bancos?.map(item => <MenuItem key={item.id} value={item.id}>{item.valor}</MenuItem>)}
                        </TextField>
                    </td>
                    <td>
                        <TextField
                            type="date" label="Data Baixa" fullWidth InputLabelProps={{ shrink: true }} required
                            onChange={e => setData('data_baixa', e.target.value)} />
                    </td>
                    <td>
                        <TextField
                            sx={{ width: '10rem' }}
                            type="file"
                            onChange={e => setData('anexo', e.target.files[0])} />
                    </td>
                    <td>
                        <Button color="success" type="submit">Salvar</Button>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    )
}
export default PagarSaida
