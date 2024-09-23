import React, { useEffect, useState } from 'react';
import { Button, InputAdornment, TextField, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import convertFloatToMoney from '@/Helpers/converterDataHorario.jsx';
import { useForm } from '@inertiajs/inertia-react';
import { router } from '@inertiajs/react';
import { convertInputMoney } from '@/Components/Inputs/TextFieldMoney.jsx';

const PagarEntrada = ({ pagamento, variaveis, setData, submit }) => {

    return (
        <form onSubmit={submit}>
            <table className="table-1">
                <thead>
                <tr>
                    <th>Valor</th>
                    <th>Data Vencimento</th>
                    <th>Valor Baixa</th>
                    <th>Data Recebimento</th>
                    <th>Forma Pagamento</th>
                    <th>Banco</th>
                    <th>Comprovante</th>
                    <th></th>
                </tr>
                </thead>
                <thead>
                <tr>
                    <td>
                        <Typography noWrap>R$ {convertFloatToMoney(pagamento.valor)}</Typography>
                    </td>
                    <td>
                        <Typography>{pagamento.data}</Typography>
                    </td>
                    <td>
                        <TextField fullWidth label="Valor Baixa" required
                                   InputProps={{startAdornment: <InputAdornment position="start">R$</InputAdornment>}}
                                   onChange={e => setData('valor_baixa', convertInputMoney(e))}/>
                    </td>
                    <td>
                        <TextField
                            type="date" label="Data Recebimento" fullWidth InputLabelProps={{ shrink: true }} required
                            onChange={e => setData('data_baixa', e.target.value)} />
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
                            select required label="Banco" fullWidth sx={{ width: '10rem' }}
                            onChange={e => setData('banco_id', e.target.value)}>
                            {variaveis?.bancos?.map(item => <MenuItem key={item.id} value={item.id}>{item.valor}</MenuItem>)}
                        </TextField>
                    </td>
                    <td>
                        <TextField
                            sx={{ width: '10rem' }}
                            type="file"
                            onChange={e => setData('anexo', e.target.files[0])}/>
                    </td>
                    <td>
                        <Button color="success" type="submit">Salvar</Button>
                    </td>
                </tr>
                </thead>
            </table>
        </form>
    );
};
export default PagarEntrada;
