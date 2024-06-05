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

export default function ({usuario, ano, mes}) {
    const [registros, setRegistros] = useState([])
    const [anoSelecionado, setAnoSelecionado] = useState(ano)
    const [competenciaSelecionado, setCompetenciaSelecionado] = useState(mes)

    const [vendasMes, setVendasMes] = useState(0)
    const [metaMes, setMetaMes] = useState(0)
    const [margemAtingida, setMargemAtingida] = useState(0)
    const [margemAtingidaEquipe, setMargemAtingidaEquipe] = useState(0)
    const [vendasEquipe, setVendasEquipe] = useState(0)
    const [metasEquipe, setMetasEquipe] = useState(0)

    const [vendasMensais, setVendasMensais] = useState([])
    const [metasMensais, setMetasMensais] = useState([])

    const [campoEditar, setCampoEditar] = useState()

    const {data, setData, reset} = useForm()

    const submit = (campo) => {
        setCampoEditar(undefined)
        router.post(route('admin.financeiro.salarios.store', {
            ...data,
            campo: campo,
            competencia: competenciaSelecionado,
            ano: anoSelecionado,
            user_id: usuario.id,
        }), {}, {preserveScroll: true})
        buscarRegistros()
    }

    router.on('success', () => setData({}))

    function buscarRegistros() {
        axios.get(route('admin.financeiro.salarios.registros', {
            id: usuario.id,
            ano: anoSelecionado,
            competencia: competenciaSelecionado,
        })).then(res => {
            setRegistros(res.data.registros)
            setVendasMes(res.data.vendas_mes.vendas)
            setMetaMes(res.data.meta_mes)
            setMetasEquipe(res.data.metas_equipe)
            setVendasEquipe(res.data.vendas_equipe)

            setVendasMensais(res.data.vendas_mensais)
            setMetasMensais(res.data.metas_mensais)

            const valorMargemAtingida = res.data.meta_mes > 0 ? (res.data.vendas_mes.vendas / res.data.meta_mes * 100) : null
            setMargemAtingida(valorMargemAtingida)

            const valorMargemAtingidaEquipe = res.data.metas_equipe > 0 ? (res.data.vendas_equipe / res.data.metas_equipe * 100) : null
            setMargemAtingidaEquipe(valorMargemAtingidaEquipe)
        })
    }

    useEffect(() => {
        buscarRegistros()
    }, [anoSelecionado, competenciaSelecionado]);

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
            <div className="py-4 mb-4 border card card-body">
                <div className="row">
                    <div className="col">
                        <span className="d-block"><b>Nome: </b>{usuario.nome}</span>
                    </div>
                    <div className="col">
                        <span className="d-block"><b>Função: </b>{usuario.funcao}</span>
                    </div>
                    <div className="col">
                        <span className="d-block"><b>Setor: </b>{usuario.setor}</span>
                    </div>
                </div>
            </div>
            <div className="py-4 mb-4 border card card-body">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Competência" select fullWidth
                                   value={competenciaSelecionado ?? ''}
                                   onChange={e => setCompetenciaSelecionado(e.target.value)}>
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
                </div>
            </div>

            <div className="mb-4 border card card-body">
                <div className="px-4 row row-cols-3">
                    <div className="col">
                        <span><b>Meta:</b> R$ {convertFloatToMoney(metaMes)}</span>
                    </div>
                    <div className="col">
                        <span
                            className={margemAtingida ? (margemAtingida >= 100 ? 'text-success' : 'text-danger') : ''}>
                            <b>Alcançado:</b> R$ {convertFloatToMoney(vendasMes)} {margemAtingida ? `(${convertFloatToMoney(margemAtingida)}%)` : ''}
                        </span>
                    </div>
                </div>

                {vendasEquipe > 0 &&
                    <div className="px-4 row row-cols-3">
                        <div className="col">
                            <span><b>Meta da Equipe:</b> R$ {convertFloatToMoney(metasEquipe)}</span>
                        </div>
                        <div className="col">
                            <span
                                className={margemAtingidaEquipe ? (margemAtingidaEquipe >= 100 ? 'text-success' : 'text-danger') : ''}>
                                <b>Alcançado pela Equipe:</b> R$ {convertFloatToMoney(vendasEquipe)} {margemAtingidaEquipe ? `(${convertFloatToMoney(margemAtingidaEquipe)}%)` : ''}
                            </span>
                        </div>
                    </div>
                }
            </div>

            <div className="mb-4 border card card-body">
                <div className="row">
                    <div className="mb-2 col">
                        <span
                            className="text-lg d-block"><b>Salário Total: R$ {convertFloatToMoney(registros?.total)}</b></span>
                    </div>
                </div>
                <div className="row row-cols-4">
                    {/*Salario*/}
                    <div className="col">
                        <div className="border card card-body">
                            <span className="mb-3"><b>Salário Fixo</b></span>
                            <TextField fullWidth label="Valor Salário"
                                       value={(data?.salario_fixo?.valor ?? convertFloatToMoney(registros?.salario_fixo?.valor)) ?? ''}
                                       InputProps={startAdornment}
                                       onChange={e => {
                                           setData({
                                               'salario_fixo': {
                                                   ...data.salario_fixo,
                                                   valor: mascaraMoeda(e),
                                               }
                                           })
                                           setCampoEditar('salario_fixo')
                                       }}/>
                            <br/>
                            <TextField type="date" fullWidth
                                       label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                       value={(data?.salario_fixo?.data ?? registros?.salario_fixo?.data_pagamento) ?? ''}
                                       onChange={e => {
                                           setData({
                                               'salario_fixo': {
                                                   ...data.salario_fixo,
                                                   data: e.target.value,
                                               }
                                           })
                                           setCampoEditar('salario_fixo')
                                       }}/>
                            <br/>
                            <TextField fullWidth multiline
                                       label="Anotações"
                                       value={(data?.salario_fixo?.anotacoes ?? registros?.salario_fixo?.anotacoes) ?? ''}
                                       onChange={e => {
                                           setData({
                                               'salario_fixo': {
                                                   ...data.salario_fixo,
                                                   anotacoes: e.target.value,
                                               }
                                           })
                                           setCampoEditar('salario_fixo')
                                       }}/>
                            <br/>
                            <div className="row justify-content-between">
                                <div className="col-auto">
                                    <Switch
                                        checked={((data?.salario_fixo?.status?.toString())) ? data?.salario_fixo?.status == '1' : registros?.salario_fixo?.status == '1'}
                                        onChange={e => {
                                            setData({
                                                'salario_fixo': {
                                                    ...data.salario_fixo,
                                                    status: e.target.checked,
                                                }
                                            })
                                            setCampoEditar('salario_fixo')
                                        }}/>
                                    <small>{((data?.salario_fixo?.status?.toString()) ? data?.salario_fixo?.status == '1' : registros?.salario_fixo?.status == '1') ? 'Pago' : 'Aberto'}</small>
                                </div>
                                <div className="col-auto">
                                    {campoEditar == 'salario_fixo' &&
                                        <button className="p-1 px-2 m-1 mt-2 btn btn-success btn-sm"
                                                onClick={() => submit('salario_fixo')}>Salvar</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Prêmio Mensal*/}
                    <div className="col">
                        <div className="border card card-body">
                            <span className="mb-3"><b>Prêmio Mensal</b></span>
                            <div className="row">
                                <div className="col">
                                    <TextField fullWidth label="Valor Prêmio" InputProps={endAdornment}
                                               value={(data?.premio?.margem ?? convertFloatToMoney(registros?.premio?.margem, 3)) ?? ''}
                                               onChange={e => {
                                                   setData({
                                                       'premio': {
                                                           ...data.premio,
                                                           margem: mascaraMoeda(e, 3),
                                                           valor: convertMoneyFloat(mascaraMoeda(e, 3), 3) * vendasMes / 100
                                                       }
                                                   })
                                                   setCampoEditar('premio')
                                               }}/>
                                </div>
                                <div className="pt-2 col">
                                    R$ {convertFloatToMoney((data?.premio?.margem ? convertMoneyFloat(data?.premio?.margem, 3) : registros?.premio?.margem) * vendasMes / 100)}
                                </div>
                            </div>
                            <br/>
                            <TextField type="date" fullWidth
                                       label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                       value={(data?.premio?.data ?? registros?.premio?.data_pagamento) ?? ''}
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
                            <br/>
                            <TextField fullWidth multiline
                                       label="Anotações"
                                       value={(data?.premio?.anotacoes ?? registros?.premio?.anotacoes) ?? ''}
                                       onChange={e => {
                                           setData({
                                               'premio': {
                                                   ...data.premio,
                                                   anotacoes: e.target.value,
                                               }
                                           })
                                           setCampoEditar('premio')
                                       }}/>
                            <br/>
                            <div className="col-12 text-start">
                                <div className="row justify-content-between">
                                    <div className="col-auto">
                                        <Switch
                                            checked={((data?.premio?.status?.toString())) ? data?.premio?.status == '1' : registros?.premio?.status == '1'}
                                            onChange={e => {
                                                setData({
                                                    'premio': {
                                                        ...data.premio,
                                                        status: e.target.checked
                                                    }
                                                })
                                                setCampoEditar('premio')
                                            }}/>
                                        <small>{((data?.premio?.status?.toString()) ? data?.premio?.status == '1' : registros?.premio?.status == '1') ? 'Pago' : 'Aberto'}</small>
                                    </div>
                                    <div className="col-auto">
                                        {campoEditar == 'premio' &&
                                            <button className="p-1 px-2 m-1 mt-2 btn btn-success btn-sm"
                                                    onClick={() => submit('premio')}>Salvar</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Prêmio Extra*/}
                    <div className="col">
                        <div className="border card card-body">
                            <span className="mb-3"><b>Prêmio Extra</b></span>
                            <TextField fullWidth label="Valor Prêmio"
                                       value={(data?.premio_extra?.valor ?? convertFloatToMoney(registros?.premio_extra?.valor)) ?? ''}
                                       InputProps={startAdornment}
                                       onChange={e => {
                                           setData({
                                               'premio_extra': {
                                                   ...data.premio_extra,
                                                   valor: mascaraMoeda(e),
                                               }
                                           })
                                           setCampoEditar('premio_extra')
                                       }}/>
                            <br/>
                            <TextField type="date" fullWidth
                                       label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                       value={(data?.premio_extra?.data ?? registros?.premio_extra?.data_pagamento) ?? ''}
                                       onChange={e => {
                                           setData({
                                               'premio_extra': {
                                                   ...data.premio_extra,
                                                   data: e.target.value
                                               }
                                           })
                                           setCampoEditar('premio_extra')
                                       }}/>
                            <br/>
                            <TextField fullWidth multiline
                                       label="Anotações"
                                       value={(data?.premio_extra?.anotacoes ?? registros?.premio_extra?.anotacoes) ?? ''}
                                       onChange={e => {
                                           setData({
                                               'premio_extra': {
                                                   ...data.premio_extra,
                                                   anotacoes: e.target.value,
                                               }
                                           })
                                           setCampoEditar('premio_extra')
                                       }}/>
                            <br/>
                            <div className="col-12 text-start">
                                <div className="row justify-content-between">
                                    <div className="col-auto">
                                        <Switch
                                            checked={((data?.premio_extra?.status)?.toString()) ? data?.premio_extra?.status : registros?.premio_extra?.status}
                                            onChange={e => {
                                                setData({
                                                    'premio_extra': {
                                                        ...data.premio_extra,
                                                        status: e.target.checked
                                                    }
                                                })
                                                setCampoEditar('premio_extra')
                                            }}/>
                                        <small>{((data?.premio_extra?.status)?.toString() ? data?.premio_extra?.status == '1' : registros?.premio_extra?.status == '1') ? 'Pago' : 'Aberto'}</small>
                                    </div>
                                    <div className="col-auto">
                                        {campoEditar == 'premio_extra' &&
                                            <button className="p-1 px-2 m-1 mt-2 btn btn-success btn-sm"
                                                    onClick={() => submit('premio_extra')}>Salvar</button>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*Bonus*/}
                    <div className="col">
                        <div className="border card card-body">
                            <span className="mb-3"><b>Bônus do Mês</b></span>
                            <TextField fullWidth label="Valor do Bônus"
                                       value={(data?.bonus?.valor ?? convertFloatToMoney(registros?.bonus?.valor)) ?? ''}
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
                            <TextField type="date" fullWidth
                                       label="Pagamento Realizado Dia"
                                       InputLabelProps={{shrink: true}}
                                       value={(data?.bonus?.data ?? registros?.bonus?.data_pagamento) ?? ''}
                                       onChange={e => {
                                           setData({
                                               'bonus': {
                                                   ...data.bonus,
                                                   data: e.target.value,
                                               }
                                           })
                                           setCampoEditar('bonus')
                                       }}/>
                            <br/>
                            <TextField fullWidth multiline
                                       label="Anotações"
                                       value={(data?.bonus?.anotacoes ?? registros?.bonus?.anotacoes) ?? ''}
                                       onChange={e => {
                                           setData({
                                               'bonus': {
                                                   ...data.bonus,
                                                   anotacoes: e.target.value,
                                               }
                                           })
                                           setCampoEditar('bonus')
                                       }}/>
                            <br/>
                            <div className="row justify-content-between">
                                <div className="col-auto">
                                    <Switch
                                        checked={((data?.bonus?.status)?.toString()) ? data?.bonus?.status == '1' : registros?.bonus?.status == '1'}
                                        onChange={e => {
                                            setData({
                                                'bonus': {
                                                    ...data.bonus,
                                                    status: e.target.checked
                                                }
                                            })
                                            setCampoEditar('bonus')
                                        }}/>
                                    <small>{((data?.bonus?.status)?.toString() ? data?.bonus?.status == '1' : registros?.bonus?.status == '1') ? 'Pago' : 'Aberto'}</small>
                                </div>
                                <div className="col-auto">
                                    {campoEditar == 'bonus' &&
                                        <button className="p-1 px-2 m-1 mt-2 btn btn-success btn-sm"
                                                onClick={() => submit('bonus')}>Salvar</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-4 border card card-body">
                <div className="row">
                    <div className="col">
                        <h6>Meta x Vendas de {ano} de {usuario.nome}</h6>
                        <MetasAtingidas metasMensais={metasMensais} vendasMensais={vendasMensais}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
