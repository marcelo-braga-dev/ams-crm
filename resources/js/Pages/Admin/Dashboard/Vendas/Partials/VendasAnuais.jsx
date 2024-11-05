import convertFloatToMoney from "@/Helpers/converterDataHorario";
import * as React from "react";
import VendasMensasGrafico from "@/Pages/Admin/Dashboard/Vendas/Graficos/VendasMensasGrafico";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {useState} from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTitle from "@/Components/Cards/CardTitle";
import CardBody from "@/Components/Cards/CardBody";
import {BarChartLine} from "react-bootstrap-icons";
import Checkbox from "@mui/material/Checkbox";
import {Typography} from "@mui/material";

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
        <CardContainer>
            <CardTitle title="Vendas Anuais" icon={<BarChartLine size="22"/>}/>
            <CardBody>
                <VendasMensasGrafico dados={vendasMetasAnual} vendasAnual={vendasAnual} metasEmpresas={metasEmpresas}/>

                <div className="table-responsive">
                    <table className="table-1 table-sm border-0 mt-2">
                        <thead>
                        <tr>
                            <th className="text-center">Mẽs</th>
                            <th className="text-center" style={{width: 1}}>Ref.</th>
                            <th className="text-center" style={{width: 1}}>Comp.</th>
                            <th>Alcançado</th>
                            <th>Meta Vendedores</th>
                            <th>Meta do Setor</th>
                            <th>Meta Vendedores x Alcançado</th>
                            <th>Meta Setor x Alcançado</th>
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
                                        <Typography>{(item.mes).toUpperCase()}</Typography>
                                    </td>
                                    <td className="text-center">
                                        <Checkbox
                                            size="small"
                                            onChange={e => setMesesVisivelA({...mesesVisivelA, [item.mes]: e.target.checked})}/>
                                    </td>
                                    <td className="text-center">
                                        <Checkbox
                                            size="small"
                                            onChange={e => setMesesVisivelB({...mesesVisivelB, [item.mes]: e.target.checked})}/>
                                    </td>
                                    <td>{<Typography>R$ {convertFloatToMoney(alcancado)}</Typography>}</td>
                                    <td>{<Typography>R$ {convertFloatToMoney(item.total_metas)}</Typography>}</td>
                                    <td>{<Typography>R$ {convertFloatToMoney(metaEmpresa)}</Typography>}</td>
                                    <td className={dif >= 0 ? 'text-success' : (alcancado > 0 ? 'text-danger' : '')}>
                                        {alcancado > 0 ? <Typography>R$ {convertFloatToMoney(dif)} ({convertFloatToMoney(margem)}%)</Typography> : '-'}
                                    </td>
                                    <td className={difEmpresa >= 0 ? 'text-success' : (alcancado > 0 ? 'text-danger' : '')}>
                                        {(alcancado > 0 && metaEmpresa > 0)
                                            ? <Typography>R$ {convertFloatToMoney(difEmpresa)} ({convertFloatToMoney(margemEmpresa)}%)</Typography>
                                            : '-'}
                                    </td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className="text-center"><Typography variant="body2">TOTAL REF.</Typography></td>
                            <td></td>
                            <td></td>
                            <td><Typography>R$ {convertFloatToMoney(alcancadoAnoTotal)}</Typography></td>
                            <td><Typography>R$ {convertFloatToMoney(metaAnoTotal)}</Typography></td>
                            <td><Typography>R$ {convertFloatToMoney(metaAnoEmpresaTotal)}</Typography></td>
                            <td className={difTotal > 0 ? 'text-success' : (alcancadoAnoTotal > 0 ? 'text-danger' : '')}>
                                <Typography>R$ {alcancadoAnoTotal > 0
                                    ? <>{convertFloatToMoney(difTotal)} ({convertFloatToMoney(margemMetasVendasTotal + 100)}%)</>
                                    : '0,00'}</Typography>
                            </td>
                            <td className={difTotalEmpresa > 0 ? 'text-success' : (alcancadoAnoTotal > 0 ? 'text-danger' : '')}>
                                <Typography>R$ {alcancadoAnoTotal > 0
                                    ? <>{convertFloatToMoney(difTotalEmpresa)} ({convertFloatToMoney(margemMetasVendasTotalEmpresa + 100)}%)</>
                                    : '0,00'}</Typography>
                            </td>
                        </tr>

                        <tr>
                            <td className="text-center"><Typography variant="body2">TOTAL COMP.</Typography></td>
                            <td></td>
                            <td></td>
                            <td><Typography>R$ {convertFloatToMoney(alcancadoAnoTotalB)}</Typography></td>
                            <td><Typography>R$ {convertFloatToMoney(metaAnoTotalB)}</Typography></td>
                            <td><Typography>R$ {convertFloatToMoney(metaAnoEmpresaTotalB)}</Typography></td>
                            <td className={difTotalB > 0 ? 'text-success' : (alcancadoAnoTotalB > 0 ? 'text-danger' : '')}>
                                <Typography>R$ {alcancadoAnoTotalB > 0
                                    ? <>{convertFloatToMoney(difTotalB)} ({convertFloatToMoney(margemMetasVendasTotalB + 100)}%)</>
                                    : '0,00'}</Typography>
                            </td>
                            <td className={difTotalEmpresaB > 0 ? 'text-success' : (alcancadoAnoTotalB > 0 ? 'text-danger' : '')}>
                                <Typography>R$ {alcancadoAnoTotalB > 0
                                    ? <>{convertFloatToMoney(difTotalEmpresaB)} ({convertFloatToMoney(margemMetasVendasTotalEmpresaB + 100)}%)</>
                                    : '0,00'}</Typography>
                            </td>
                        </tr>
                        {[0].map(item => {
                            const difAB = Math.abs(difTotal) - Math.abs(difTotalB)
                            const difABEmpresa = Math.abs(difTotalEmpresa) - Math.abs(difTotalEmpresaB)
                            const difMargemEmprsa = margemMetasVendasTotalEmpresaB - margemMetasVendasTotalEmpresa
                            const difMargem = margemMetasVendasTotalB - margemMetasVendasTotal
                            const alcancado = alcancadoAnoTotal - alcancadoAnoTotalB

                            return (
                                <tr key={1}>
                                    <td className="text-center"><Typography variant="body2">DIF REF. e COMP.</Typography></td>
                                    <td></td>
                                    <td></td>
                                    <td className={alcancado > 0 ? 'text-success' : alcancado < 0 ? 'text-danger' : ''}>
                                        <Typography>R$ {convertFloatToMoney(alcancado)}</Typography>
                                    </td>
                                    <td className="text-dark"><Typography>R$ {convertFloatToMoney(metaAnoTotal - metaAnoTotalB)}</Typography></td>
                                    <td className="text-dark"><Typography>R$ {convertFloatToMoney(metaAnoEmpresaTotal - metaAnoEmpresaTotalB)}</Typography></td>
                                    <td className={difAB > 0 ? 'text-success' : difAB < 0 ? 'text-danger' : ''}>
                                        <Typography>R$ {difAB !== 0 ? <>{convertFloatToMoney(difAB)} ({convertFloatToMoney(difMargem)}%)</> : '0,00'}</Typography>
                                    </td>
                                    <td className={difABEmpresa > 0 ? 'text-success' : difABEmpresa < 0 ? 'text-danger' : ''}>
                                        <Typography>R$ {difABEmpresa !== 0 ?
                                            <>{convertFloatToMoney(difABEmpresa)} ({convertFloatToMoney(difMargemEmprsa)}%)</> : '0,00'}</Typography>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </CardContainer>
    )
}
