import {Col, Row} from "reactstrap";
import {TextField, MenuItem, InputAdornment} from "@mui/material";
import Box from "@mui/material/Box";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import React from "react";

let total = 0;

export default function Pedido({fornecedores, buscarProdutos, produtos, data, setData}) {
    total = 0

    function qtdCheque(qtd) {
        setData('forma_pagamento', qtd + 'x Cheques')
    }

    function qtdCredito(qtd) {
        setData('forma_pagamento', 'Cartão Crédito em ' + qtd + 'x')
    }

    function qtdBoletos(qtd) {
        setData('forma_pagamento', 'Boleto em ' + qtd + 'x')
    }

    return <Box>

        <div className="row mb-4">
            <div className="col-md-4">
                <TextField label="Forma de Pagamento" select fullWidth required defaultValue=""
                           onChange={e => setData('forma_pagamento', e.target.value)}>
                    <MenuItem value="À Vista">À Vista</MenuItem>
                    <MenuItem value="Boleto">Boleto</MenuItem>
                    <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
                    <MenuItem value="Cartão de Débito">Cartão de Débito</MenuItem>
                    <MenuItem value="Dinheiro">Dinheiro</MenuItem>
                    <MenuItem value="Cheque">Cheque</MenuItem>
                    <MenuItem value="Bonificação">Bonificação</MenuItem>
                </TextField>
            </div>
            <div className="col-2">
                {data.forma_pagamento?.includes('Crédito') &&
                    <TextField
                        required type="number" label="Qtd. de Parcelas"
                        onChange={e => qtdCredito(e.target.value)}/>}
                {data.forma_pagamento?.includes('Boleto') &&
                    <TextField
                        required type="number" label="Qtd. de Parcelas"
                        onChange={e => qtdBoletos(e.target.value)}/>}
                {data.forma_pagamento?.includes('Cheque') &&
                    <TextField
                        required type="number" label="Qtd. de Cheques"
                        onChange={e => qtdCheque(e.target.value)}/>}
            </div>
            <div className="col">
                {data.forma_pagamento?.includes('Cheque') &&
                    <TextField
                        required type="file" label="Foto dos Cheque" InputLabelProps={{shrink: true}}
                        onChange={e => setData('file_cheque', e.target.files[0])}/>}
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-md-5 mb-3">
                <TextField label="Fornecedor" select fullWidth required defaultValue=""
                           onChange={e => buscarProdutos(e.target.value)}
                >
                    {fornecedores.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                            {option.nome}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="col-md-6">
                <TextField
                    label="Imagem da Lista de Pedido" required
                    fullWidth type="file" InputLabelProps={{shrink: true}}
                    onChange={e => setData('img_pedido', e.target.files[0])}>
                </TextField>
            </div>
        </div>
        {produtos.length ? <div className="row mb-4">
            <table className="table table-sm text-sm">
                <thead>
                <tr>
                    <td></td>
                    <td>Nome</td>
                    <td>Preço</td>
                    <td className="text-center">Qtd.</td>
                    <td className="col-1 text-center">Und.</td>
                    <td>Desconto</td>
                    <td>Total</td>
                </tr>
                </thead>
                <tbody>
                {produtos.map((dados, index) => {
                    total += dados.preco_venda_float
                        * ((data?.produtos?.['i' + dados.id]?.qtd) ?? 0)
                        * (1 - ((data?.produtos?.['i' + dados.id]?.desconto ?? 0) / 100))

                    data.preco = total
                    return (
                        <tr key={index}
                            className={(data?.produtos?.['i' + dados.id]?.qtd) > 0 ? "bg-light font-weight-bold" : ''}>
                            <td className="col-1 text-center pe-3">
                                {dados.foto && <img className="rounded" src={dados.foto} width="70" alt="foto"/>}
                            </td>
                            <td className="text-wrap">
                                <b>{dados.nome}</b>
                                <small className="d-block">ID: #{dados.id}</small>
                            </td>
                            <td className="col-1">R$ {dados.preco_venda}</td>
                            <td className="col-1">
                                <TextField type="number" size="small" style={{width: '5rem'}}
                                           onChange={e => setData('produtos', {
                                               ...data.produtos,
                                               ['i' + dados.id]: {
                                                   ...data?.produtos?.['i' + dados.id],
                                                   id: dados.id,
                                                   nome: dados.nome,
                                                   preco_fornecedor_float: dados.preco_fornecedor_float,
                                                   preco_venda_float: dados.preco_venda_float,
                                                   qtd: parseInt(e.target.value),
                                                   und: dados.unidade,
                                                   foto: dados.foto,
                                               },
                                           })}
                                />
                            </td>
                            <td className="col-1 text-center">{dados.unidade}</td>
                            <td className="col-2">
                                <TextField type="number" size="small" style={{width: '7rem'}} fullWidth
                                           InputProps={{
                                               endAdornment: <InputAdornment className="p-0 m-0"
                                                                             position="end">%</InputAdornment>,
                                           }}
                                           inputProps={{
                                               maxLength: 13,
                                               step: "0.01",
                                               endAdornment: <InputAdornment className="p-0 m-0"
                                                                             position="end">%</InputAdornment>,
                                           }}
                                           onChange={e => setData('produtos', {
                                               ...data.produtos,
                                               ['i' + dados.id]: {
                                                   ...data?.produtos?.['i' + dados.id],
                                                   id: dados.id,
                                                   desconto: parseFloat(e.target.value)
                                               }
                                           })}
                                />
                            </td>
                            <td className="col-2">{console.log(data?.produtos['i' + dados.id]?.desconto ?? 0)}
                                R$ {convertFloatToMoney(dados.preco_venda_float *
                                    (data?.produtos && data?.produtos['i' + dados.id]?.qtd) *
                                    (data?.produtos && 1 - ((data?.produtos['i' + dados.id]?.desconto ?? 0) / 100)))}
                            </td>
                        </tr>
                    )
                })}
                <tr>
                    <td colSpan="5"></td>
                    <td><h5>TOTAL</h5></td>
                    <td>
                        <h5>R$ {convertFloatToMoney(total)}</h5>
                    </td>
                </tr>
                </tbody>
            </table>
        </div> : ''}

        <Row className="mb-3 mt-4">
            <Col className="mb-3" lg="12">
                <TextField
                    label="Anotações" multiline rows="4" fullWidth
                    value={data.obs} onChange={e => setData('obs', e.target.value)}/>
            </Col>
        </Row>
    </Box>
}
