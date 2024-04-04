import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import * as React from 'react';
import {InputAdornment, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import Switch from "@mui/material/Switch";
import {router, useForm} from "@inertiajs/react";

export default function ({dados, usuario, userId, ano, mes}) {
    const [mesSelecionado, setMesSelecionado] = useState(mes)

    const [idEditar, setIdEditar] = useState()
    const [campoEditar, setCampoEditar] = useState()

    const {data, setData, reset} = useForm()

    const submit = (mes, campo) => {
        setIdEditar(undefined)
        router.post(route('admin.financeiro.salarios.store', {
            ...data?.[mes],
            campo: campo,
            mes: mes,
            ano: ano,
            user_id: userId,
        }), {}, {preserveScroll: true})
    }

    router.on('success', () => setData({}))

    function setPeriodoAno(ano) {
        router.get(route('admin.financeiro.salarios.edit', userId), {ano: ano})
    }

    function mascaraMoeda(valor) {
        let valorAlterado = valor.target.value;
        valorAlterado = valorAlterado.replace(/\D/g, "");

        valorAlterado = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(
            parseFloat(valorAlterado) / 100
        )

        valor.target.value = valorAlterado;
        return valorAlterado;
    }

    const meses = [
        {mes: 1, nome: 'Janeiro'},
        {mes: 2, nome: 'Fevereiro'},
        {mes: 3, nome: 'Março'},
        {mes: 4, nome: 'Abril'},
        {mes: 5, nome: 'Maio'},
        {mes: 6, nome: 'Junho'},
        {mes: 7, nome: 'Julho'},
        {mes: 8, nome: 'Agosto'},
        {mes: 9, nome: 'Setembro'},
        {mes: 10, nome: 'Outubro'},
        {mes: 11, nome: 'Novembro'},
        {mes: 12, nome: 'Dezembro'},
    ]

    return (
        <Layout titlePage="Salários" menu="financeiro" submenu="financeiro-salarios" empty
                voltar={route('admin.financeiro.salarios.index')}>
            <div className="card card-body mb-4 border py-4">
                <div className="row">
                    <div className="col">
                        <span className="d-block"><b>Nome: </b>{usuario.nome}</span>
                        <span className="d-block"><b>Setor: </b>{usuario.setor}</span>
                    </div>
                </div>
            </div>
            <div className="card card-body mb-4 border py-4">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Mês" select fullWidth
                                   defaultValue={mesSelecionado}
                                   onChange={e => setMesSelecionado(e.target.value)}>
                            {meses.map(item => <MenuItem key={item.mes} value={item.mes}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Ano" select fullWidth defaultValue={ano}
                                   onChange={e => setPeriodoAno(e.target.value)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                            <MenuItem value="2025">2025</MenuItem>
                        </TextField>
                    </div>
                </div>
            </div>

            {meses.map(item =>
                    (mesSelecionado == item.mes) && <div key={item.mes} className="card card-body mb-4 border">
                        <div className="row px-4 pb-2">
                            <div className="col">
                                <span><b>{item.nome}/{ano}</b></span>
                            </div>
                            <div className="col">
                                <span className="d-block text-lg"><b>Total: R$ {dados[item.mes]?.total}</b></span>
                            </div>
                        </div>
                        <div className="row row-cols-4">
                            {/*Salario*/}
                            <div className="col">
                                <div className="card card-body border">
                                    <span className="mb-3"><b>Salário Fixo</b></span>
                                    <TextField fullWidth label="Valor Salário"
                                               value={(campoEditar === 'salario' && data?.[item.mes]?.valor) ? (data?.[item.mes]?.valor) : dados[item.mes]?.salario_fixo}
                                               InputProps={{
                                                   startAdornment: <InputAdornment position="start">R$</InputAdornment>
                                               }}
                                               onChange={e => {
                                                   setData({
                                                       ...data,
                                                       [item.mes]: {
                                                           ...data?.[item.mes],
                                                           id: dados[item.mes]?.id,
                                                           valor: mascaraMoeda(e),
                                                       }
                                                   })
                                                   setCampoEditar('salario')
                                                   setIdEditar(item.mes)
                                               }}/>
                                    <br/>
                                    <TextField type="date" className="mt-3" fullWidth
                                               label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                               value={(campoEditar === 'salario' && data?.[item.mes]?.data) ? (data?.[item.mes]?.data) : dados[item.mes]?.salario_fixo_data}
                                               onChange={e => {
                                                   setData({
                                                       ...data,
                                                       [item.mes]: {
                                                           ...data?.[item.mes],
                                                           id: dados[item.mes]?.id,
                                                           data: e.target.value
                                                       }
                                                   })
                                                   setCampoEditar('salario')
                                                   setIdEditar(item.mes)
                                               }}/>
                                    <div className="row justify-content-between pt-3">
                                        <div className="col-auto">
                                            <Switch
                                                checked={(campoEditar === 'salario' && (data?.[item.mes]?.status)?.toString()) ? data?.[item.mes]?.status : dados[item.mes]?.salario_fixo_status}
                                                onChange={e => {
                                                    setData({
                                                        ...data,
                                                        [item.mes]: {
                                                            ...data?.[item.mes],
                                                            id: dados[item.mes]?.id,
                                                            status: e.target.checked
                                                        }
                                                    })
                                                    setCampoEditar('salario')
                                                    setIdEditar(item.mes)
                                                }}/>
                                            <small>{((campoEditar === 'salario' && (data?.[item.mes]?.status)?.toString()) ? data?.[item.mes]?.status : dados[item.mes]?.salario_fixo_status) ? 'Pago' : 'Aberto'}</small>
                                        </div>
                                        <div className="col-auto">
                                            {idEditar === item.mes && campoEditar === 'salario' &&
                                                <button className="btn btn-success btn-sm p-1 m-1 px-2 mt-2"
                                                        onClick={() => submit(item.mes, 'salario')}>Salvar</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Premio*/}
                            <div className="col">
                                <div className="card card-body border">
                                    <span className="mb-3"><b>Prêmio Mensal</b></span>
                                    <TextField fullWidth label="Valor Prêmio"
                                               value={(campoEditar === 'premio' && data?.[item.mes]?.valor) ? data?.[item.mes]?.valor : dados[item.mes]?.premio}
                                               InputProps={{
                                                   startAdornment: <InputAdornment position="start">R$</InputAdornment>
                                               }}
                                               onChange={e => {
                                                   setData({
                                                       ...data,
                                                       [item.mes]: {
                                                           ...data?.[item.mes],
                                                           id: dados[item.mes]?.id,
                                                           valor: mascaraMoeda(e),
                                                       }
                                                   })
                                                   setIdEditar(item.mes)
                                                   setCampoEditar('premio')
                                               }}/>
                                    <br/>
                                    <TextField type="date" className="mt-3" fullWidth
                                               label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                               value={(campoEditar === 'premio' && data?.[item.mes]) ? data?.[item.mes]?.data : dados[item.mes]?.premio_data}
                                               onChange={e => {
                                                   setIdEditar(item.mes)
                                                   setCampoEditar('premio')
                                                   setData({
                                                       ...data,
                                                       [item.mes]: {
                                                           ...data?.[item.mes],
                                                           id: dados[item.mes]?.id,
                                                           data: e.target.value
                                                       }
                                                   })
                                               }}/>

                                    <div className="col-12 text-start">
                                        <div className="row justify-content-between pt-3">
                                            <div className="col-auto">
                                                <Switch
                                                    checked={(campoEditar === 'premio' && (data?.[item.mes]?.status)?.toString()) ? data?.[item.mes]?.status : dados[item.mes]?.premio_status}
                                                    onChange={e => {
                                                        setData({
                                                            ...data,
                                                            [item.mes]: {
                                                                ...data?.[item.mes],
                                                                id: dados[item.mes]?.id,
                                                                status: e.target.checked
                                                            }
                                                        })
                                                        setIdEditar(item.mes)
                                                        setCampoEditar('premio')
                                                    }}/>
                                                <small>{((campoEditar === 'premio' && (data?.[item.mes]?.status)?.toString()) ? data?.[item.mes]?.status : dados[item.mes]?.premio_status) ? 'Pago' : 'Aberto'}</small>
                                            </div>
                                            <div className="col-auto">
                                                {idEditar === item.mes && campoEditar === 'premio' &&
                                                    <button className="btn btn-success btn-sm p-1 m-1 px-2 mt-2"
                                                            onClick={() => submit(item.mes, 'premio')}>Salvar</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Comissão*/}
                            <div className="col">
                                <div className="card card-body border">
                                    <span className="mb-3"><b>Comissão do Mês</b></span>
                                    <TextField fullWidth label="Valor da Comissão"
                                               value={(campoEditar === 'comissao' && data?.[item.mes]?.valor) ? data?.[item.mes]?.valor : dados[item.mes]?.comissao}
                                               InputProps={{
                                                   startAdornment: <InputAdornment
                                                       position="start">R$</InputAdornment>
                                               }}
                                               onChange={e => {
                                                   setData({
                                                       ...data,
                                                       [item.mes]: {
                                                           ...data?.[item.mes],
                                                           id: dados[item.mes]?.id,
                                                           valor: mascaraMoeda(e),
                                                       }
                                                   })
                                                   setIdEditar(item.mes)
                                                   setCampoEditar('comissao')
                                               }}/>
                                    <br/>
                                    <TextField type="date" className="mt-3" fullWidth
                                               label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                               value={(campoEditar === 'comissao' && data?.[item.mes]) ? data?.[item.mes]?.data : dados[item.mes]?.comissao_data}
                                               onChange={e => {
                                                   setData({
                                                       ...data,
                                                       [item.mes]: {
                                                           ...data?.[item.mes],
                                                           id: dados[item.mes]?.id,
                                                           data: e.target.value
                                                       }
                                                   })
                                                   setIdEditar(item.mes)
                                                   setCampoEditar('comissao')
                                               }}/>

                                    <div className="col-12 text-start pt-3">
                                        <div className="row justify-content-between">
                                            <div className="col-auto">
                                                <Switch
                                                    checked={(campoEditar === 'comissao' && (data?.[item.mes]?.status)?.toString()) ? data?.[item.mes]?.status : dados[item.mes]?.comissao_status}
                                                    onChange={e => {
                                                        setData({
                                                            ...data,
                                                            [item.mes]: {
                                                                ...data?.[item.mes],
                                                                id: dados[item.mes]?.id,
                                                                status: e.target.checked
                                                            }
                                                        })
                                                        setIdEditar(item.mes)
                                                        setCampoEditar('comissao')
                                                    }}/>
                                                <small>{((campoEditar === 'comissao' && (data?.[item.mes]?.status)?.toString()) ? data?.[item.mes]?.status : dados[item.mes]?.comissao_status) ? 'Pago' : 'Aberto'}</small>
                                            </div>
                                            <div className="col-auto">
                                                {idEditar === item.mes && campoEditar === 'comissao' &&
                                                    <button className="btn btn-success btn-sm p-1 m-1 px-2 mt-2"
                                                            onClick={() => submit(item.mes, 'comissao')}>Salvar</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Bonus*/}
                            <div className="col">
                                <div className="card card-body border">
                                    <span className="mb-3"><b>Bônus do Mês</b></span>
                                    <TextField fullWidth label="Valor do Bônus"
                                               value={(campoEditar === 'bonus' && data?.[item.mes]?.valor) ? data?.[item.mes]?.valor : dados[item.mes]?.bonus}
                                               InputProps={{
                                                   startAdornment: <InputAdornment
                                                       position="start">R$</InputAdornment>
                                               }}
                                               onChange={e => {
                                                   setData({
                                                       ...data,
                                                       [item.mes]: {
                                                           ...data?.[item.mes],
                                                           id: dados[item.mes]?.id,
                                                           valor: mascaraMoeda(e),
                                                       }
                                                   })
                                                   setIdEditar(item.mes)
                                                   setCampoEditar('bonus')
                                               }}/>
                                    <br/>
                                    <TextField type="date" className="mt-3" fullWidth
                                               label="Pagamento Realizado Dia"
                                               InputLabelProps={{shrink: true}}
                                               value={campoEditar === 'bonus' ? data?.[item.mes]?.data : dados[item.mes]?.bonus_data}
                                               onChange={e => {
                                                   setData({
                                                       ...data,
                                                       [item.mes]: {
                                                           ...data?.[item.mes],
                                                           id: dados[item.mes]?.id,
                                                           data: e.target.value,
                                                       }
                                                   })
                                                   setIdEditar(item.mes)
                                                   setCampoEditar('bonus')
                                               }}/>
                                    <div className="row justify-content-between pt-3">
                                        <div className="col-auto">
                                            <Switch
                                                checked={(campoEditar === 'bonus' && (data?.[item.mes]?.status)?.toString()) ? data?.[item.mes]?.status : dados[item.mes]?.bonus_status}
                                                onChange={e => {
                                                    setData({
                                                        ...data,
                                                        [item.mes]: {
                                                            ...data?.[item.mes],
                                                            id: dados[item.mes]?.id,
                                                            status: e.target.checked
                                                        }
                                                    })
                                                    setIdEditar(item.mes)
                                                    setCampoEditar('bonus')
                                                }}/>
                                            <small>{((campoEditar === 'bonus' && (data?.[item.mes]?.status)?.toString()) ? data?.[item.mes]?.status : dados[item.mes]?.bonus_status) ? 'Pago' : 'Aberto'}</small>
                                        </div>
                                        <div className="col-auto">
                                            {idEditar === item.mes && campoEditar === 'bonus' &&
                                                <button className="btn btn-success btn-sm p-1 m-1 px-2 mt-2"
                                                        onClick={() => submit(item.mes, 'bonus')}>Salvar</button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            )}

        </Layout>
    )
}
