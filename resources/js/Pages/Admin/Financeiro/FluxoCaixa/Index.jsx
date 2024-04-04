import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
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
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import MenuItem from "@mui/material/MenuItem"; // theme css file
import FormControlLabel from '@mui/material/FormControlLabel';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';

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
    let totalSaida2 = 0

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

    return (
        <Layout titlePage="Fluxo de Caixa" menu="financeiro" submenu="fluxo-caixa" empty>
            <div className="card card-body mb-4">
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
                            ranges={state}
                            direction="horizontal"
                            showDateDisplay={false}
                            locale={ptBR}
                            dateDisplayFormat="d/MM/yyyy"
                        />
                    </div>
                    <div className="col-md-5 align-items-center mt-3">
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
                        <div className="row mt-4">
                            <div className="col">
                            </div>
                            <div className="col-auto">
                                <small className="cursor-pointer" onClick={() => limparFiltroData()}>Limpar
                                    filtro</small>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card card-body m-2">

                            <Stack direction="column" spacing={1} className="d-inline">
                                <ArrowUpwardOutlinedIcon color="success"/> ENTRADA:
                                R$ {convertFloatToMoney(totalEntrada)}<br/>
                                <ArrowDownwardOutlinedIcon color="error"/> TOTAL SAÍDA:
                                R$ {convertFloatToMoney(totalSaida)}<br/>
                            </Stack>

                        </div>

                    </div>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col">
                    <a className="btn btn-primary"
                       href={route('admin.financeiro.fluxo-caixa.create')}>
                        <AddOutlinedIcon/> Cadastrar</a>
                </div>
            </div>

            <Stack className="mb-3" direction="row" spacing={1}>
                <Chip variant="outlined"
                      label={'Período: ' + (filtroData?.[0] ? (
                              (new Date(filtroData?.[0]?.startDate)).toLocaleDateString() + (
                                  (filtroData?.[0]?.endDate !== filtroData?.[0]?.startDate) ?
                                      (' até ' + (new Date(filtroData?.[0]?.endDate)).toLocaleDateString()) : ''
                              )) : new Date().toLocaleDateString()
                      )}
                />
                <Chip label={'Tipo: ' + (filtroTipo ?? 'Todos')} variant="outlined"/>
                <Chip label={'Status: ' + (filtroStatus ?? 'Todos')} variant="outlined"/>
                <Chip variant="outlined"
                      label={'Fornec.: ' + (filtroFornecedor ? (fornecedores.filter(function (item) {
                          return (item.id === filtroFornecedor);
                      }))?.[0]?.valor : 'Todos')}/>
                <Chip variant="outlined"
                      label={'Franquia: ' + (filtroFranquia ? (franquias.filter(function (item) {
                          return (item.id === filtroFranquia);
                      }))?.[0]?.nome : 'Todos')}/>
            </Stack>

            {dias.map(dia =>
                <>
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
                                    <div className="col-1 text-center">
                                        {item.tipo === 'entrada' ? <ArrowUpwardOutlinedIcon color="success"/> :
                                            <ArrowDownwardOutlinedIcon color="error"/>}
                                        <small className="d-block">{item.tipo}</small>
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
                                    <div className="col-7 cursor-pointer"
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
                                    <div className="col-3 cursor-pointer"
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
                                    <div className="col-1 cursor-pointer"
                                         onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>
                                        <a className="btn btn-link btn-sm p-0"
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
                        const link = () => router.get(route('admin.financeiro.salarios.edit', item.user_id), { mes: item.mes})
                        return (
                            <Card key={item.id} className="mb-4 shadow"
                                  style={{
                                      borderLeft: '3px solid orange'
                                  }}>
                                <div
                                    className={'row p-3 ' +
                                        (item.status === 1 ? '' : (item.status === 1 ? 'text-success' : ' text-danger')) +
                                        (item.atrasado ? ' bg-danger text-white' : '')
                                    }>
                                    <div className="col-1 text-center">
                                        <LocalAtmOutlinedIcon/>
                                        <small className="d-block">Salário</small>
                                    </div>
                                    <div className="col-4 cursor-pointer"
                                         onClick={() => link()}>
                                        Nome: {item.nome}<br/>
                                        Data: {item.data}<br/>
                                    </div>
                                    <div className="col-6 cursor-pointer"
                                         onClick={() => link()}>
                                        Valor: R$ {convertFloatToMoney(item.valor) ?? '-'}<br/>
                                        Status: {item.status === 1 ? 'Pago' : 'Em Aberto'}
                                    </div>
                                    <div className="col cursor-pointer"
                                         onClick={() => link()}>
                                        <a className="btn btn-link btn-sm p-0">
                                            <RemoveRedEyeOutlinedIcon/>
                                        </a>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}

                    {registrosSalarios[dia] = []}
                </>
            )}


            {/*{dados.map((item, index)=> <div key={item.id}>*/}
            {/*        <Card className="mb-4 shadow"*/}
            {/*              style={{*/}
            {/*                  borderLeft: '3px solid ' + (item.tipo === 'entrada' ? 'green' : 'red')*/}
            {/*              }}>*/}
            {/*            <div key={item.id}*/}
            {/*                 className={'row p-3 ' +*/}
            {/*                     (item.status === 'pago' ? '' : (item.tipo === 'entrada' ? 'text-success' : ' text-danger')) +*/}
            {/*                     (item.atrasado ? ' bg-danger text-white' : '')*/}
            {/*                 }>*/}
            {/*                <div className="col-1 text-center">*/}
            {/*                    {item.tipo === 'entrada' ? <ArrowUpwardOutlinedIcon color="success"/> :*/}
            {/*                        <ArrowDownwardOutlinedIcon color="error"/>}*/}
            {/*                    <small className="d-block">{item.tipo}</small>*/}
            {/*                    <FormControlLabel*/}
            {/*                        value="bottom"*/}
            {/*                        control={*/}
            {/*                            <Switch checked={item.status === 'pago'} data-bs-toggle="modal"*/}
            {/*                                    className="mt-3"*/}
            {/*                                    onClick={() => setIdStatus(item.id)}*/}
            {/*                                    data-bs-target="#exampleModal"/>*/}
            {/*                        }*/}
            {/*                        label={<small>{item.status}</small>}*/}
            {/*                        className="text-muted"*/}
            {/*                        labelPlacement="bottom"*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*                <div className="col-7 cursor-pointer"*/}
            {/*                     onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
            {/*                <span className="d-blo ck text-truncate">*/}
            {/*                    <b>Data:</b> {item.data}*/}
            {/*                </span>*/}
            {/*                    <span className="d-b lock text-truncate ps-4">*/}
            {/*                    <b>NF n°:</b> {item.nota_fiscal}*/}
            {/*                </span>*/}
            {/*                    <span className="d-block text-truncate">*/}
            {/*                      <b>Fornecedor:</b> {item.fornecedor}*/}
            {/*                </span>*/}
            {/*                    <span className="d-block text-truncate">*/}
            {/*                      <b>Empresa:</b> {item.empresa}*/}
            {/*                </span>*/}
            {/*                    <span className="d-block text-truncate">*/}
            {/*                        <b>Banco:</b> {item.banco}*/}
            {/*                </span>*/}
            {/*                    <span className="d-block">*/}
            {/*                    <b>Franquia:</b> {item.franquia}*/}
            {/*                </span>*/}
            {/*                </div>*/}
            {/*                <div className="col-3 cursor-pointer"*/}
            {/*                     onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
            {/*                <span className="mt-3 fs-6">*/}
            {/*                    <b>R$ {item.valor}</b> <br/>*/}
            {/*                </span>*/}
            {/*                    <span className="mt-3">*/}
            {/*                    <b>Parcela:</b> {item.qtd_parcelas} <br/>*/}
            {/*                </span>*/}
            {/*                    <span className="d-block">*/}
            {/*                    <b>Valor Baixa:</b> {item.valor_baixa && <>R$ {item.valor_baixa}</>}*/}
            {/*                </span>*/}
            {/*                    <span className="d-block">*/}
            {/*                    <b>Data Baixa:</b> {item.data_baixa}*/}
            {/*                </span>*/}
            {/*                </div>*/}
            {/*                <div className="col-1 cursor-pointer"*/}
            {/*                     onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
            {/*                    <a className="btn btn-link btn-sm p-0"*/}
            {/*                       href={route('admin.financeiro.fluxo-caixa.show', item.id)}>*/}
            {/*                        <RemoveRedEyeOutlinedIcon/>*/}
            {/*                    </a>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </Card>*/}

            {/*        /!*Salario*!/*/}
            {/*        {registrosSalarios?.[item._data]?.map(item => {*/}
            {/*            return (*/}
            {/*                <Card key={item.id} className="mb-4 shadow"*/}
            {/*                      style={{*/}
            {/*                          borderLeft: '3px solid orange'*/}
            {/*                      }}>*/}
            {/*                    <div*/}
            {/*                        className={'row p-3 ' +*/}
            {/*                            (item.status === 1 ? '' : (item.status === 1 ? 'text-success' : ' text-danger')) +*/}
            {/*                            (item.atrasado ? ' bg-danger text-white' : '')*/}
            {/*                        }>*/}
            {/*                        <div className="col-1 text-center">*/}
            {/*                            <LocalAtmOutlinedIcon/>*/}
            {/*                            <small className="d-block">Salário</small>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-4 cursor-pointer"*/}
            {/*                             onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
            {/*                            Nome: {item.nome}<br/>*/}
            {/*                            Data: {item.data}<br/>*/}
            {/*                        </div>*/}
            {/*                        <div className="col-6 cursor-pointer"*/}
            {/*                             onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
            {/*                            Valor: R$ {convertFloatToMoney(item.valor) ?? '-'}<br/>*/}
            {/*                            Status: {item.status === 1 ? 'Pago' : 'Em Aberto'}*/}
            {/*                        </div>*/}
            {/*                        <div className="col cursor-pointer"*/}
            {/*                             onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
            {/*                            /!*<a className="btn btn-link btn-sm p-0"*!/*/}
            {/*                            /!*   href={route('admin.financeiro.fluxo-caixa.show', item.id)}>*!/*/}
            {/*                            /!*    <RemoveRedEyeOutlinedIcon/>*!/*/}
            {/*                            /!*</a>*!/*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                </Card>*/}
            {/*            )*/}
            {/*        })}*/}

            {/*        {registrosSalarios[item._data] = []}*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*Modal*/}
            <div className="modal fade mt-6" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
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
