import convertFloatToMoney from "@/Helpers/converterDataHorario";
import * as React from "react";
import VendasMensasGrafico from "@/Pages/Admin/Dashboard/Vendas/Graficos/VendasMensasGrafico";

export default function VendasAnuais({vendasMetasAnual, vendasAnual, metasEmpresas,}) {
    let metaAnoTotal = 0, metaAnoEmpresaTotal = 0,
        alcancadoAnoTotal = 0, difTotal = 0, difTotalEmpresa = 0,
        margemMetasVendasTotal = 0, margemMetasVendasTotalEmpresa = 0

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

                                metaAnoTotal += item.total_metas ?? 0
                                metaAnoEmpresaTotal += metaEmpresa
                                alcancadoAnoTotal += alcancado ?? 0
                                difTotal += dif
                                difTotalEmpresa += difEmpresa
                                margemMetasVendasTotal += margem > 100 ? margem : (-margem)
                                margemMetasVendasTotalEmpresa += margemEmpresa > 100 ? margemEmpresa : (-margemEmpresa)
                                console.log(dif)
                                return (
                                    <tr key={index}>
                                        <td className="text-center text-dark"><b>{(item.mes).toUpperCase()}</b></td>
                                        <td className="text-dark">R$ {convertFloatToMoney(alcancado)}</td>
                                        <td className="text-dark">R$ {convertFloatToMoney(item.total_metas)}</td>
                                        <td className="text-dark">R$ {convertFloatToMoney(metaEmpresa)}</td>
                                        <td className={dif >= 0 ? 'text-success' : (alcancado > 0 ? 'text-danger' : '')}>
                                            {alcancado > 0 ? <span>R$ {convertFloatToMoney(dif)} ({convertFloatToMoney(margem)}%)</span> : '-'}
                                        </td>
                                        <td className={difEmpresa >= 0 ? 'text-success' : (alcancado > 0 ? 'text-danger' : '')}>
                                            {(alcancado > 0 && metaEmpresa > 0)
                                                ? <span>R$ {convertFloatToMoney(difEmpresa)} ({convertFloatToMoney(margemEmpresa)}%)</span>
                                                : '-'}
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr>
                                <td className="text-center text-dark"><b>TOTAL</b></td>
                                <td className="text-dark">R$ {convertFloatToMoney(alcancadoAnoTotal)}</td>
                                <td className="text-dark">R$ {convertFloatToMoney(metaAnoTotal)}</td>
                                <td className="text-dark">R$ {convertFloatToMoney(metaAnoEmpresaTotal)}</td>
                                <td className={difTotal >= 0 ? 'text-success' : (alcancadoAnoTotal > 0 ? 'text-danger' : '')}>
                                    R$ {alcancadoAnoTotal > 0 ? convertFloatToMoney(difTotal) : '0,00'} (
                                    {convertFloatToMoney(margemMetasVendasTotal + 100)}%)
                                </td>
                                <td className={difTotalEmpresa >= 0 ? 'text-success' : (alcancadoAnoTotal > 0 ? 'text-danger' : '')}>
                                    R$ {alcancadoAnoTotal > 0 ? convertFloatToMoney(difTotalEmpresa) : '0,00'} (
                                    {convertFloatToMoney(margemMetasVendasTotalEmpresa + 100)}%)
                                </td>
                            </tr>
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    )
}
