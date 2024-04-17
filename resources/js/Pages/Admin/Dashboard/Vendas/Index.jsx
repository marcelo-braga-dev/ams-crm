import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import "chart.js/auto";
import MetaVendas from "./Graficos/MetaVendas";
import Avatar from "@mui/material/Avatar";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import TopVendas from "@/Pages/Admin/Dashboard/Vendas/Graficos/TopVendas";
import VendasMensasPie from "@/Pages/Admin/Dashboard/Vendas/Graficos/VendasMensasPie";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import { isAdmin } from "@/Helpers/helper";

import * as React from 'react';
import axios from "axios";
import LinearProgress from '@mui/material/LinearProgress';
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples";

export default function ({ mes, ano, setores, setor }) {
    const [mesesSelecionado, setMesesSelecionado] = useState([mes]);
    const [anoSelecionado, setAnoSelecionado] = useState(ano);
    const [setorSelecionado, setSetorSelecionado] = useState([setor]);

    const [vendasMetas, setVendasMetas] = useState([]);
    const [vendasMetasAnual, setVendasMetasAnual] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [filtrar, setFiltrar] = useState(false);

    const admin = isAdmin()



    const handleChange = (event) => {
        const { target: { value } } = event;
        setMesesSelecionado(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(function () {
        setCarregando(true)
        axios.get(route('admin.dashboard.vendas.registros', { mes: mesesSelecionado, ano: anoSelecionado, setor: setorSelecionado }))
            .then(res => {
                setVendasMetas(res.data.vedas_metas)
                setVendasMetasAnual(res.data.vedas_metas_anual)
                setCarregando(false)
            })
    }, [filtrar])

    return (
        <Layout container titlePage="Indicadores de Vendas" menu="dashboard" submenu="dashboard-vendas">
            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Setor" select fullWidth defaultValue={setor}
                            onChange={e => setSetorSelecionado(e.target.value)}>
                            {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-2">
                        <SelectMesesMultiples value={mesesSelecionado} onChange={handleChange} />
                    </div>
                    <div className="col-2">
                        <TextField label="Ano" select fullWidth defaultValue={ano}
                            onChange={e => setAnoSelecionado(e.target.value)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary btn-sm"
                            onClick={() => setFiltrar(e => !e)}>Filtrar</button>
                    </div>
                </div>
            </div>
            {carregando ? <LinearProgress /> : <>
                {/*Cards*/}
                <div className="row row-cols-3 mb-4">
                    <div className="col">
                        <div className="card">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-auto">
                                        <Avatar sx={{ bgcolor: 'red' }}>
                                            <AttachMoneyIcon />
                                        </Avatar>
                                    </div>
                                    <div className="col-auto">
                                        <small className="">Vendas</small>
                                        <h5 className="text-end">R$ {convertFloatToMoney(vendasMetas?.totalVendas)}</h5>
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
                                        <Avatar sx={{ bgcolor: 'orange' }}>
                                            <TrendingUpIcon />
                                        </Avatar>
                                    </div>
                                    <div className="col-auto">
                                        <small className="">Meta</small>
                                        <h5 className="text-end">R$ {convertFloatToMoney(vendasMetas?.totalMetas)}</h5>
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
                                        <Avatar sx={{ bgcolor: 'green' }}>
                                            <TimelineIcon />
                                        </Avatar>
                                    </div>
                                    <div className="col-auto">
                                        <small className="">Diferença Vendas e Meta</small>
                                        <h5 className="text-end">R$ {convertFloatToMoney(vendasMetas?.totalVendas - vendasMetas?.totalMetas)}</h5>
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
                                    {vendasMetas?.vendas?.map((item, index) => {
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
                                        className={'bg-light ' + ((vendasMetas?.totalVendas - vendasMetas?.totalMetas) > 0 ? 'text-success' : (vendasMetas?.totalVendas - vendasMetas?.totalMetas < 0 ? 'text-danger' : ''))}>
                                        <td className="text-dark"><b>TOTAL</b></td>
                                        <td className="text-dark">R$ {convertFloatToMoney(vendasMetas?.totalMetas)}</td>
                                        <td className="text-dark">R$ {convertFloatToMoney(vendasMetas?.totalVendas)}</td>
                                        <td className="text-center text-dark">{vendasMetas?.totalQtd}</td>
                                        {admin && <td>
                                            R$ {convertFloatToMoney(vendasMetas?.totalVendas - vendasMetas?.totalCustos)}(
                                            {convertFloatToMoney((vendasMetas?.totalVendas - vendasMetas?.totalCustos) / vendasMetas?.totalCustos * 100)}%)
                                        </td>}
                                        <td>
                                            R$ {convertFloatToMoney(vendasMetas?.totalVendas - vendasMetas?.totalMetas)} (
                                            {convertFloatToMoney(((vendasMetas?.totalVendas - vendasMetas?.totalMetas) / vendasMetas?.totalMetas * 100) + 100)}%)
                                        </td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="row">
                            <MetaVendas dados={vendasMetas} />
                        </div>
                    </div>
                </div>

                <div className="row mb-4">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <h6>Vendas Anuais</h6>
                                <VendasMensasPie dados={vendasMetasAnual} />
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
                                            {vendasMetasAnual.map((item, index) => {
                                                const dif = item.total_vendas - item.total_metas
                                                return (
                                                    <tr key={index} className={dif >= 0 ? 'text-success' : (item.total_vendas > 0 ? 'text-danger' : '')}>
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
            </>}
        </Layout>
    )
}
