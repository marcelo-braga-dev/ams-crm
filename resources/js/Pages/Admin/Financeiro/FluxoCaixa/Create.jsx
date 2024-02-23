import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {FormControl, Radio, RadioGroup, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, {useState} from "react";
import TextFieldMoney, {TextFieldMoney2} from "@/Components/Inputs/TextFieldMoney";
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from "@inertiajs/react";
import ClearIcon from "@mui/icons-material/Clear";

export default function ({dados}) {

    const [tipo, setTipo] = useState()
    const {data, setData} = useForm({
        qtd_pagamentos: 1
    })

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.financeiro.fluxo-caixa.store'), {...data, tipo: tipo})
    }

    let camposValores = []

    function qtdPagamentos() {

        for (let i = 1; i <= data.qtd_pagamentos; i++)
            camposValores.push(
                <div key={i} className="row align-items-center">
                    <div className="col-3 mb-4">
                        <TextFieldMoney2 fullWidth label={"Valor " + i + "° Pagaemnto"} data={data} setData={setData} i={i} required/>
                    </div>
                    {tipo === 'saida' &&
                        <div className="col-3 mb-4">
                            <TextField type="date" label="Data Vencimento" fullWidth
                                       InputLabelProps={{shrink: true}} required
                                       onChange={e => setData('camposPagamentos', {
                                           ...data.camposPagamentos,
                                           [i]: {
                                               ...data?.camposPagamentos?.[i],
                                               data_vencimento: e.target.value
                                           }
                                       })}/>

                        </div>
                    }
                </div>
            )

        return camposValores
    }

    return (
        <Layout titlePage="Inserir Informações" menu="financeiro" submenu="fluxo-caixa"
                voltar={route('admin.financeiro.fluxo-caixa.index')}>
            <div className="row">
                <div className="col">
                    Tipo de Entrada<br/>
                    <FormControl>
                        <RadioGroup
                            row aria-labelledby="pessoa"
                            name="row-radio-buttons-group" onChange={e => setTipo(e.target.value)}>
                            <FormControlLabel value="entrada" control={<Radio/>} label="Entrada"/>
                            <FormControlLabel value="saida" control={<Radio/>} label="Saída"/>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            {tipo &&
                <form onSubmit={submit}>
                    <div className="row">
                        <div className="col mb-4">
                            <TextField type="date" required
                                       onChange={e => setData('data', e.target.value)}/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-1 mb-4">
                            <TextField label="Qtd de Pagamentos" type="number" value={data.qtd_pagamentos} required fullWidth
                                       onChange={e => setData('qtd_pagamentos', e.target.value)}/>
                        </div>
                    </div>

                    {qtdPagamentos()}

                    <div className="row">
                        <div className="col mb-4">
                            <TextField select label="Empresa" fullWidth required
                                       onChange={e => setData('empresa', e.target.value)}>
                                {dados.empresas.map(item =>
                                    <MenuItem key={item.id} value={item.id}>{item.valor}</MenuItem>
                                )}
                            </TextField>
                        </div>
                        <div className="col mb-4">
                            <TextField select label="Fornecedores" fullWidth required
                                       onChange={e => setData('fornecedores', e.target.value)}>
                                {dados.fornecedores.map(item => <MenuItem key={item.id}
                                                                          value={item.id}>{item.valor}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col mb-4">
                            <TextField fullWidth label="N° NF"
                                       onChange={e => setData('nota_fiscal', e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        {tipo === 'entrada' && <div className="col mb-4">
                            <TextField type="date" fullWidth label="Previsão do Recebimento" required
                                       InputLabelProps={{shrink: true}}
                                       onChange={e => setData('previsao_recebimento', e.target.value)}/>
                        </div>}
                        {tipo === 'saida' && <div className="col mb-4">
                            <TextFieldMoney fullWidth label="Valor Baixa" index="valor_baixa"
                                            value={data.valor_baixa}
                                            setData={setData}/>
                        </div>}
                        {tipo === 'saida' && <div className="col mb-4">
                            <TextField fullWidth type="date" label="Data Baixa" InputLabelProps={{shrink: true}}
                                       onChange={e => setData('data_baixa', e.target.value)}/>
                        </div>}
                        <div className="col mb-4">
                            <TextField select label="Banco" fullWidth
                                       onChange={e => setData('banco', e.target.value)}>
                                {dados.bancos.map(item => <MenuItem key={item.id}
                                                                    value={item.id}>{item.valor}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col mb-4">
                            <TextField select label="Status" fullWidth required
                                       onChange={e => setData('status', e.target.value)}>
                                <MenuItem value="aberto">Aberto</MenuItem>
                                <MenuItem value="pago">Pago</MenuItem>
                            </TextField>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col mb-4">
                            <TextField label="Descrição" multiline rows="3" fullWidth required
                                       onChange={e => setData('descricao', e.target.value)}/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <button className="btn btn-primary">Salvar</button>
                        </div>
                    </div>
                </form>


            }
        </Layout>
    )
}
