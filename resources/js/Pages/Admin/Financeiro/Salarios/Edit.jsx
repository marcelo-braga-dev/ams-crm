import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import * as React from 'react';
import {InputAdornment, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import Switch from "@mui/material/Switch";
import {router, useForm} from "@inertiajs/react";
import convertFloatToMoney, {convertMoneyFloat} from "@/Helpers/converterDataHorario";
import "chart.js/auto";
import MetasAtingidas from "./Graficos/MetasAtingidas"

const startAdornment = {startAdornment: <InputAdornment position="start">R$</InputAdornment>}
const endAdornment = {endAdornment: <InputAdornment position="end">%</InputAdornment>}

export default function ({usuario, ano, mes, userId}) {
    const [registros, setRegistros] = useState([])
    const [mesSelecionado, setMesSelecionado] = useState(mes)
    const [anoSelecionado, setAnoSelecionado] = useState(ano)
    const [competenciaSelecionado, setCompetenciaSelecionado] = useState(mes)

    const [vendasMes, setVendasMes] = useState(0)
    const [metaMes, setMetaMes] = useState(0)
    const [margemAtingida, setMargemAtingida] = useState(0)
    const [metasAnual, setMetasAnual] = useState([])
    const [vendasAnual, setVendasAnual] = useState([])

    const [campoEditar, setCampoEditar] = useState()

    const {data, setData, reset} = useForm()


    const submit = (campo) => {
        setCampoEditar(undefined)
        router.post(route('admin.financeiro.salarios.store', {
            ...data,
            campo: campo,
            mes: mesSelecionado,
            competencia: competenciaSelecionado,
            ano: anoSelecionado,
            user_id: userId,
        }), {}, {preserveScroll: true})
        buscarRegistros()
    }

    router.on('success', () => setData({}))

    function buscarRegistros() {
        axios.get(route('admin.financeiro.salarios.registros', {
            id: usuario.id,
            mes: mesSelecionado,
            ano: anoSelecionado,
            competencia: competenciaSelecionado,
        })).then(res => {
            setRegistros(res.data.registros)
            setVendasMes(res.data.vendas_mes)
            setMetaMes(res.data.meta_mes)
            setMetasAnual(res.data.metas_anual)
            setVendasAnual(res.data.vendas_anual)

            const valorMargemAtingida = res.data.meta_mes > 0 ? (res.data.vendas_mes / res.data.meta_mes * 100) : null
            setMargemAtingida(valorMargemAtingida)
        })
    }

    useEffect(() => {
        buscarRegistros()
    }, [mesSelecionado, anoSelecionado, competenciaSelecionado]);

    function mascaraMoeda(valor, dig = 2) {
        let valorAlterado = valor.target.value;
        valorAlterado = valorAlterado.replace(/\D/g, "");

        valorAlterado = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: dig}).format(
            parseFloat(valorAlterado) / (10 ** dig)
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
                                   value={mesSelecionado ?? ''}
                                   onChange={e => setMesSelecionado(e.target.value)}>
                            {meses.map(item => <MenuItem key={item.mes} value={item.mes}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Ano" select fullWidth defaultValue={ano}
                                   onChange={e => setAnoSelecionado(e.target.value)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                            <MenuItem value="2025">2025</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Competência" select fullWidth
                                   value={competenciaSelecionado ?? ''}
                                   onChange={e => setCompetenciaSelecionado(e.target.value)}>
                            {meses.map(item => <MenuItem key={item.mes} value={item.mes}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                </div>
            </div>


            <div className="card card-body mb-4 border">
                <div className="row px-4 pb-2">
                    <div className="col">
                        {/*<span><b>{item.nome}/{ano}</b></span>*/}
                    </div>
                    <div className="col">
                        <span><b>Meta do Mês:</b> R$ {convertFloatToMoney(metaMes)}</span>
                    </div>
                    <div className="col">
                        <span
                            className={margemAtingida ? (margemAtingida >= 100 ? 'text-success' : 'text-danger') : ''}>
                            <b>Alcançado:</b> R$ {convertFloatToMoney(vendasMes)} {margemAtingida ? `(${convertFloatToMoney(margemAtingida)}%)` : ''}
                        </span>
                    </div>
                    <div className="col">
                        <span className="d-block text-lg"><b>Salário Total: R$ {registros?.total}</b></span>
                    </div>
                </div>
                <div className="row row-cols-4">
                    {/*Salario*/}
                    <div className="col">
                        <div className="card card-body border">
                            <span className="mb-3"><b>Salário Fixo</b></span>
                            <TextField fullWidth label="Valor Salário"
                                       value={(data?.salario?.valor ?? registros?.salario_fixo) ?? ''}
                                       InputProps={startAdornment}
                                       onChange={e => {
                                           setData({
                                               'salario': {
                                                   ...data.salario,
                                                   valor: mascaraMoeda(e),
                                               }
                                           })
                                           setCampoEditar('salario')
                                       }}/>
                            <br/>
                            <TextField type="date" className="mt-4" fullWidth
                                       label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                       value={(data?.salario?.data ?? registros?.salario_fixo_data) ?? ''}
                                       onChange={e => {
                                           setData({
                                               'salario': {
                                                   ...data.salario,
                                                   data: e.target.value,
                                               }
                                           })
                                           setCampoEditar('salario')
                                       }}/>
                            <div className="row justify-content-between pt-3">
                                <div className="col-auto">
                                    <Switch
                                        checked={((data?.salario?.status)?.toString()) ? data?.salario?.status : registros?.salario_fixo_status}
                                        onChange={e => {
                                            setData({
                                                'salario': {
                                                    ...data.salario,
                                                    status: e.target.checked,
                                                }
                                            })
                                            setCampoEditar('salario')
                                        }}/>
                                    <small>{((data?.salario?.status)?.toString() ? data?.salario?.status : registros?.salario_fixo_status) ? 'Pago' : 'Aberto'}</small>
                                </div>
                                <div className="col-auto">
                                    {campoEditar === 'salario' &&
                                        <button className="btn btn-success btn-sm p-1 m-1 px-2 mt-2"
                                                onClick={() => submit('salario')}>Salvar</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Premio*/}
                    <div className="col">
                        <div className="card card-body border">
                            <span className="mb-3"><b>Prêmio Mensal</b></span>
                            <div className="row">
                                <div className="col mb-2">
                                    <TextField fullWidth label="Valor Prêmio"
                                               value={(data?.premio?.premio_margem ?? convertFloatToMoney(registros?.premio_margem, 3)) ?? ''}
                                               InputProps={endAdornment}
                                               onChange={e => {
                                                   setData({
                                                       'premio': {
                                                           ...data.premio,
                                                           premio_margem: mascaraMoeda(e, 3),
                                                           valor: metaMes * (mascaraMoeda(e, 3) ? (convertMoneyFloat(mascaraMoeda(e, 3)) / 10) : registros?.premio_margem)
                                                       }
                                                   })
                                                   setCampoEditar('premio')
                                               }}/>
                                </div>
                                <div className="col pt-2">
                                    R$ {convertFloatToMoney(metaMes * (data?.premio?.premio_margem ? convertMoneyFloat(data?.premio?.premio_margem) / 10 : registros?.premio_margem))}
                                </div>
                            </div>
                            <TextField type="date" className="mt-3" fullWidth
                                       label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                       value={(data?.premio?.data ?? registros?.premio_data) ?? ''}
                                       onChange={e => {
                                           //
                                           setCampoEditar('premio')
                                           setData({
                                               'premio': {
                                                   ...data.premio,
                                                   data: e.target.value
                                               }
                                           })
                                       }}/>

                            <div className="col-12 text-start">
                                <div className="row justify-content-between">
                                    <div className="col-auto">
                                        <Switch
                                            checked={((data?.premio?.status)?.toString()) ? data?.premio?.status : registros?.premio_status}
                                            onChange={e => {
                                                setData({
                                                    'premio': {
                                                        ...data.premio,
                                                        status: e.target.checked
                                                    }
                                                })
                                                setCampoEditar('premio')
                                            }}/>
                                        <small>{((data?.premio?.status)?.toString() ? data?.premio?.status : registros?.premio_status) ? 'Pago' : 'Aberto'}</small>
                                    </div>
                                    <div className="col-auto">
                                        {campoEditar === 'premio' &&
                                            <button className="btn btn-success btn-sm p-1 m-1 px-2 mt-2"
                                                    onClick={() => submit('premio')}>Salvar</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Comissão*/}
                    <div className="col">
                        <div className="card card-body border">
                            <span className="mb-3"><b>Prêmio Extra</b></span>
                            <div className="row">
                                <div className="col mb-2">
                                    <TextField fullWidth label="Valor Prêmio"
                                               value={(data?.comissao?.comissao_margem ?? convertFloatToMoney(registros?.premio_extra_margem, 3)) ?? ''}
                                               InputProps={endAdornment}
                                               onChange={e => {
                                                   setData({
                                                       'comissao': {
                                                           ...data.comissao,
                                                           comissao_margem: mascaraMoeda(e, 3),
                                                           valor: metaMes * (mascaraMoeda(e, 3) ? (convertMoneyFloat(mascaraMoeda(e, 3)) / 10) : registros?.premio_extra_margem)
                                                       }
                                                   })
                                                   setCampoEditar('comissao')
                                               }}/>
                                </div>
                                <div className="col pt-2">
                                    R$ {convertFloatToMoney(metaMes * (data?.comissao?.comissao_margem ? convertMoneyFloat(data?.comissao?.comissao_margem) / 10 : registros?.premio_extra_margem))}
                                </div>
                            </div>
                            <br/>
                            <TextField type="date" className="mt-3" fullWidth
                                       label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                       value={(data?.comissao?.data ?? registros?.comissao_data) ?? ''}
                                       onChange={e => {
                                           setData({
                                               'comissao': {
                                                   ...data.comissao,
                                                   data: e.target.value
                                               }
                                           })
                                           setCampoEditar('comissao')
                                       }}/>

                            <div className="col-12 text-start pt-3">
                                <div className="row justify-content-between">
                                    <div className="col-auto">
                                        <Switch
                                            checked={((data?.comissao?.status)?.toString()) ? data?.comissao?.status : registros?.comissao_status}
                                            onChange={e => {
                                                setData({
                                                    'comissao': {
                                                        ...data.comissao,
                                                        status: e.target.checked
                                                    }
                                                })
                                                setCampoEditar('comissao')
                                            }}/>
                                        <small>{((data?.comissao?.status)?.toString() ? data?.comissao?.status : registros?.comissao_status) ? 'Pago' : 'Aberto'}</small>
                                    </div>
                                    <div className="col-auto">
                                        {campoEditar === 'comissao' &&
                                            <button className="btn btn-success btn-sm p-1 m-1 px-2 mt-2"
                                                    onClick={() => submit('comissao')}>Salvar</button>
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
                                       value={(data?.bonus?.valor ?? registros?.bonus) ?? ''}
                                       InputProps={startAdornment}
                                       onChange={e => {
                                           setData({
                                               'bonus': {
                                                   ...data.bonus,
                                                   valor: mascaraMoeda(e),
                                               }
                                           })
                                           setCampoEditar('bonus')
                                       }}/>
                            <br/>
                            <TextField type="date" className="mt-4" fullWidth
                                       label="Pagamento Realizado Dia"
                                       InputLabelProps={{shrink: true}}
                                       value={(data?.bonus?.data ?? registros?.bonus_data) ?? ''}
                                       onChange={e => {
                                           setData({
                                               'bonus': {
                                                   ...data.bonus,
                                                   data: e.target.value,
                                               }
                                           })
                                           setCampoEditar('bonus')
                                       }}/>
                            <div className="row justify-content-between pt-3">
                                <div className="col-auto">
                                    <Switch
                                        checked={((data?.bonus?.status)?.toString()) ? data?.bonus?.status : registros?.bonus_status}
                                        onChange={e => {
                                            setData({
                                                'bonus': {
                                                    ...data.bonus,
                                                    status: e.target.checked
                                                }
                                            })
                                            setCampoEditar('bonus')
                                        }}/>
                                    <small>{((data?.bonus?.status)?.toString() ? data?.bonus?.status : registros?.bonus_status) ? 'Pago' : 'Aberto'}</small>
                                </div>
                                <div className="col-auto">
                                    {campoEditar === 'bonus' &&
                                        <button className="btn btn-success btn-sm p-1 m-1 px-2 mt-2"
                                                onClick={() => submit('bonus')}>Salvar</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card card-body mb-4 border">
                <div className="row">
                    <div className="col">
                        <h6>Meta x Vendas de {ano} de {usuario.nome}</h6>
                        <MetasAtingidas metasAnual={metasAnual} vendasAnual={vendasAnual} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
