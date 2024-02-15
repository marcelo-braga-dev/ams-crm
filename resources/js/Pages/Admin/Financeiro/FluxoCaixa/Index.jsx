import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin";
import React, {useState} from "react";
import Switch from "@mui/material/Switch";
import {TextField} from "@mui/material";
import {router} from "@inertiajs/react";

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

export default function ({dados}) {
    const [chaveStatus, setChaveStatus] = useState()
    const [idStatus, setIdStatus] = useState()
    const alterarStatus = (status) => {
        router.post(route('admin.financeiro.fluxo-caixa.alterar-status', {id: idStatus, status: status}))
    }

    router.on('success', () => setChaveStatus(''))

    return (
        <LayoutAdmin titlePage="Fluxo de Caixa" menu="financeiro" submenu="fluxo-caixa">
            <a className="btn btn-primary" href={route('admin.financeiro.fluxo-caixa.create')}>Cadastrar</a>
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
                                    className={(item.tipo === 'entrada' ? 'text-success' : 'text-danger') + (item.atrasado ? ' bg-danger text-white' : '')}>
                                    <td className="text-center">
                                        <a className="btn btn-link btn-sm p-0"
                                           href={route('admin.financeiro.fluxo-caixa.show', item.id)}>
                                            <RemoveRedEyeOutlinedIcon />
                                        </a>
                                    </td>
                                    <td className="text-center">#{item.id}</td>
                                    <td>{item.data}</td>
                                    <td className="text-center">{item.tipo}</td>
                                    <td className="text-center">
                                        <Switch checked={item.status === 'pago'} data-bs-toggle="modal"
                                                onClick={() => setIdStatus(item.id)}
                                                data-bs-target="#exampleModal"/>
                                        {item.status}
                                    </td>
                                    <td className="text-wrap">{item.fornecedor}</td>
                                    <td>{item.empresa}</td>
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
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
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
