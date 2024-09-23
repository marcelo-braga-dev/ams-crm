import React from 'react';
import Switch from '@mui/material/Switch';
import { InputAdornment, TextField } from '@mui/material';
import { convertInputMoney } from '@/Components/Inputs/TextFieldMoney.jsx';
import MenuItem from '@mui/material/MenuItem';

const pagamentoDados = (pagamentos, chave, valor, i) => {
    return {
        ...pagamentos, [i]: {
            ...pagamentos[i],
            [chave]: valor,
        },
    };
};

const PagamentosEntrada = ({ setPagamentos, pagamentos, qtdPagamentos, bancos }) => {
    let camposValores = [];
    const camposPagamentos = () => {
        for (let i = 0; i < qtdPagamentos; i++)
            camposValores.push(
                <tr key={i}>
                    <td className="text-center" style={{ width: '5rem' }}>
                        <Switch size="small"
                                onChange={e => setPagamentos(pagamentoDados(pagamentos, 'status', e.target.checked, i))} />
                    </td>
                    <td style={{ width: '10rem' }}>
                        <TextField fullWidth label={`Valor da ${i + 1}° Parcela`}
                                   style={{ width: '10rem' }}
                                   InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                                   onChange={e => setPagamentos(pagamentoDados(pagamentos, 'valor', convertInputMoney(e), i))} />
                    </td>
                    <td style={{ width: '10rem' }}>
                        <TextField
                            type="date" label="Data Vencimento" fullWidth InputLabelProps={{ shrink: true }} required
                            onChange={e => setPagamentos(pagamentoDados(pagamentos, 'data', e.target.value, i))}
                        />
                    </td>
                    <td style={{ width: '10rem' }}>
                        {pagamentos?.[i]?.status &&
                            <TextField fullWidth label={`Valor Baixa`}
                                       style={{ width: '10rem' }} required
                                       InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
                                       onChange={e => setPagamentos(pagamentoDados(pagamentos, 'valor_baixa', convertInputMoney(e), i))} />}
                    </td>
                    <td>
                        {pagamentos?.[i]?.status &&
                            <TextField
                                type="date" label="Data Baixa" fullWidth InputLabelProps={{ shrink: true }} required
                                onChange={e => setPagamentos(pagamentoDados(pagamentos, 'data_baixa', e.target.value, i))}
                            />
                        }
                    </td>
                    <td style={{ width: '10rem' }}>
                        {pagamentos?.[i]?.status &&
                            <TextField label="Forma Pagamento" fullWidth required select style={{ width: '10rem' }}
                                       onChange={e => setPagamentos(pagamentoDados(pagamentos, 'forma_pagamento', e.target.value, i))}>
                                <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                                <MenuItem value="PIX">PIX</MenuItem>
                                <MenuItem value="Boleto">Boleto</MenuItem>
                                <MenuItem value="Cheque">Cheque</MenuItem>
                            </TextField>}
                    </td>
                    <td style={{ width: '10rem' }}>
                        {pagamentos?.[i]?.status &&
                            <TextField select required label="Banco" fullWidth style={{ width: '10rem' }}
                                       onChange={e => setPagamentos(pagamentoDados(pagamentos, 'banco', e.target.value, i))}>
                                {bancos.map(item => <MenuItem key={item.id} value={item.id}>{item.valor}</MenuItem>)}
                            </TextField>}
                    </td>
                    <td>
                        {pagamentos?.[i]?.status &&
                            <TextField
                                sx={{ width: '10rem' }}
                                type="file" InputLabelProps={{ shrink: true }} label="Comprovante Pagamento"
                                onChange={e => setPagamentos(pagamentoDados(pagamentos, 'anexo', e.target.files[0], i))}
                            />
                        }
                    </td>
                </tr>,
            );
        return camposValores;
    };

    return (
        <table className="table-1">
            {/*<thead>*/}
            {/*<tr>*/}
            {/*    <th style={{width: 50}} className="text-center">Pago</th>*/}
            {/*    <th style={{width: 250}}>Valor</th>*/}
            {/*    <th style={{width: 250}}>Data Recebimento</th>*/}
            {/*    <th style={{width: 250}}>Forma Pagamento</th>*/}
            {/*    <th style={{width: 250}}>Banco</th>*/}
            {/*</tr>*/}
            {/*</thead>*/}
            <tbody>
            {camposPagamentos()}
            </tbody>
        </table>
    );
};

export default PagamentosEntrada;
