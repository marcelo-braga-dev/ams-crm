import LayoutAdmin from "@/Layouts/AdminLayout/LayoutAdmin";
import React, {useState} from "react";
import Switch from "@mui/material/Switch";
import {TextField} from "@mui/material";

export default function () {
    const [status, setStatus] = useState(false)
    const [alterarStatus, setAlterarStatus] = useState(false)

    return (
        <LayoutAdmin titlePage="Fluxo de Caixa" menu="financeiro" submenu="fluxo-caixa">
            <a className="btn btn-primary" href={route('admin.financeiro.fluxo-caixa.create')}>Cadastrar</a>
            <div className="row">
                <div className="col">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Data</th>
                            <th>Tipo</th>
                            <th>Fornecedor</th>
                            <th>Empresa</th>
                            <th>N° NF</th>
                            <th>Valor</th>
                            <th>Data Vencimento</th>
                            <th>Valor Baixa</th>
                            <th>Data Baixa</th>
                            <th>Banco</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className={status ? 'bg-success text-white' : (1 > 2 ? 'bg-danger text-white' : '')}>
                            <td>03/02/2024</td>
                            <td className="text-center">Entrada</td>
                            <td>Fornecedor 1</td>
                            <td>AMS 360</td>
                            <td>51512</td>
                            <td>R$ 52.365,01</td>
                            <td className="text-center">05/02/2024</td>
                            <td>R$ 53.225,00</td>
                            <td className="text-center">06/02/2024</td>
                            <td>Sicoob</td>
                            <td className="text-center">
                                <Switch checked={status} data-bs-toggle="modal" data-bs-target="#exampleModal"/>
                                {status ? 'Pago' : 'Aberto'}
                            </td>
                        </tr>
                        </tbody>
                    </table>
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
                            <TextField onChange={e => setAlterarStatus(e.target.value)}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" data-bs-dismiss="modal" className="btn btn-primary"
                                    disabled={alterarStatus !== 'ALTERAR'}
                                    onClick={() => setStatus(e => !e)}>Alterar Status
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutAdmin>
    )
}
