import Layout from '@/Layouts/Layout';
import {router} from '@inertiajs/react'
import * as React from 'react';

import {useForm} from '@inertiajs/react';
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import {Radio, RadioGroup, Stack, TextField, Typography} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import FormControl from '@mui/material/FormControl';
import {useState} from "react";

import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import DadosProdutosCompleta from "@/Components/Pedidos/DadosProdutosCompleta.jsx";
import CardTable from "@/Components/Cards/CardTable.jsx";
import {Box} from "react-bootstrap-icons";
import Switch from "@mui/material/Switch";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney3.jsx";
import MenuItem from "@mui/material/MenuItem";

export default function Pedidos({dados, produtos, transportadoras}) {

    const [frete, setFrete] = useState(false)

    const qtdParcelas = parseInt(dados.financeiro.forma_pagamento.replace(/[^0-9]/g, ''))
    const {data, put, setData} = useForm({
        consultor: dados.consultor.id
    })
    const [qtsBoletos, setQtdBoletos] = useState(qtdParcelas)
    const [formaPagamento, setFormaPagamento] = useState('')

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.modelo-2.pedidos.lancado.update', dados.pedido.id), {
            _method: 'put',
            ...data, frete
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
        <Layout container voltar={route('admin.pedidos.index', {id_card: dados.pedido.id})} titlePage="Pedido Lançado"
                menu="pedidos" submenu="pedidos-lista">

            <div className="row">
                <div className="col">
                    <CardContainer>
                        <CardBody>
                            <DadosPedido dados={dados}/>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col">
                    <CardContainer>
                        <CardBody>
                            <DadosPedidoCliente dados={dados}/>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>

            <DadosProdutosCompleta dados={produtos} isFinanceiro={dados.financeiro.is_financeiro}/>

            <form onSubmit={submit}>

                <CardContainer>
                    <CardBody>
                        <DadosPedidoFinanceiro dados={dados}/>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <Stack direction="row" alignItems="center" marginBottom={2}>
                            <Switch checked={frete} onChange={e => setFrete(e.target.checked)}/>
                            <Typography>Incluir Frete</Typography>
                        </Stack>
                        {frete && <div className="row">
                            <div className="col-md-3">
                                <TextFieldMoney label="Valor do Frete" set={setData} index="frete_valor"/>
                            </div>
                            <div className="col-md-3">
                                <TextField label="Transportadora" select fullWidth
                                           onChange={e => setData('frete_transportadora', e.target.value)}>
                                    {transportadoras.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                                </TextField>
                            </div>
                            <div className="col-md-3">
                                <TextField label="Código Rastreio" fullWidth onChange={e => setData('frete_rastreio', e.target.value)}/>

                            </div>
                        </div>}
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <FormControl>
                            <Typography fontWeight="bold">Método Pagamento</Typography>
                            <RadioGroup row name="row-radio-buttons-group">
                                <FormControlLabel value="vista" required control={<Radio/>} label="À Vista"
                                                  onChange={() => setData('forma_pagamento', 'vista')}/>
                                <FormControlLabel value="prazo" required control={<Radio/>} label="À Prazo"
                                                  onChange={() => setData('forma_pagamento', 'prazo')}/>
                            </RadioGroup>
                        </FormControl>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <div className="row">
                            <div className="col-md-6">
                                <TextField
                                    label="Nota Fiscal" required fullWidth type="file" InputLabelProps={{shrink: true}}
                                    onChange={e => setData('file_nota_fiscal', e.target.files[0])}>
                                </TextField>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <FormControl>
                            <Typography fontWeight="bold">Inserir Anexos</Typography>
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
                    </CardBody>
                </CardContainer>

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

            </form>
        </Layout>
    )
}
