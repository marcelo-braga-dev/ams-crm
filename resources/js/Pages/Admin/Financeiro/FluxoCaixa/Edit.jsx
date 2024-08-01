import Layout from "@/Layouts/Layout";
import {TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import TextFieldMoney, {TextFieldMoney2} from "@/Components/Inputs/TextFieldMoney";
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from "@inertiajs/react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";

export default function ({flucoCaixa, dados}) {

    const [tipo, setTipo] = useState(flucoCaixa.tipo)

    const {data, setData} = useForm({
        qtd_pagamentos: flucoCaixa.total_pagamentos,
        campos_pagamentos: [],
        data: flucoCaixa._data,
        empresa: flucoCaixa._empresa,
        fornecedores: flucoCaixa.fornecedor_id,
        nota_fiscal: flucoCaixa.nota_fiscal,
        franquia: flucoCaixa.franquia_id,
        valor_baixa: flucoCaixa.valor_baixa,
        data_baixa: flucoCaixa.data_baixa,
        banco: flucoCaixa.banco_id,
        status: flucoCaixa.status,
        descricao: flucoCaixa.descricao,
    })

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.financeiro.fluxo-caixa.update', flucoCaixa.id), {...data, tipo: tipo, _method: 'PUT'})
    }

    router.on('success', () => {
        if (flucoCaixa.total_pagamentos !== data.qtd_pagamentos) window.location.reload()
    })

    useEffect(() => {
        let valores = []
        for (let i = 0; i < data.qtd_pagamentos; i++) {
            valores[i] = {
                id: flucoCaixa?.parcelas?.[i]?.id,
                valor: flucoCaixa?.parcelas?.[i]?.valor,
                // data_vencimento: flucoCaixa?.parcelas?.[i]?.data_vencimento,
                valor_baixa: flucoCaixa?.parcelas?.[i]?.valor_baixa,
                data_baixa: flucoCaixa?.parcelas?.[i]?.data_baixa,
                data_pagamento: flucoCaixa?.parcelas?.[i]?.previsao_recebimento,
            }
        }
        setData('campos_pagamentos', valores)
    }, []);

    let camposValores = []

    function qtdPagamentos() {

        for (let i = 0; i < data.qtd_pagamentos; i++)
            camposValores.push(
                <div key={i} className="row border-bottom mb-4">
                    <div className="col-auto pt-1">
                        {data?.campos_pagamentos?.[i]?.id &&
                            <small className="pt-5">ID: #{data?.campos_pagamentos?.[i]?.id}</small>}
                    </div>
                    <div className="col-3 mb-4">
                        <TextFieldMoney2 fullWidth label={"Valor " + (i + 1) + "° Pagamento"}
                                         value={data?.campos_pagamentos?.[i]?.valor ?? ''}
                                         indice="valor" chave="campos_pagamentos"
                                         data={data} setData={setData} i={i} required/>
                    </div>
                    {tipo === 'saida' &&
                        <div className="col-3 mb-4">
                            <TextField type="date" label="Data Vencimento" fullWidth
                                       InputLabelProps={{shrink: true}} required
                                       value={data?.campos_pagamentos?.[i]?.data_pagamento}
                                       onChange={e => setData('campos_pagamentos', {
                                           ...data.campos_pagamentos,
                                           [i]: {
                                               ...data?.campos_pagamentos?.[i],
                                               data_pagamento: e.target.value
                                           }
                                       })}/>

                        </div>
                    }
                    {tipo === 'saida' && <div className="col mb-4">
                        <TextFieldMoney2 label="Valor Baixa" fullWidth
                                         value={data?.campos_pagamentos?.[i]?.valor_baixa ?? ''}
                                         indice="valor_baixa" chave="campos_pagamentos"
                                         data={data} setData={setData} i={i}/>
                    </div>}
                    {tipo === 'saida' && <div className="col mb-4">
                        <TextField fullWidth type="date" label="Data Baixa" InputLabelProps={{shrink: true}}
                                   value={data?.campos_pagamentos?.[i]?.data_baixa}
                                   onChange={e => setData('campos_pagamentos', {
                                       ...data.campos_pagamentos,
                                       [i]: {
                                           ...data?.campos_pagamentos?.[i],
                                           data_baixa: e.target.value
                                       }
                                   })}/>
                    </div>}

                    {tipo === 'entrada' && <div className="col-md-3 mb-4">
                        <TextField type="date" label="Previsão do Recebimento" required fullWidth
                                   value={data?.campos_pagamentos?.[i]?.data_pagamento}
                                   InputLabelProps={{shrink: true}}
                                   onChange={e => setData('campos_pagamentos', {
                                       ...data.campos_pagamentos,
                                       [i]: {
                                           ...data?.campos_pagamentos?.[i],
                                           data_pagamento: e.target.value
                                       }
                                   })}/>
                    </div>}
                </div>
            )

        return camposValores
    }

    return (
        <Layout titlePage="Inserir Informações" menu="financeiro" submenu="fluxo-caixa"
                voltar={route('admin.financeiro.fluxo-caixa.show', flucoCaixa.id)}>

            <form onSubmit={submit}>
                <CardContainer>
                    <CardBody>
                        <div className="row">
                            <div className="col mb-4">
                                <TextField type="date" required value={data.data}
                                           onChange={e => setData('data', e.target.value)}/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-4">
                                <TextField select label="Empresa" fullWidth required
                                           value={data.empresa}
                                           onChange={e => setData('empresa', e.target.value)}>
                                    {dados.empresas.map(item =>
                                        <MenuItem key={item.id} value={item.id}>{item.valor}</MenuItem>
                                    )}
                                </TextField>
                            </div>
                            <div className="col mb-4">
                                <TextField select label="Franquia" fullWidth required
                                           value={data.franquia}
                                           onChange={e => setData('franquia', e.target.value)}>
                                    {dados.franquias.map(item =>
                                        <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
                                    )}
                                </TextField>
                            </div>
                            <div className="col mb-4">
                                <TextField select label="Fornecedores" fullWidth required value={data.fornecedores}
                                           onChange={e => setData('fornecedores', e.target.value)}>
                                    {dados.fornecedores.map(item => <MenuItem key={item.id}
                                                                              value={item.id}>{item.valor}</MenuItem>)}
                                </TextField>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col mb-4">
                                <TextField fullWidth label="N° NF" value={data.nota_fiscal}
                                           onChange={e => setData('nota_fiscal', e.target.value)}/>
                            </div>
                            <div className="col mb-4">
                                <TextField select label="Banco" fullWidth value={data.banco}
                                           onChange={e => setData('banco', e.target.value)}>
                                    {dados.bancos.map(item => <MenuItem key={item.id}
                                                                        value={item.id}>{item.valor}</MenuItem>)}
                                </TextField>
                            </div>
                            <div className="col mb-4">
                                <TextField select label="Status" fullWidth required value={data.status}
                                           onChange={e => setData('status', e.target.value)}>
                                    <MenuItem value="aberto">Aberto</MenuItem>
                                    <MenuItem value="pago">Pago</MenuItem>
                                </TextField>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <div className="row border-bottom mb-4">
                            <div className="col-md-2 mb-3">
                                <TextField label="Qtd de Pagamentos" type="number" value={data.qtd_pagamentos} required
                                           fullWidth
                                           onChange={e => setData('qtd_pagamentos', e.target.value)}/>
                            </div>
                        </div>

                        {qtdPagamentos()}
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <div className="row justify-content-center">
                            <div className="col mb-4">
                                <TextField label="Descrição" multiline rows="3" fullWidth required value={data.descricao}
                                           onChange={e => setData('descricao', e.target.value)}/>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>

                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-primary">Atualizar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
