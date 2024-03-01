import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import * as React from 'react';
import {InputAdornment, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import Switch from "@mui/material/Switch";
import {router, useForm} from "@inertiajs/react";

export default function ({mes, ano}) {
    const [periodoMes, setPeriodoMes] = useState(mes)
    const [periodoAno, setPeriodoAno] = useState(ano)
    const [salarios, setSalarios] = useState([])
    const [idEditar, setIdEditar] = useState()
    const [campoEditar, setCampoEditar] = useState()

    const {data, setData, reset} = useForm()

    function alterarPeriodo() {

        axios.get(route('admin.financeiro.salarios.mensais', {mes: periodoMes, ano: periodoAno}))
            .then(res => setSalarios(res.data))
    }

    useEffect(() => {
        setData({})
        alterarPeriodo()
    }, [periodoMes, periodoAno]);

    const submit = (id, campo) => {
        setIdEditar()
        router.post(route('admin.financeiro.salarios.store', {
            ...data?.[id],
            campo: campo,
            mes: periodoMes,
            ano: periodoAno
        }))
    }

    router.on('success', () => {
        // setData({})
        alterarPeriodo()
    })

    function mascaraMoeda(valor) {
        let valorAlterado = valor.target.value;
        valorAlterado = valorAlterado.replace(/\D/g, "");

        valorAlterado = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(
            parseFloat(valorAlterado) / 100
        )

        valor.target.value = valorAlterado;
        return valorAlterado;
    }

    const nomesMeses = {
        1: 'Janeiro',
        2: 'Fevereiro',
        3: 'Março',
        4: 'Abril',
        5: 'Maio',
        6: 'Junho',
        7: 'Julho',
        8: 'Agosto',
        9: 'Setembro',
        10: 'Outubro',
        11: 'Novembro',
        12: 'Dezembro',
    }

    return (
        <Layout titlePage="Salários" menu="financeiro" submenu="salarios" empty>
            <div className="card card-body mb-4 border py-4">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Mês" select fullWidth value={periodoMes ?? ''}
                                   onChange={e => setPeriodoMes(e.target.value)}>
                            <MenuItem value="1">Janeiro</MenuItem>
                            <MenuItem value="2">Fevereiro</MenuItem>
                            <MenuItem value="3">Março</MenuItem>
                            <MenuItem value="4">Abril</MenuItem>
                            <MenuItem value="5">Maio</MenuItem>
                            <MenuItem value="6">Junho</MenuItem>
                            <MenuItem value="7">Julho</MenuItem>
                            <MenuItem value="8">Agosto</MenuItem>
                            <MenuItem value="9">Setembro</MenuItem>
                            <MenuItem value="10">Outubro</MenuItem>
                            <MenuItem value="11">Novembro</MenuItem>
                            <MenuItem value="12">Dezembro</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Ano" select fullWidth value={periodoAno ?? ''}
                                   onChange={e => setPeriodoAno(e.target.value)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                            <MenuItem value="2025">2025</MenuItem>
                        </TextField>
                    </div>
                </div>
            </div>

            {salarios.map(item =>
                <div className="card card-body mb-4 border">
                    <div className="card card-body border mb-3">
                        <div className="row justify-content-between">
                            <div className="col">
                                <small className="text-lg d-block"><b>{item.nome}</b></small>
                                <small><b>ID do usuário:</b> #{item.id}</small>
                                <small className="ps-4"><b>Setor:</b> {item.setor}</small>
                                <small className="ps-4"><b>Franquia:</b> {item.franquia}</small>
                            </div>
                            <div className="col-auto">
                                <span className="text-dark"><b>{nomesMeses[periodoMes]}/{periodoAno}</b></span>
                                <span className="d-block text-lg"><b>Total: R$ {item.total}</b></span>
                            </div>
                        </div>
                    </div>
                    <div className="row row-cols-4">
                        {/*Salario*/}
                        <div className="col">
                            <div className="card card-body border">
                                <span className="mb-3"><b>Salário Fixo</b></span>
                                <TextField fullWidth label="Valor Salário"
                                           value={(campoEditar === 'salario' && data?.[item.id]) ? (data?.[item.id]?.valor) : item.salario_fixo}
                                           InputProps={{
                                               startAdornment: <InputAdornment
                                                   position="start">R$</InputAdornment>
                                           }}
                                           onChange={e => {
                                               setData({
                                                   ...data,
                                                   [item.id]: {
                                                       ...data?.[item.id],
                                                       id: item.id,
                                                       valor: mascaraMoeda(e),
                                                   }
                                               })
                                               setIdEditar(item.id)
                                               setCampoEditar('salario')
                                           }
                                           }/>
                                <br/>
                                <TextField type="date" className="mt-3" fullWidth
                                           label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                           value={(campoEditar === 'salario' && data?.[item.id]) ? (data?.[item.id]?.data) : item.salario_fixo_data}
                                           onChange={e => {
                                               setData({
                                                   ...data,
                                                   [item.id]: {
                                                       ...data?.[item.id],
                                                       id: item.id,
                                                       data: e.target.value
                                                   }
                                               })
                                               setIdEditar(item.id)
                                               setCampoEditar('salario')
                                           }}/>
                                <div className="row justify-content-between pt-3">
                                    <div className="col-auto">
                                        <Switch
                                            checked={(campoEditar === 'salario' && (data?.[item.id]?.status)?.toString()) ? data?.[item.id]?.status : item.salario_fixo_status}
                                            onChange={e => {
                                                setData({
                                                    ...data,
                                                    [item.id]: {
                                                        ...data?.[item.id],
                                                        id: item.id,
                                                        status: e.target.checked
                                                    }
                                                })
                                                setIdEditar(item.id)
                                                setCampoEditar('salario')
                                            }}/>
                                        <small>{((campoEditar === 'salario' && (data?.[item.id]?.status)?.toString()) ? data?.[item.id]?.status : item.salario_fixo_status) ? 'Pago' : 'Aberto'}</small>
                                    </div>
                                    <div className="col-auto">
                                        {idEditar === item.id && campoEditar === 'salario' &&
                                            <button className="btn btn-success btn-sm p-1 m-1 px-2 mt-2"
                                                    onClick={() => submit(item.id, 'salario')}>Salvar</button>
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
                                           value={(campoEditar === 'premio' && data?.[item.id]?.valor) ? data?.[item.id]?.valor : item.premio}
                                           InputProps={{
                                               startAdornment: <InputAdornment
                                                   position="start">R$</InputAdornment>
                                           }}
                                           onChange={e => {
                                               setData({
                                                   ...data,
                                                   [item.id]: {
                                                       ...data?.[item.id],
                                                       id: item.id,
                                                       valor: mascaraMoeda(e),
                                                   }
                                               })
                                               setIdEditar(item.id)
                                               setCampoEditar('premio')
                                           }}/>
                                <br/>
                                <TextField type="date" className="mt-3" fullWidth
                                           label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                           value={(campoEditar === 'premio' && data?.[item.id]) ? data?.[item.id]?.data : item.premio_data}
                                           onChange={e => {
                                               setIdEditar(item.id)
                                               setCampoEditar('premio')
                                               setData({
                                                   ...data,
                                                   [item.id]: {
                                                       ...data?.[item.id],
                                                       id: item.id,
                                                       data: e.target.value
                                                   }
                                               })
                                           }}/>

                                <div className="col-12 text-start">
                                    <div className="row justify-content-between pt-3">
                                        <div className="col-auto">
                                            <Switch
                                                checked={(campoEditar === 'premio' && (data?.[item.id]?.status)?.toString()) ? data?.[item.id]?.status : item.premio_status}
                                                onChange={e => {
                                                    setData({
                                                        ...data,
                                                        [item.id]: {
                                                            ...data?.[item.id],
                                                            id: item.id,
                                                            status: e.target.checked
                                                        }
                                                    })
                                                    setIdEditar(item.id)
                                                    setCampoEditar('premio')
                                                }}/>
                                            <small>{((campoEditar === 'premio' && (data?.[item.id]?.status)?.toString()) ? data?.[item.id]?.status : item.premio_status) ? 'Pago' : 'Aberto'}</small>
                                        </div>
                                        <div className="col-auto">
                                            {idEditar === item.id && campoEditar === 'premio' &&
                                                <button className="btn btn-success btn-sm p-1 m-1 px-2 mt-2"
                                                        onClick={() => submit(item.id, 'premio')}>Salvar</button>
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
                                           value={(campoEditar === 'comissao' && data?.[item.id]?.valor) ? data?.[item.id]?.valor : item.comissao}
                                           InputProps={{
                                               startAdornment: <InputAdornment
                                                   position="start">R$</InputAdornment>
                                           }}
                                           onChange={e => {
                                               setData({
                                                   ...data,
                                                   [item.id]: {
                                                       ...data?.[item.id],
                                                       id: item.id,
                                                       valor: mascaraMoeda(e),
                                                   }
                                               })
                                               setIdEditar(item.id)
                                               setCampoEditar('comissao')
                                           }}/>
                                <br/>
                                <TextField type="date" className="mt-3" fullWidth
                                           label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                           value={(campoEditar === 'comissao' && data?.[item.id]) ? data?.[item.id]?.data : item.comissao_data}
                                           onChange={e => {
                                               setData({
                                                   ...data,
                                                   [item.id]: {
                                                       ...data?.[item.id],
                                                       id: item.id,
                                                       data: e.target.value
                                                   }
                                               })
                                               setIdEditar(item.id)
                                               setCampoEditar('comissao')
                                           }}/>

                                <div className="col-12 text-start pt-3">
                                    <div className="row justify-content-between">
                                        <div className="col-auto">
                                            <Switch
                                                checked={(campoEditar === 'comissao' && (data?.[item.id]?.status)?.toString()) ? data?.[item.id]?.status : item.comissao_status}
                                                onChange={e => {
                                                    setData({
                                                        ...data,
                                                        [item.id]: {
                                                            ...data?.[item.id],
                                                            id: item.id,
                                                            status: e.target.checked
                                                        }
                                                    })
                                                    setIdEditar(item.id)
                                                    setCampoEditar('comissao')
                                                }}/>
                                            <small>{((campoEditar === 'comissao' && (data?.[item.id]?.status)?.toString()) ? data?.[item.id]?.status : item.comissao_status) ? 'Pago' : 'Aberto'}</small>
                                        </div>
                                        <div className="col-auto">
                                            {idEditar === item.id && campoEditar === 'comissao' &&
                                                <button className="btn btn-success btn-sm p-1 m-1 px-2 mt-2"
                                                        onClick={() => submit(item.id, 'comissao')}>Salvar</button>
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
                                           value={(campoEditar === 'bonus' && data?.[item.id]?.valor) ? data?.[item.id]?.valor : item.bonus}
                                           InputProps={{
                                               startAdornment: <InputAdornment
                                                   position="start">R$</InputAdornment>
                                           }}
                                           onChange={e => {
                                               setData({
                                                   ...data,
                                                   [item.id]: {
                                                       ...data?.[item.id],
                                                       id: item.id,
                                                       valor: mascaraMoeda(e),
                                                   }
                                               })
                                               setIdEditar(item.id)
                                               setCampoEditar('bonus')
                                           }}/>
                                <br/>
                                <TextField type="date" className="mt-3" fullWidth
                                           label="Pagamento Realizado Dia"
                                           InputLabelProps={{shrink: true}}
                                           value={campoEditar === 'bonus' ? data?.[item.id]?.data : item.bonus_data}
                                           onChange={e => {
                                               setData({
                                                   ...data,
                                                   [item.id]: {
                                                       ...data?.[item.id],
                                                       id: item.id,
                                                       data: e.target.value,
                                                   }
                                               })
                                               setIdEditar(item.id)
                                               setCampoEditar('bonus')
                                           }}/>
                                <div className="row justify-content-between pt-3">
                                    <div className="col-auto">
                                        <Switch
                                            checked={(campoEditar === 'bonus' && (data?.[item.id]?.status)?.toString()) ? data?.[item.id]?.status : item.bonus_status}
                                            onChange={e => {
                                                setData({
                                                    ...data,
                                                    [item.id]: {
                                                        ...data?.[item.id],
                                                        id: item.id,
                                                        status: e.target.checked
                                                    }
                                                })
                                                setIdEditar(item.id)
                                                setCampoEditar('bonus')
                                            }}/>
                                        <small>{((campoEditar === 'bonus' && (data?.[item.id]?.status)?.toString()) ? data?.[item.id]?.status : item.bonus_status) ? 'Pago' : 'Aberto'}</small>
                                    </div>
                                    <div className="col-auto">
                                        {idEditar === item.id && campoEditar === 'bonus' &&
                                            <button className="btn btn-success btn-sm p-1 m-1 px-2 mt-2"
                                                    onClick={() => submit(item.id, 'bonus')}>Salvar</button>
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
