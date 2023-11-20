import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import {router} from '@inertiajs/react'
import * as React from 'react';

import {useForm} from '@inertiajs/react';
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import {Radio, RadioGroup, TextField} from "@mui/material";
import DadosProdutos from "@/Components/Pedidos/DadosProdutos";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormControl from '@mui/material/FormControl';
import {useState} from "react";

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro";

export default function Pedidos({dados, produtos}) {

    const qtdParcelas = parseInt(dados.financeiro.forma_pagamento.replace(/[^0-9]/g, ''))

    const {data, put, setData} = useForm()
    const [qtsBoletos, setQtdBoletos] = useState(qtdParcelas)
    const [formaPagamento, setFormaPagamento] = useState('')

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.modelo-2.pedidos.lancado.update', dados.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    let camposBoletos = []

    function boletos() {
        for (let i = 1; i <= qtsBoletos; i++)
            camposBoletos.push(
                <div key={i} className="row align-items-center">
                    <div className="col-6 mb-4">
                        <TextField
                            label={i + "° Boleto"} fullWidth type="file" InputLabelProps={{shrink: true}} required
                            onChange={e => setData('file_boletos', {
                                ...data.file_boletos,
                                [i]: {
                                    ...data?.file_boletos?.[i],
                                    file: e.target.files[0]
                                }
                            })}>
                        </TextField>
                    </div>
                    <div className="col mb-4">
                        <TextField type="date" label="Data Vencimento" fullWidth
                                   InputLabelProps={{shrink: true}} required
                                   onChange={e => setData('file_boletos', {
                                       ...data.file_boletos,
                                       [i]: {
                                           ...data?.file_boletos?.[i],
                                           vencimento: e.target.value
                                       }
                                   })}/>

                    </div>
                    <div className="col mb-4">
                        {(i === qtsBoletos && qtsBoletos > 1) &&
                            <ClearIcon className="text-danger cursor-pointer"
                                       onClick={() => removeBoleto()}/>
                        }
                    </div>
                </div>
            )

        return camposBoletos
    }

    function removeBoleto() {
        setQtdBoletos(qtsBoletos - 1)
        data.file_boletos[qtsBoletos] = {}
    }

    return (
        <Layout container voltar={route('admin.pedidos.index')} titlePage="Pedido Lançado"
                menu="pedidos" submenu="lista">

            <div className="row mb-4 shadow p-2">
                <div className="col">
                    <DadosPedido dados={dados}/>
                </div>
                <div className="col">
                    <DadosPedidoCliente dados={dados}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <DadosProdutos dados={produtos}/>
                </div>
            </div>

            <form onSubmit={submit}>
                <div className="row shadow p-2">
                    <div className="row mb-4">
                        <DadosPedidoFinanceiro dados={dados}/>
                    </div>

                    <div className="row">
                        <div className="col mb-4">
                            <FormControl>
                                <h6>Método Pagamento</h6>
                                <RadioGroup row name="row-radio-buttons-group">
                                    <FormControlLabel value="vista" required control={<Radio/>} label="À Vista"
                                                      onChange={() => setData('forma_pagamento', 'vista')}/>
                                    <FormControlLabel value="prazo" required control={<Radio/>} label="À Prazo"
                                                      onChange={() => setData('forma_pagamento', 'prazo')}/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    <h6>Nota Fiscal</h6>
                    <div className="row mt-2 mb-4">
                        <div className="col-md-6 mb-4">
                            <TextField
                                label="Nota Fiscal" required fullWidth type="file" InputLabelProps={{shrink: true}}
                                onChange={e => setData('file_nota_fiscal', e.target.files[0])}>
                            </TextField>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col mb-4">
                            <FormControl>
                                <h6>Inserir Anexos</h6>
                                <RadioGroup row name="forma-pagamento">
                                    <FormControlLabel value="vista" control={<Radio/>} label="Boletos" required
                                                      onChange={() => setFormaPagamento('boleto')}/>
                                    <FormControlLabel value="prazo" label="Link de Pagamento"
                                                      required control={<Radio/>}
                                                      onChange={() => setFormaPagamento('link')}/>
                                    <FormControlLabel value="" control={<Radio/>} label="Nenhum" required
                                                      onChange={() => setFormaPagamento('')}/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>

                    {formaPagamento === 'boleto' && <>
                        <h6>Boletos</h6>
                        {boletos()}
                        <div className="row row-cols-3 mb-4">
                            <div className="col">
                                <button type="button" className="btn btn-success btn-sm btn-rounded px-3"
                                        onClick={() => setQtdBoletos(qtsBoletos + 1)}>
                                    <AddIcon/> Adicionar campo
                                </button>
                            </div>
                        </div>
                    </>}

                    {formaPagamento === 'link' && <>
                        <h6>Link de Pagamento</h6>
                        <div className="row mb-4">
                            <div className="col mb-">
                                <TextField
                                    label="Link de Pagamento" fullWidth required
                                    onChange={e => setData('url_pagamento', e.target.value)}>
                                </TextField>
                            </div>
                        </div>
                    </>}
                    <div className="row text-center">
                        <div className="mb-3">
                            <button className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
