import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import "chart.js/auto";
import MetaVendas from "./Graficos/MetaVendas";
import Avatar from "@mui/material/Avatar";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import TopVendas from "@/Pages/Admin/Dashboard/Vendas/Graficos/TopVendas";
import VendasMensasPie from "@/Pages/Admin/Dashboard/Vendas/Graficos/VendasMensasPie";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import {router} from "@inertiajs/react";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import { isAdmin } from "@/Helpers/helper";

export default function ({
                             metaVendas,
                             metasVendasAnual,
                             mes,
                             ano,
                             setores,
                             setor
                         }) {
    function filtrar(mes, ano, setor) {
        router.get(route('admin.dashboard.vendas.index'), {mes: mes, ano: ano, setor: setor})
    }

    const admin = isAdmin()

    // const totalVendas = vendasMensais.map(item => item.valor)

    return (
        <Layout container titlePage="Indicadores de Vendas" menu="dashboard" submenu="dashboard-vendas">
            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Setor" select fullWidth defaultValue={setor}
                                   onChange={e => filtrar(mes, ano, e.target.value)}>
                            {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Mês" select fullWidth defaultValue={mes}
                                   onChange={e => filtrar(e.target.value, ano, setor)}>
                            <MenuItem value="1">Janeiro</MenuItem>
                            <MenuItem value="2">Fevereiro</MenuItem>
                            <MenuItem value="3">Março</MenuItem>
                            <MenuItem value="4">Abril</MenuItem>
                            <MenuItem value="5">Maio</MenuItem>
                            <MenuItem value="6">Junho</MenuItem>
                            <MenuItem value="7">Julho</MenuItem>
                            <MenuItem value="8">Agosto</MenuItem>
                            <MenuItem value="9">Setembro</MenuItem>
                            <MenuItem value="10">Outubro</MenuItem>
                            <MenuItem value="11">Novembro</MenuItem>
                            <MenuItem value="12">Dezembro</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Ano" select fullWidth defaultValue={ano}
                                   onChange={e => filtrar(mes, e.target.value, setor)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </TextField>
                    </div>
                </div>
            </div>

            {/*Cards*/}
            <div className="row row-cols-3 mb-4">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <Avatar sx={{bgcolor: 'red'}}>
                                        <AttachMoneyIcon/>
                                    </Avatar>
                                </div>
                                <div className="col-auto">
                                    <small className="">Vendas</small>
                                    <h5 className="text-end">R$ {convertFloatToMoney(metaVendas.totalVendas)}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <Avatar sx={{bgcolor: 'orange'}}>
                                        <TrendingUpIcon/>
                                    </Avatar>
                                </div>
                                <div className="col-auto">
                                    <small className="">Meta</small>
                                    <h5 className="text-end">R$ {convertFloatToMoney(metaVendas.totalMetas)}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-auto">
                                    <Avatar sx={{bgcolor: 'green'}}>
                                        <TimelineIcon/>
                                    </Avatar>
                                </div>
                                <div className="col-auto">
                                    <small className="">Diferença Vendas e Meta</small>
                                    <h5 className="text-end">R$ {convertFloatToMoney(metaVendas.totalVendas - metaVendas.totalMetas)}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <h6>Meta x Vendas</h6>
                    <div className="table-responsive">
                        <table className="table table-sm text-sm">
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Meta</th>
                                <th>Total Vendas</th>
                                <th className="text-center">Qtd. Vendas</th>
                                {admin && <th>Lucro Bruto</th>}
                                <th>Meta x Vendas</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {metaVendas.vendas.map((item, index) => {
                                const dif = item.vendas - item.meta
                                return (
                                    <tr key={index}
                                        className={(dif) > 0 ? 'text-success' : (dif < 0 ? 'text-danger' : '')}>
                                        <td className="text-dark"><b>{item.nome}</b></td>
                                        <td className="text-dark">R$ {convertFloatToMoney(item.meta)}</td>
                                        <td className="text-dark">R$ {convertFloatToMoney(item.vendas)}</td>
                                        <td className="text-dark text-center">{item.qtd}</td>
                                        {admin && <td className="text-dark">
                                            {item.lucro && <span>R$ {convertFloatToMoney(item.lucro)} (
                                            {convertFloatToMoney((item.vendas - item.custos) / item.custos * 100)}%)</span>}
                                        </td>}
                                        <td>
                                            R$ {convertFloatToMoney(item.vendas - item.meta)} (
                                            {convertFloatToMoney(((item.vendas - item.meta) / item.meta * 100) + 100)}%)
                                        </td>
                                        <td>
                                            <a className="btn btn-link text-dark btn-sm mb-0"
                                               href={route('admin.metas-vendas.vendas-faturadas.index', {
                                                   id: item.id,
                                                   mes: mes,
                                                   ano: ano
                                               })}>
                                                Ver Vendas
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                            <tr
                                className={'bg-light ' + ((metaVendas.totalVendas - metaVendas.totalMetas) > 0 ? 'text-success' : (metaVendas.totalVendas - metaVendas.totalMetas < 0 ? 'text-danger' : ''))}>
                                <td className="text-dark"><b>TOTAL</b></td>
                                <td className="text-dark">R$ {convertFloatToMoney(metaVendas.totalMetas)}</td>
                                <td className="text-dark">R$ {convertFloatToMoney(metaVendas.totalVendas)}</td>
                                <td className="text-center text-dark">{metaVendas.totalQtd}</td>
                                {admin && <td>
                                    R$ {convertFloatToMoney(metaVendas.totalVendas - metaVendas.totalCustos)}(
                                    {convertFloatToMoney((metaVendas.totalVendas - metaVendas.totalCustos) / metaVendas.totalCustos * 100)}%)
                                </td>}
                                <td>
                                    R$ {convertFloatToMoney(metaVendas.totalVendas - metaVendas.totalMetas)} (
                                    {convertFloatToMoney(((metaVendas.totalVendas - metaVendas.totalMetas) / metaVendas.totalMetas * 100) + 100)}%)
                                </td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="row">
                        <MetaVendas dados={metaVendas}/>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h6>Vendas Anuais</h6>
                            <VendasMensasPie dados={metasVendasAnual}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-body">
                            <h6>Vendas Anuais</h6>
                            <div className="table-responsive">
                                <table className="table table-sm text-sm">
                                    <thead>
                                    <tr>
                                        <th className="text-center">Mẽs</th>
                                        <th>Meta</th>
                                        <th>Vendas</th>
                                        <th>Meta x Vendas</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {metasVendasAnual.map(item => {
                                        const dif = item.total_vendas - item.total_metas
                                        return (
                                            <tr className={dif >= 0 ? 'text-success' : (item.total_vendas > 0 ? 'text-danger' : '')}>
                                                <td className="text-center text-dark"><b>{(item.mes).toUpperCase()}</b>
                                                </td>
                                                <td className="text-dark">R$ {convertFloatToMoney(item.total_metas)}</td>
                                                <td className="text-dark">R$ {convertFloatToMoney(item.total_vendas)}</td>
                                                <td>
                                                    R$ {item.total_vendas > 0 ? convertFloatToMoney(dif) : '0,00'} (
                                                        {convertFloatToMoney(((item.total_vendas - item.total_metas) / item.total_metas * 100) + 100)}%
                                                    )
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
