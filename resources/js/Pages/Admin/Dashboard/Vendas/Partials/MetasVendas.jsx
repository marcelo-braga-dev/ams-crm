import {Stack} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import * as React from "react";

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import {useState} from "react";

export default function MetasVendas({vendasUsuarios, metasUsuariosComp, vendasUsuariosComp, metasUsuarios, vendasMetasComp, vendasTotal, vendasMetas, admin, mes, ano}) {

    const [camposVisivel, setCamposVisivel] = useState(false);

    return (
        <div className="table-responsive">
            <table className="table-1 table-sm border-0">
                <thead>
                <tr>
                    <th>Nome</th>
                    {vendasUsuariosComp.length === 0 ? '' : <th style={{width: 80}}></th>}
                    <th>Meta</th>
                    <th>Total Vendas</th>
                    <th className="text-center">Qtd. Vendas</th>
                    <th>Meta x Vendas</th>
                    {admin &&
                        <th onClick={() => setCamposVisivel(e => !e)}>
                            Lucro Bruto {camposVisivel
                            ? <VisibilityOutlinedIcon className="cursor-pointer" fontSize="small"/>
                            : <VisibilityOffOutlinedIcon className="cursor-pointer" fontSize="small"/>}
                        </th>}
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {vendasUsuarios?.map((item, index) => {
                    const meta = metasUsuarios?.[item.id]
                    const vendasComp = vendasUsuariosComp?.[item.id]?.vendas

                    const metasComp = metasUsuariosComp?.[item.id]
                    const qtdComp = vendasUsuariosComp?.[item.id]?.qtd
                    const lucroComp = vendasUsuariosComp?.[item.id]?.lucro
                    const custosComp = vendasUsuariosComp?.[item.id]?.custos

                    const dif = item.vendas - meta
                    const difComp = vendasComp - metasComp

                    const margemDif = (dif / meta * 100) + 100
                    const margemDifCom = (difComp / metasComp * 100) + 100

                    const difMeta = Math.abs(dif) - Math.abs(difComp)
                    const difMetaMargem = Math.abs(margemDif) - Math.abs(margemDifCom)

                    const margemLucro = item.lucro / item.custos * 100
                    const margemLucroComp = lucroComp / custosComp * 100

                    const difLucro = Math.abs(item.lucro) - Math.abs(lucroComp)
                    const difLucroMargem = Math.abs(margemLucro) - Math.abs(margemLucroComp)

                    return (
                        <tr key={index}>
                            <td className="text-dark">
                                <Stack direction="row" spacing={1}>
                                    <Avatar src={item.foto} sx={{width: 24, height: 24}}/>
                                    <b>{item.status ? item.nome : <del> {item.nome}</del>}</b>
                                </Stack>
                            </td>
                            {vendasUsuariosComp.length === 0 ? '' :
                                <td className="col-1">
                                    Referência:
                                    <span className="d-block border-top border-bottom">Comparar:</span>
                                    <span>Diferença:</span>
                                </td>}
                            <td className="text-dark">
                                {item.status ? <span>R$ {convertFloatToMoney(meta)}</span> : '-'}
                                {metasComp && <>
                                    <span className="d-block border-top border-bottom">R$ {convertFloatToMoney(metasComp)}</span>
                                    R$ {convertFloatToMoney(meta - metasComp)}
                                </>}
                            </td>
                            <td className="text-dark">
                                R$ {convertFloatToMoney(item.vendas)}
                                {vendasComp && <>
                                    <span className="d-block border-top border-bottom">R$ {convertFloatToMoney(vendasComp)}</span>
                                    R$ {convertFloatToMoney(item.vendas - vendasComp)}
                                </>}
                            </td>
                            <td className="text-center text-dark">
                                {item.qtd}
                                {qtdComp && <>
                                    <span className="d-block border-top border-bottom">{qtdComp}</span>
                                    {item.qtd - qtdComp}
                                </>}
                            </td>
                            <td>
                                {item.status ?
                                    <span className={(dif) > 0 ? 'text-success' : (dif < 0 ? 'text-danger' : '')}>
                                        R$ {convertFloatToMoney(dif)} ({convertFloatToMoney(margemDif)}%)
                                    </span> : '-'}
                                {!!difComp && <>
                                    <span className={"d-block border-top border-bottom " + ((difComp) > 0 ? 'text-success' : (difComp < 0 ? 'text-danger' : ''))}>
                                        R$ {convertFloatToMoney(difComp)} ({convertFloatToMoney(margemDifCom)}%)</span>
                                    <span className={"d-block " + (difMeta > 0 ? 'text-success' : (difMeta < 0 ? 'text-danger' : ''))}>
                                        R$ {convertFloatToMoney(difMeta)} ({convertFloatToMoney(difMetaMargem)}%)</span>
                                </>}
                            </td>
                            {admin && <td className="text-dark">
                                {item.lucro && camposVisivel &&
                                    <span>R$ {convertFloatToMoney(item.lucro)} ({convertFloatToMoney(margemLucro)}%)</span>}
                                {lucroComp && camposVisivel && <>
                                    <span className="d-block border-top border-bottom">
                                        R$ {convertFloatToMoney(lucroComp)} ({convertFloatToMoney(margemLucroComp)}%)</span>
                                    <span className={"d-block " + (difLucro > 0 ? 'text-success' : (difLucro < 0 ? 'text-danger' : ''))}>
                                        R$ {convertFloatToMoney(difLucro)}
                                    </span>
                                </>
                                }
                            </td>}
                            <td>
                                <a className="mb-0 btn btn-link text-dark btn-sm"
                                   href={route('admin.metas-vendas.vendas-faturadas.index', {id: item.id, mes: mes, ano: ano})}>
                                    Ver Pedidos
                                </a>
                            </td>
                        </tr>
                    )
                })}
                <tr
                    className={'bg-light ' + ((vendasTotal.vendas - vendasMetas?.totalMetas) > 0 ? 'text-success' : (vendasTotal.vendas - vendasMetas?.totalMetas < 0 ? 'text-danger' : ''))}>
                    <td className="text-dark"><b>TOTAL</b></td>
                    {vendasUsuariosComp.length === 0 ? '' : <td style={{width: 80}}></td>}
                    <td className="text-dark">
                        R$ {convertFloatToMoney(vendasMetas?.totalMetas)}
                        {vendasMetasComp && <span
                            className="d-block">R$ {convertFloatToMoney(vendasMetasComp?.totalMetas)}</span>}
                    </td>
                    <td className="text-dark">
                        R$ {convertFloatToMoney(vendasTotal.vendas)}
                        {vendasMetasComp && <span
                            className="d-block">R$ {convertFloatToMoney(vendasMetasComp?.totalVendas)}</span>}
                    </td>
                    <td className="text-center text-dark">
                        {vendasTotal.qtd}
                        {vendasMetasComp &&
                            <span className="d-block">{vendasMetasComp?.totalQtd}</span>}
                    </td>
                    <td>
                        R$ {convertFloatToMoney(vendasTotal.vendas - vendasMetas?.totalMetas)} (
                        {convertFloatToMoney(((vendasTotal.vendas - vendasMetas?.totalMetas) / vendasMetas?.totalMetas * 100) + 100)}%)
                        {vendasMetasComp &&
                            <span
                                className="d-block">R$ {convertFloatToMoney(vendasMetasComp?.totalVendas - vendasMetasComp?.totalMetas)} (
                                {convertFloatToMoney(((vendasMetasComp?.totalVendas - vendasMetasComp?.totalMetas) / vendasMetasComp?.totalMetas * 100) + 100)}%)
                                                </span>
                        }
                    </td>
                    {admin && <td className="text-dark">
                        {camposVisivel && <span>R$ {convertFloatToMoney(vendasTotal.lucro)} ({convertFloatToMoney(vendasTotal.lucro / vendasTotal.custos * 100)}%)</span>}
                        {vendasMetasComp && camposVisivel &&
                            <span className="d-block">R$ {convertFloatToMoney(vendasMetasComp?.totalVendas - vendasMetasComp?.totalCustos)} (
                                {convertFloatToMoney((vendasMetasComp?.totalVendas - vendasMetasComp?.totalCustos) / vendasMetasComp?.totalCustos * 100)}%)</span>}
                    </td>}
                    <td></td>
                </tr>

                </tbody>
            </table>
        </div>
    )
}
