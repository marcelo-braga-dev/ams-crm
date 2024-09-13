import Layout from "@/Layouts/Layout";
import React, {useEffect, useState} from "react";
import Switch from "@mui/material/Switch";
import {Card, TextField} from "@mui/material";
import {router} from "@inertiajs/react";

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

import {DateRange} from 'react-date-range';
import {ptBR} from 'react-date-range/src/locale';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from '@mui/material/FormControlLabel';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardEntradaFinanceiro from "./Components/CardEntradaFinanceiro.jsx";

export default function ({fornecedores, franquias, empresas}) {
    const [dados, setDados] = useState([])
    const [registrosSalarios, setRegistrosSalarios] = useState([])
    const [chaveStatus, setChaveStatus] = useState()
    const [idStatus, setIdStatus] = useState()
    const [filtroTipo, setFiltoTipo] = useState()
    const [filtroStatus, setFiltoStatus] = useState()
    const [filtroFornecedor, setFiltoFornecedor] = useState()
    const [filtroFranquia, setFiltoFranquia] = useState()
    const [filtroEmpresa, setFiltoEmpresa] = useState()
    const [atualizarStatus, setAtualizarStatus] = useState(false)

    const [totalSaida, setTotalSaida] = useState(0)
    const [totalEntrada, setTotalEntrada] = useState(0)

    const alterarStatus = (status) => {
        axios.post(route('admin.financeiro.fluxo-caixa.alterar-status', {id: idStatus, status: status}))
        setChaveStatus(undefined)
        setAtualizarStatus(res => !res)
    }

    router.on('success', () => window.location.reload())

    const [filtroData, setFiltroData] = useState()
    const [state, setState] = useState([
        {
            startDate: new Date,
            endDate: new Date,
            key: 'selection',
            color: '#102030'
        }
    ]);

    useEffect(() => {
        axios.get(route('admin.financeiro.registros',
            {
                periodoInicio: filtroData?.[0]?.startDate,
                periodoFim: filtroData?.[0]?.endDate,
                tipo: filtroTipo,
                status: filtroStatus,
                fornecedor: filtroFornecedor,
                franquia: filtroFranquia,
                empresa: filtroEmpresa,
            }))
            .then(res => {
                setDados(res.data.registros)
                setRegistrosSalarios(res.data.salarios.registros)

                setTotalEntrada(0)
                setTotalSaida(0)

                Object.values(res.data.registros).map(a => a.map(item => (item.tipo === 'entrada') ?
                    setTotalEntrada(prevState => prevState + item.valor_float) :
                    setTotalSaida(prevState => prevState + item.valor_float)))

                setTotalSaida(prevState => prevState + res.data.salarios.total)
            })
    }, [filtroData, filtroTipo, filtroStatus, filtroFornecedor, filtroFranquia, filtroEmpresa, atualizarStatus]);

    const limparFiltroData = (event) => {
        router.get(route('admin.financeiro.fluxo-caixa.index'))
    }

    const itemsFornecedor = fornecedores.map(item => {
        return {label: item.valor, id: item.id}
    })

    const dias = Array.from({length: 31}, (_, i) => i + 1);
    let fluxo = 0

    return (
        <Layout titlePage="Fluxo de Caixa" menu="financeiro" submenu="fluxo-caixa">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-auto">
                            <DateRange
                                onChange={item => {
                                    setFiltroData([item.selection])
                                    setState([item.selection])
                                }}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={1}
                                scroll={{ enabled: true }}
                                ranges={state}
                                direction="vertical"
                                minDate={new Date('2023-01-01')}
                                maxDate={new Date('2026-01-01')}
                                showDateDisplay={false}
                                locale={ptBR}
                                dateDisplayFormat="d/MM/yyyy"
                            />
                        </div>
                        <div className="mt-3 col-md-4 align-items-center">
                            <div className="row row-cols-2">
                                <div className="col">
                                    <TextField className="mb-3" label="Tipo" select fullWidth
                                               value={filtroTipo ?? ''}
                                               onChange={e => setFiltoTipo(e.target.value)}>
                                        <MenuItem value={undefined}>Todas</MenuItem>
                                        <MenuItem value="entrada">Entrada</MenuItem>
                                        <MenuItem value="saida">Saída</MenuItem>
                                    </TextField>
                                </div>
                                <div className="col">
                                    <TextField className="mb-3" label="Status" select fullWidth
                                               value={filtroStatus ?? ''}
                                               onChange={e => setFiltoStatus(e.target.value)}>
                                        <MenuItem value={undefined}>Todas</MenuItem>
                                        <MenuItem value="pago">Pago</MenuItem>
                                        <MenuItem value="aberto">Aberto</MenuItem>
                                    </TextField></div>
                                <div className="col">
                                    <Autocomplete
                                        className="mb-3" disablePortal
                                        options={itemsFornecedor}
                                        onChange={(event, newValue) => setFiltoFornecedor(newValue?.id)}
                                        renderInput={(params) => <TextField {...params} label="Fornecedor:"/>}
                                    />
                                </div>
                                <div className="col">
                                    <TextField label="Franquia" select fullWidth
                                               value={filtroFranquia ?? ''}
                                               onChange={e => setFiltoFranquia(e.target.value)}>
                                        <MenuItem value={undefined}>Todas</MenuItem>
                                        {franquias.map(item => <MenuItem key={item.id}
                                                                         value={item.id}>{item.nome}</MenuItem>)}
                                    </TextField>
                                </div>
                                <div className="col">
                                    <TextField label="Empresa" select fullWidth
                                               value={filtroEmpresa ?? ''}
                                               onChange={e => setFiltoEmpresa(e.target.value)}>
                                        <MenuItem value={undefined}>Todas</MenuItem>
                                        {empresas.map(item => <MenuItem key={item.id}
                                                                        value={item.id}>{item.valor}</MenuItem>)}
                                    </TextField>
                                </div>
                            </div>
                            <div className="mt-4 row">
                                <div className="col">
                                </div>
                                <div className="col-auto">
                                    <small className="cursor-pointer" onClick={() => limparFiltroData()}>Limpar filtro</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <div className="mb-2 row justify-content-ce nter">
                        <div className="col-auto">
                            <Stack direction="column" spacing={1} className="d-inline">
                                <ArrowUpwardOutlinedIcon color="success"/> ENTRADAS:
                                R$ {convertFloatToMoney(totalEntrada)}<br/>
                            </Stack>
                        </div>
                        <div className="col-auto">
                            <Stack direction="column" spacing={1} className="d-inline">
                                <ArrowDownwardOutlinedIcon color="error"/> TOTAL SAÍDAS:
                                R$ {convertFloatToMoney(totalSaida)}<br/>
                            </Stack>
                        </div>
                    </div>

                    <div className="row justify-content-end">
                        <div className="col-auto text-end">
                            <Stack className="" direction="row" spacing={2}>
                                <small>
                                    {'Período: ' + (filtroData?.[0] ? (
                                            (new Date(filtroData?.[0]?.startDate)).toLocaleDateString() + (
                                                (filtroData?.[0]?.endDate !== filtroData?.[0]?.startDate) ?
                                                    (' até ' + (new Date(filtroData?.[0]?.endDate)).toLocaleDateString()) : ''
                                            )) : new Date().toLocaleDateString()
                                    )}
                                </small>
                                <small>|</small>
                                <small>{'Tipo: ' + (filtroTipo ?? 'Todos')}</small>
                                <small>|</small>
                                <small>{'Status: ' + (filtroStatus ?? 'Todos')}</small>
                                <small>|</small>
                                <small>{'Fornec.: ' + (filtroFornecedor ? (fornecedores.filter(function (item) {
                                    return (item.id === filtroFornecedor);
                                }))?.[0]?.valor : 'Todos')}</small>
                                <small>|</small>
                                <small>{'Franquia: ' + (filtroFranquia ? (franquias.filter(function (item) {
                                    return (item.id === filtroFranquia);
                                }))?.[0]?.nome : 'Todos')}</small>
                            </Stack>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <div className="mb-3 row">
                <div className="col">
                    <a className="btn btn-primary"
                       href={route('admin.financeiro.fluxo-caixa.create')}>
                        <AddOutlinedIcon/> Cadastrar</a>
                </div>
            </div>

            {/*<CardEntradaFinanceiro/>*/}

            {dias.map((dia, index) => {
                    fluxo = 1
                    return (
                        <div key={index}>
                            {dados?.[dia]?.map((item) =>
                                <div key={item.id}>
                                    <Card className="mb-4 shadow"
                                          style={{
                                              borderLeft: '3px solid ' + (item.tipo === 'entrada' ? 'green' : 'red')
                                          }}>
                                        <div key={item.id}
                                             className={'row p-3 ' +
                                                 (item.status === 'pago' ? '' : (item.tipo === 'entrada' ? 'text-success' : ' text-danger')) +
                                                 (item.atrasado ? ' bg-danger text-white' : '')
                                             }>
                                            <div className="pt-4 text-center col">
                                                {item.tipo === 'entrada' ? <ArrowUpwardOutlinedIcon color="success"/> :
                                                    <ArrowDownwardOutlinedIcon color="error"/>}
                                                <small className="d-block">{item.tipo}</small>
                                            </div>
                                            <div className="col-auto text-center">
                                                <FormControlLabel
                                                    value="bottom"
                                                    control={
                                                        <Switch checked={item.status === 'pago'} data-bs-toggle="modal"
                                                                className="mt-3"
                                                                onClick={() => setIdStatus(item.id)}
                                                                data-bs-target="#exampleModal"/>
                                                    }
                                                    label={<small>{item.status}</small>}
                                                    className="text-muted"
                                                    labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="cursor-pointer col-6"
                                                 onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>
                                            <span className="d-blo ck text-truncate">
                                                <b>Data:</b> {item.data}
                                            </span>
                                                <span className="d-b lock text-truncate ps-4">
                                                <b>NF n°:</b> {item.nota_fiscal}
                                            </span>
                                                <span className="d-block text-truncate">
                                                <b>Fornecedor:</b> {item.fornecedor}
                                            </span>
                                                <span className="d-block text-truncate">
                                                <b>Empresa:</b> {item.empresa}
                                            </span>
                                                <span className="d-block text-truncate">
                                                <b>Banco:</b> {item.banco}
                                            </span>
                                                <span className="d-block">
                                                <b>Franquia:</b> {item.franquia}
                                            </span>
                                            </div>
                                            <div className="cursor-pointer col-3"
                                                 onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>
                                            <span className="mt-3 fs-6">
                                                <b>R$ {item.valor}</b> <br/>
                                            </span>
                                                <span className="mt-3">
                                                <b>Parcela:</b> {item.qtd_parcelas} <br/>
                                            </span>
                                                <span className="d-block">
                                                <b>Valor Baixa:</b> {item.valor_baixa && <>R$ {item.valor_baixa}</>}
                                            </span>
                                                <span className="d-block">
                                                <b>Data Baixa:</b> {item.data_baixa}
                                            </span>
                                            </div>
                                            <div className="cursor-pointer col"
                                                 onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>
                                                <a className="p-0 btn btn-link btn-sm"
                                                   href={route('admin.financeiro.fluxo-caixa.show', item.id)}>
                                                    <RemoveRedEyeOutlinedIcon/>
                                                </a>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )}

                            {/*Salario*/}
                            {registrosSalarios?.[dia]?.map(item => {
                                const link = () => router.get(route('admin.financeiro.salarios.index', item.user_id), {mes: item.mes})
                                return (
                                    <Card key={item.id} className="mb-4 shadow"
                                          style={{
                                              borderLeft: '3px solid orange'
                                          }}>
                                        <div
                                            className={'row p-3 ' +
                                                (item.status === 1 ? '' : (item.status === "1" ? 'text-success' : ' text-danger')) +
                                                (item.atrasado ? ' bg-danger text-white' : '')
                                            }>
                                            <div className="pt-4 text-center col">
                                                <LocalAtmOutlinedIcon/>
                                                <small className="d-block">{item.tipo}</small>
                                            </div>
                                            <div className="col-auto text-center">
                                                <FormControlLabel
                                                    control={
                                                        <Switch checked={item.status === '1'} data-bs-toggle="modal"
                                                                className="mt-3"
                                                                onClick={() => setIdStatus(item.id)}
                                                                data-bs-target="#exampleModal"/>
                                                    }
                                                    label={<small>{item.status === '1' ? 'Pago' : 'Aberto'}</small>}
                                                    className="text-muted" labelPlacement="bottom"
                                                />
                                            </div>
                                            <div className="cursor-pointer col-4"
                                                 onClick={() => link()}>
                                                Nome: {item.nome}<br/>
                                                Data Pagamento: {item.data}<br/>
                                            </div>
                                            <div className="cursor-pointer col-5"
                                                 onClick={() => link()}>
                                                Valor: R$ {convertFloatToMoney(item.valor) ?? '-'}<br/>
                                                Status: {item.status === "1" ? 'Pago' : 'Em Aberto'}
                                            </div>
                                            <div className="cursor-pointer col"
                                                 onClick={() => link()}>
                                                <a className="p-0 btn btn-link btn-sm">
                                                    <RemoveRedEyeOutlinedIcon/>
                                                </a>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}

                            {registrosSalarios[dia] = []}
                        </div>
                    )
                }
            )}

            {/*Modal*/}
            <div className="mt-6 modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Digite "ALTERAR" para atualizar o Status:<br/>
                            <TextField value={chaveStatus ?? ''} onChange={e => setChaveStatus(e.target.value)}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar
                            </button>
                            <button type="button" data-bs-dismiss="modal" className="btn btn-primary"
                                    disabled={chaveStatus !== 'ALTERAR'}
                                    onClick={() => alterarStatus('pago')}>
                                Alterar Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
