import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin";
import React, {useState} from "react";
import Switch from "@mui/material/Switch";
import {TextField} from "@mui/material";
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


export default function ({dados, dataInicio, dataFim, tipo, status}) {
    const [chaveStatus, setChaveStatus] = useState()
    const [idStatus, setIdStatus] = useState()
    const [filtroTipo, setFiltoTipo] = useState(tipo)
    const [filtroStatus, setFiltoStatus] = useState(status)

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
            {periodoInicio: filtroData?.[0]?.startDate, periodoFim: filtroData?.[0]?.endDate, tipo: filtroTipo, status: filtroStatus}))
    }

    const limparFiltroData = (event) => {
        router.get(route('admin.financeiro.fluxo-caixa.index'))
    }

    return (
        <LayoutAdmin titlePage="Fluxo de Caixa" menu="financeiro" submenu="fluxo-caixa">
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
                        <TextField label="Status" select fullWidth
                                   value={filtroStatus ?? ''}
                        onChange={e => setFiltoStatus(e.target.value)}>
                            <MenuItem value={undefined}>Todas</MenuItem>
                            <MenuItem value="pago">Pago</MenuItem>
                            <MenuItem value="aberto">Aberto</MenuItem>
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

            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col">
                        <a className="btn btn-primary"
                           href={route('admin.financeiro.fluxo-caixa.create')}>
                            <AddOutlinedIcon/> Cadastrar</a>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>ID</th>
                                    <th>Data</th>
                                    <th>Tipo</th>
                                    <th>Status</th>
                                    <th>Fornecedor</th>
                                    <th>Empresa</th>
                                    <th>N° NF</th>
                                    <th>Valor</th>
                                    <th>Data Vencimento</th>
                                    <th>Valor Baixa</th>
                                    <th>Data Baixa</th>
                                    <th>Banco</th>
                                </tr>
                                </thead>
                                <tbody>
                                {dados.map(item =>
                                    <tr key={item.id}
                                        className={
                                            item.status === 'pago' ? 'text-info' : (item.tipo === 'entrada' ? 'text-success' : ' text-danger') +
                                                (item.atrasado ? ' bg-danger text-white' : '')
                                        }>
                                        <td className="text-center">
                                            <a className="btn btn-link btn-sm p-0"
                                               href={route('admin.financeiro.fluxo-caixa.show', item.id)}>
                                                <RemoveRedEyeOutlinedIcon/>
                                            </a>
                                        </td>
                                        <td className="text-center">#{item.id}</td>
                                        <td>{item.data}</td>
                                        <td className="text-center">
                                            {item.tipo === 'entrada' ? <ArrowUpwardOutlinedIcon/> :
                                                <ArrowDownwardOutlinedIcon/>}
                                        </td>
                                        <td className="text-center">
                                            <Switch checked={item.status === 'pago'} data-bs-toggle="modal"
                                                    onClick={() => setIdStatus(item.id)}
                                                    data-bs-target="#exampleModal"/>
                                            {item.status}
                                        </td>
                                        <td>
                                        <span className="d-inline-block text-truncate" style={{maxWidth: 200}}>
                                          {item.fornecedor}
                                        </span>
                                        </td>
                                        <td>
                                        <span className="d-inline-block text-truncate" style={{maxWidth: 200}}>
                                          {item.empresa}
                                        </span>
                                        </td>
                                        <td>{item.nota_fiscal}</td>
                                        <td>R$ {item.valor}</td>
                                        <td className="text-center">{item.data_vencimento}</td>
                                        <td>{item.valor_baixa && <>R$ {item.valor_baixa}</>}</td>
                                        <td className="text-center">{item.data_baixa}</td>
                                        <td>{item.banco}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

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
