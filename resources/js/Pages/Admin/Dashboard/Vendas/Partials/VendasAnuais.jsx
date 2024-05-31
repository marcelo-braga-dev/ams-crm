import convertFloatToMoney from "@/Helpers/converterDataHorario";
import * as React from "react";
import VendasMensasGrafico from "@/Pages/Admin/Dashboard/Vendas/Graficos/VendasMensasGrafico";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {useState} from "react";

const meses = {jan: 0, fev: 0, mar: 0, abr: 0, mai: 0, jun: 0, jul: 0, ago: 0, set: 0, out: 0, nov: 0, dez: 0}

export default function VendasAnuais({vendasMetasAnual, vendasAnual, metasEmpresas,}) {
    let metaAnoTotal = 0, metaAnoEmpresaTotal = 0,
        alcancadoAnoTotal = 0, difTotal = 0, difTotalEmpresa = 0,
        margemMetasVendasTotal = 0, margemMetasVendasTotalEmpresa = 0

    let metaAnoTotalB = 0, metaAnoEmpresaTotalB = 0,
        alcancadoAnoTotalB = 0, difTotalB = 0, difTotalEmpresaB = 0,
        margemMetasVendasTotalB = 0, margemMetasVendasTotalEmpresaB = 0

    const [mesesVisivelA, setMesesVisivelA] = useState(meses)
    const [mesesVisivelB, setMesesVisivelB] = useState(meses)

    return (
        <div className="card card-body mb-4">
            <h6>Vendas Anuais</h6>
            <VendasMensasGrafico dados={vendasMetasAnual} vendasAnual={vendasAnual} metasEmpresas={metasEmpresas}/>
            <div className="row mt-4">
                <div className="col">
                    <div className="table-responsive">
                        <table className="table text-sm table-sm table-stripe d table-bordered">
                            <thead>
                            <tr>
                                <td className="text-center">Mẽs</td>
                                <td className="text-center">A</td>
                                <td className="text-center">B</td>
                                <td>Alcançado</td>
                                <td>Meta Vendedores</td>
                                <td>Meta do Setor</td>
                                <td>Meta Vendedores x Alcançado</td>
                                <td>Meta Setor x Alcançado</td>
                            </tr>
                            </thead>
                            <tbody>
                            {vendasMetasAnual.map((item, index) => {
                                const alcancado = vendasAnual?.[index + 1]?.vendas ?? 0
                                const dif = alcancado ? (alcancado - (item.total_metas ?? 0)) : 0
                                const margem = ((alcancado - item.total_metas) / item.total_metas * 100) + 100

                                const metaEmpresa = metasEmpresas?.[index + 1] ?? 0
                                const difEmpresa = (alcancado && metaEmpresa) ? (alcancado - metaEmpresa) : 0
                                const margemEmpresa = ((alcancado - metaEmpresa) / metaEmpresa * 100) + 100

                                if (mesesVisivelA?.[item.mes]) {
                                    metaAnoTotal += item.total_metas ?? 0
                                    metaAnoEmpresaTotal += metaEmpresa
                                    alcancadoAnoTotal += alcancado ?? 0
                                    difTotal += dif
                                    difTotalEmpresa += difEmpresa
                                    margemMetasVendasTotal += margem > 100 ? margem : (-margem)
                                    margemMetasVendasTotalEmpresa += margemEmpresa > 100 ? margemEmpresa : (-margemEmpresa)
                                }

                                if (mesesVisivelB?.[item.mes]) {
                                    metaAnoTotalB += item.total_metas ?? 0
                                    metaAnoEmpresaTotalB += metaEmpresa
                                    alcancadoAnoTotalB += alcancado ?? 0
                                    difTotalB += dif
                                    difTotalEmpresaB += difEmpresa
                                    margemMetasVendasTotalB += margem > 100 ? margem : (-margem)
                                    margemMetasVendasTotalEmpresaB += margemEmpresa > 100 ? margemEmpresa : (-margemEmpresa)
                                }

                                return (
                                    <tr key={index}>
                                        <td className="text-center">
                                            <b>{(item.mes).toUpperCase()} </b>
                                        </td>
                                        <td className="text-center">
                                            {mesesVisivelA?.[item.mes]
                                                ? <VisibilityOutlinedIcon fontSize="small" className="cursor-pointer"
                                                                          onClick={() => setMesesVisivelA({...mesesVisivelA, [item.mes]: 0})}/>
                                                : <VisibilityOffOutlinedIcon fontSize="small" className="cursor-pointer"
                                                                             onClick={() => setMesesVisivelA({...mesesVisivelA, [item.mes]: 1})}/>}
                                        </td>
                                        <td className="text-center">
                                            {mesesVisivelB?.[item.mes]
                                                ? <VisibilityOutlinedIcon
                                                    fontSize="small" className="cursor-pointer"
                                                    onClick={() => setMesesVisivelB({...mesesVisivelB, [item.mes]: 0})}/>
                                                : <VisibilityOffOutlinedIcon
                                                    fontSize="small" className="cursor-pointer"
                                                    onClick={() => setMesesVisivelB({...mesesVisivelB, [item.mes]: 1})}/>}
                                        </td>
                                        <td>{<span>R$ {convertFloatToMoney(alcancado)}</span>}</td>
                                        <td>{<span>R$ {convertFloatToMoney(item.total_metas)}</span>}</td>
                                        <td>{<span>R$ {convertFloatToMoney(metaEmpresa)}</span>}</td>
                                        <td className={dif >= 0 ? 'text-success' : (alcancado > 0 ? 'text-danger' : '')}>
                                            {<span>
                                            {alcancado > 0 ? <span>R$ {convertFloatToMoney(dif)} ({convertFloatToMoney(margem)}%)</span> : '-'}
                                            </span>}
                                        </td>
                                        <td className={difEmpresa >= 0 ? 'text-success' : (alcancado > 0 ? 'text-danger' : '')}>
                                            {<span>
                                            {(alcancado > 0 && metaEmpresa > 0)
                                                ? <span>R$ {convertFloatToMoney(difEmpresa)} ({convertFloatToMoney(margemEmpresa)}%)</span>
                                                : '-'}
                                            </span>}
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td className="text-center text-dark"><b>TOTAL A</b></td>
                                <td></td>
                                <td></td>
                                <td className="text-dark">R$ {convertFloatToMoney(alcancadoAnoTotal)}</td>
                                <td className="text-dark">R$ {convertFloatToMoney(metaAnoTotal)}</td>
                                <td className="text-dark">R$ {convertFloatToMoney(metaAnoEmpresaTotal)}</td>
                                <td className={difTotal > 0 ? 'text-success' : (alcancadoAnoTotal > 0 ? 'text-danger' : '')}>
                                    R$ {alcancadoAnoTotal > 0
                                    ? <span>{convertFloatToMoney(difTotal)} ({convertFloatToMoney(margemMetasVendasTotal + 100)}%)</span>
                                    : '0,00'}
                                </td>
                                <td className={difTotalEmpresa > 0 ? 'text-success' : (alcancadoAnoTotal > 0 ? 'text-danger' : '')}>
                                    R$ {alcancadoAnoTotal > 0
                                    ? <span>{convertFloatToMoney(difTotalEmpresa)} ({convertFloatToMoney(margemMetasVendasTotalEmpresa + 100)}%)</span>
                                    : '0,00'}
                                </td>
                            </tr>

                            <tr>
                                <td className="text-center text-dark"><b>TOTAL B</b></td>
                                <td></td>
                                <td></td>
                                <td className="text-dark">R$ {convertFloatToMoney(alcancadoAnoTotalB)}</td>
                                <td className="text-dark">R$ {convertFloatToMoney(metaAnoTotalB)}</td>
                                <td className="text-dark">R$ {convertFloatToMoney(metaAnoEmpresaTotalB)}</td>
                                <td className={difTotalB > 0 ? 'text-success' : (alcancadoAnoTotalB > 0 ? 'text-danger' : '')}>
                                    R$ {alcancadoAnoTotalB > 0
                                    ? <span>{convertFloatToMoney(difTotalB)} ({convertFloatToMoney(margemMetasVendasTotalB + 100)}%)</span>
                                    : '0,00'}
                                </td>
                                <td className={difTotalEmpresaB > 0 ? 'text-success' : (alcancadoAnoTotalB > 0 ? 'text-danger' : '')}>
                                    R$ {alcancadoAnoTotalB > 0
                                    ? <span>{convertFloatToMoney(difTotalEmpresaB)} ({convertFloatToMoney(margemMetasVendasTotalEmpresaB + 100)}%)</span>
                                    : '0,00'}
                                </td>
                            </tr>
                            {[0].map(item => {
                                const difAB = Math.abs(difTotal) - Math.abs(difTotalB)
                                const difABEmpresa = Math.abs(difTotalEmpresa) - Math.abs(difTotalEmpresaB)
                                const difMargemEmprsa = margemMetasVendasTotalEmpresaB - margemMetasVendasTotalEmpresa
                                const difMargem = margemMetasVendasTotalB - margemMetasVendasTotal

                                return (
                                    <tr>
                                        <td className="text-center text-dark"><b>DIF A e B</b></td>
                                        <td></td>
                                        <td></td>
                                        <td className="text-dark">R$ {convertFloatToMoney(alcancadoAnoTotal - alcancadoAnoTotalB)}</td>
                                        <td className="text-dark">R$ {convertFloatToMoney(metaAnoTotal - metaAnoTotalB)}</td>
                                        <td className="text-dark">R$ {convertFloatToMoney(metaAnoEmpresaTotal - metaAnoEmpresaTotalB)}</td>
                                        <td className={difAB > 0 ? 'text-success' : difAB < 0 ? 'text-danger' : ''}>
                                            R$ {difAB !== 0 ? <span>{convertFloatToMoney(difAB)} ({convertFloatToMoney(difMargem)}%)</span> : '0,00'}
                                        </td>
                                        <td className={difABEmpresa > 0 ? 'text-success' : difABEmpresa < 0 ? 'text-danger' : ''}>
                                            R$ {difABEmpresa !== 0 ? <span>{convertFloatToMoney(difABEmpresa)} ({convertFloatToMoney(difMargemEmprsa)}%)</span> : '0,00'}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                        <small className="d-block">
                            Meses Selecionados em <b>A</b> = {
                            Object.keys(mesesVisivelA).map(item => !!mesesVisivelA[item] && <span key={item}>{item.toUpperCase()}, </span>)}
                        </small>
                        <small>
                            Meses Selecionados em <b>B</b> = {
                            Object.keys(mesesVisivelB).map(item => !!mesesVisivelB[item] && <span key={item}>{item.toUpperCase()}, </span>)}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    )
}
