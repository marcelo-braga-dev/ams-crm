import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin";
import React, {useState} from "react";
import Switch from "@mui/material/Switch";
import {Card, TextField} from "@mui/material";
import {router} from "@inertiajs/react";

import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import {DateRange} from 'react-date-range';
import {ptBR} from 'react-date-range/src/locale';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import MenuItem from "@mui/material/MenuItem"; // theme css file
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ({dados, dataInicio, dataFim, tipo, status, fornecedor, fornecedores}) {
    const [chaveStatus, setChaveStatus] = useState()
    const [idStatus, setIdStatus] = useState()
    const [filtroTipo, setFiltoTipo] = useState(tipo)
    const [filtroStatus, setFiltoStatus] = useState(status)
    const [filtroFornecedor, setFiltoFornecedor] = useState(fornecedor)

    const alterarStatus = (status) => {
        router.post(route('admin.financeiro.fluxo-caixa.alterar-status', {id: idStatus, status: status}))
    }

    router.on('success', () => setChaveStatus(''))

    const [filtroData, setFiltroData] = useState()
    const [state, setState] = useState([
        {
            startDate: dataInicio ? new Date(dataInicio) : new Date,
            endDate: dataFim ? new Date(dataFim) : new Date,
            key: 'selection',
            color: '#102030'
        }
    ]);

    const atualizaFiltro = (event) => {
        router.get(route('admin.financeiro.fluxo-caixa.index',
            {
                periodoInicio: filtroData?.[0]?.startDate,
                periodoFim: filtroData?.[0]?.endDate,
                tipo: filtroTipo,
                status: filtroStatus,
                fornecedor: filtroFornecedor
            }))
    }

    const limparFiltroData = (event) => {
        router.get(route('admin.financeiro.fluxo-caixa.index'))
    }

    return (
        <LayoutAdmin titlePage="Fluxo de Caixa" menu="financeiro" submenu="fluxo-caixa" empty>
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

                            // onRangeFocusChange={e => filtroData(e)}

                            showDateDisplay={false}
                            locale={ptBR}
                            dateDisplayFormat="d/MM/yyyy"
                        />
                    </div>
                    <div className="col-3 align-items-center mt-3">
                        {dataInicio && <>
                            <span className="pb-3">
                                Filtro de {(new Date(dataInicio)).toLocaleDateString()} até {(new Date(dataFim)).toLocaleDateString()}
                            </span>

                        </>}
                        <TextField className="mb-3 mt-3" label="Tipo" select fullWidth
                                   value={filtroTipo ?? ''}
                                   onChange={e => setFiltoTipo(e.target.value)}>
                            <MenuItem value={undefined}>Todas</MenuItem>
                            <MenuItem value="entrada">Entrada</MenuItem>
                            <MenuItem value="saida">Saída</MenuItem>
                        </TextField>

                        <TextField className="mb-3" label="Status" select fullWidth
                                   value={filtroStatus ?? ''}
                                   onChange={e => setFiltoStatus(e.target.value)}>
                            <MenuItem value={undefined}>Todas</MenuItem>
                            <MenuItem value="pago">Pago</MenuItem>
                            <MenuItem value="aberto">Aberto</MenuItem>
                        </TextField>

                        <TextField label="Fornecedor" select fullWidth
                                   value={filtroFornecedor ?? ''}
                                   onChange={e => setFiltoFornecedor(e.target.value)}>
                            {fornecedores.map(item => <MenuItem value={item.id}>{item.valor}</MenuItem>)}
                        </TextField>

                        <div className="row mt-4">
                            <div className="col">
                                <button className="btn btn-outline-primary"
                                        onClick={() => atualizaFiltro()}>
                                    <SearchOutlinedIcon/> Filtrar
                                </button>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-link text-primary"
                                        onClick={() => limparFiltroData()}>Limpar filtro
                                </button>
                            </div>
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

            {dados.map(item =>
                <Card className="mb-4 shadow">
                    <div key={item.id}
                         className={'row p-3 ' +
                             (item.status === 'pago' ? '' : (item.tipo === 'entrada' ? 'text-success' : ' text-danger')) +
                             (item.atrasado ? ' bg-danger text-white' : '')
                         }>
                        <div className="col-1 text-center">
                            {item.tipo === 'entrada' ? <ArrowUpwardOutlinedIcon/> :
                                <ArrowDownwardOutlinedIcon/>}
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
                                <b>Franquia:</b>
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
                                <b>Vencimento:</b> {item.data_vencimento}
                            </span>
                            <span className="d-block">
                                <b>Prev. Recebimento:</b> {item.previsao_recebimento}
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


                    {/*<table className="table">*/}
                    {/*    <tbody>*/}
                    {/*    <tr key={item.id}*/}
                    {/*        className={*/}
                    {/*            item.status === 'pago' ? '' : (item.tipo === 'entrada' ? 'text-success' : ' text-danger') +*/}
                    {/*                (item.atrasado ? ' bg-danger text-white' : '')*/}
                    {/*        }>*/}
                    {/*        <td className="text-center col-1">*/}
                    {/*            {item.tipo === 'entrada' ? <ArrowUpwardOutlinedIcon/> :*/}
                    {/*                <ArrowDownwardOutlinedIcon/>}*/}
                    {/*            <small className="d-block">{item.tipo}</small>*/}
                    {/*            <FormControlLabel*/}
                    {/*                value="bottom"*/}
                    {/*                control={*/}
                    {/*                    <Switch checked={item.status === 'pago'} data-bs-toggle="modal"*/}
                    {/*                            className="mt-3"*/}
                    {/*                            onClick={() => setIdStatus(item.id)}*/}
                    {/*                            data-bs-target="#exampleModal"/>*/}
                    {/*                }*/}
                    {/*                label={<small>{item.status}</small>}*/}
                    {/*                className="text-muted"*/}
                    {/*                labelPlacement="bottom"*/}
                    {/*            />*/}
                    {/*        </td>*/}
                    {/*        <td className="cursor-pointer" style={{maxWidth: 100}}*/}
                    {/*            onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
                    {/*                <span className="d-block text-truncate">*/}
                    {/*                    <b>Data:</b> {item.data} <small className="ps-4"><b>ID: </b>[#{item.id}]</small>*/}
                    {/*                </span>*/}
                    {/*                <b>NF n°:</b> {item.nota_fiscal} <br/>*/}
                    {/*                <span className="d-block text-truncate">*/}
                    {/*                  <b>Fornecedor:</b> {item.fornecedor}*/}
                    {/*                </span>*/}
                    {/*                <span className="d-block text-truncate">*/}
                    {/*                  <b>Empresa:</b> {item.empresa}*/}
                    {/*                </span>*/}
                    {/*                <span className="d-block text-truncate">*/}
                    {/*                    <b>Banco:</b> {item.banco}*/}
                    {/*                </span>*/}
                    {/*                <span className="d-block">*/}
                    {/*                    <b>Franquia:</b>*/}
                    {/*                </span>*/}
                    {/*        </td>*/}
                    {/*        <td className="cursor-pointer" style={{maxWidth: 100}}*/}
                    {/*            onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
                    {/*                        <span className="mt-3 fs-6">*/}
                    {/*                        <b>R$ {item.valor}</b> <br/>*/}
                    {/*                        </span>*/}
                    {/*            <span className="mt-3">*/}
                    {/*                            <b>Parcela:</b> {item.qtd_parcelas} <br/>*/}
                    {/*                        </span>*/}
                    {/*            <span className="d-block">*/}
                    {/*                            <b>Vencimento:</b> {item.data_vencimento}*/}
                    {/*                        </span>*/}
                    {/*            <span className="d-block">*/}
                    {/*                            <b>Prev. Recebimento:</b> {item.previsao_recebimento}*/}
                    {/*                        </span>*/}
                    {/*        </td>*/}
                    {/*        <td className="cursor-pointer" style={{maxWidth: 100}}*/}
                    {/*            onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
                    {/*                        <span className="d-block">*/}
                    {/*                            Valor Baixa: {item.valor_baixa && <>R$ {item.valor_baixa}</>}*/}
                    {/*                        </span>*/}
                    {/*            <span className="d-block">*/}
                    {/*                            Data Baixa: {item.data_baixa}*/}
                    {/*                        </span>*/}
                    {/*        </td>*/}
                    {/*        <td className="cursor-pointer" style={{maxWidth: 100}}*/}
                    {/*            onClick={() => router.get(route('admin.financeiro.fluxo-caixa.show', item.id))}>*/}
                    {/*            <a className="btn btn-link btn-sm p-0"*/}
                    {/*               href={route('admin.financeiro.fluxo-caixa.show', item.id)}>*/}
                    {/*                <RemoveRedEyeOutlinedIcon/>*/}
                    {/*            </a>*/}
                    {/*        </td>*/}
                    {/*    </tr>*/}
                    {/*    </tbody>*/}
                    {/*</table>*/}
                </Card>
            )}

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
        </LayoutAdmin>
    )
}
