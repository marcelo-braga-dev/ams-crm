import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import "chart.js/auto";
import MetaVendas from "./Graficos/MetaVendas";
import Avatar from "@mui/material/Avatar";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import TopVendas from "@/Pages/Admin/Dashboard/Vendas/Graficos/TopVendas";
import VendasAnuais from "@/Pages/Admin/Dashboard/Vendas/Graficos/VendasMensasPie";
import {Stack, TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import {router} from "@inertiajs/react";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {converterMes, isAdmin} from "@/Helpers/helper";

import * as React from 'react';
import axios from "axios";
import LinearProgress from '@mui/material/LinearProgress';
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples";
import VendasEstadosGrafico from "./Graficos/VendasEstadosGrafico";
import MetasVendas from "@/Pages/Admin/Dashboard/Vendas/Partials/MetasVendas";

export default function ({mes, ano, setores, setor}) {
    const [vendasUsuarios, setVendasUsuarios] = useState([]);
    const [vendasUsuariosComp, setVendasUsuariosComp] = useState([]);
    const [vendasTotal, setVendasTotal] = useState([]);
    const [vendasAnual, setVendasAnual] = useState([]);
    const [metasUsuarios, setMetasUsuarios] = useState([]);
    const [metasUsuariosComp, setMetasUsuariosComp] = useState([]);

    const [mesesSelecionado, setMesesSelecionado] = useState([mes]);
    const [anoSelecionado, setAnoSelecionado] = useState(ano);
    const [setorSelecionado, setSetorSelecionado] = useState([setor]);
    const [mesesSelecionadoComp, setMesesSelecionadoComp] = useState([]);
    const [anoSelecionadoComp, setAnoSelecionadoComp] = useState();

    const [vendasMetas, setVendasMetas] = useState([]);
    const [metasEmpresas, setMetasEmpresas] = useState([]);
    const [vendasMetasAnual, setVendasMetasAnual] = useState([]);
    const [vendasMetasComp, setVendasMetasComp] = useState([]);
    const [vendasMetasAnualComp, setVendasMetasAnualComp] = useState([]);
    const [vendasEstados, setVendasEstados] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [filtrar, setFiltrar] = useState(false);

    const admin = isAdmin()

    let metaAnoTotal = 0, metaAnoEmpresaTotal = 0, alcancadoAnoTotal = 0, difMetasVendasTotal = 0, margemMetasVendasTotal = 0

    useEffect(function () {
        setCarregando(true)
        axios.get(route('admin.dashboard.vendas.registros',
            {
                mes: mesesSelecionado,
                ano: anoSelecionado,
                setor: setorSelecionado,
                mesComp: mesesSelecionadoComp,
                anoComp: anoSelecionadoComp
            }))
            .then(res => {
                setVendasUsuarios(res.data.vendas.usuarios)
                setVendasUsuariosComp(res.data.vedas_comp.usuarios)

                setVendasTotal(res.data.vendas.total)
                setVendasAnual(res.data.vendas_anual)

                setMetasUsuarios(res.data.metas_usuarios)
                setMetasUsuariosComp(res.data.metas_usuarios_comp)
                //
                setVendasMetas(res.data.vedas_metas)
                setVendasMetasAnual(res.data.vedas_metas_anual)
                setVendasMetasComp(res.data.vedas_metas_comp)
                setVendasMetasAnualComp(res.data.vedas_metas_anual_comp)
                setVendasEstados(res.data.vendas_estados)
                setMetasEmpresas(res.data.meta_anual_empresa)
                setCarregando(false)
            })
    }, [filtrar])

    return (
        <Layout titlePage="Indicadores de Vendas" menu="dashboard" submenu="dashboard-vendas">
            <div className="mb-4 card card-body">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Setor" select fullWidth defaultValue={setor}
                                   onChange={e => setSetorSelecionado(e.target.value)}>
                            {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-2">
                        <SelectMesesMultiples value={mesesSelecionado} useState={setMesesSelecionado}/>
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
                                onClick={() => setFiltrar(e => !e)}>Filtrar
                        </button>
                    </div>
                </div>
                <div className="mt-2 row">
                    <div className="col-2">
                    </div>
                    <div className="col-2">
                        <SelectMesesMultiples value={mesesSelecionadoComp} label="Comparar Meses"
                                              useState={setMesesSelecionadoComp}/>
                    </div>
                    <div className="col-2">
                        <TextField label="Comparar Ano" select fullWidth
                                   onChange={e => setAnoSelecionadoComp(e.target.value)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </TextField>
                    </div>
                </div>
            </div>
            {carregando ? <LinearProgress/> : <>
                {/*Cards*/}
                <div className="mb-4 row row-cols-4">
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
                                        <h6 className="text-end">R$ {convertFloatToMoney(vendasTotal.vendas)}</h6>
                                        {vendasMetasComp?.totalVendas &&
                                            <h6 className="text-end">R$ {convertFloatToMoney(vendasMetasComp?.totalVendas)}</h6>}
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
                                        <small className="">Meta de Vendas</small>
                                        <h6 className="text-end">R$ {convertFloatToMoney(vendasMetas?.totalMetas)}</h6>
                                        {vendasMetasComp?.totalMetas &&
                                            <h6 className="text-end">R$ {convertFloatToMoney(vendasMetasComp?.totalMetas)}</h6>}
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
                                        <Avatar sx={{bgcolor: 'blue'}}>
                                            <AccountBalanceOutlinedIcon/>
                                        </Avatar>
                                    </div>
                                    <div className="col-auto">
                                        <small className="">Meta de Vendas da Empresa</small>
                                        <h6>R$ {convertFloatToMoney(metasEmpresas?.[mes])}</h6>
                                        {vendasMetasComp?.totalMetas &&
                                            <h6>R$ {convertFloatToMoney(vendasMetasComp?.totalMetas)}</h6>}
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
                                        <small className="">Vendas x Meta</small>
                                        <h6 className="text-end">
                                            R$ {convertFloatToMoney(vendasTotal.vendas - vendasMetas?.totalMetas)} (
                                            {convertFloatToMoney(((vendasTotal.vendas - vendasMetas?.totalMetas) / vendasMetas?.totalMetas * 100) + 100)}%)
                                        </h6>
                                        {vendasMetasComp?.totalMetas &&
                                            <h6 className="text-end">R$ {convertFloatToMoney(vendasMetasComp?.totalVendas - vendasMetasComp?.totalMetas)}
                                            </h6>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-4 card">
                    <div className="card-body">
                        <h6>Meta x Vendas</h6>
                        <MetasVendas
                            metasUsuarios={metasUsuarios} vendasMetasComp={vendasMetasComp} vendasUsuariosComp={vendasUsuariosComp}
                            vendasTotal={vendasTotal} vendasMetas={vendasMetas} vendasUsuarios={vendasUsuarios}
                            metasUsuariosComp={metasUsuariosComp} admin={admin} mes={mesesSelecionado?.[0]} ano={ano} />

                        <div className="row">
                            <MetaVendas vendasUsuarios={vendasUsuarios} metasUsuarios={metasUsuarios}
                                        vendasUsuariosComp={vendasUsuariosComp} metasUsuariosComp={metasUsuariosComp}/>
                        </div>
                    </div>
                </div>

                <div className="mb-4 row">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <h6>Vendas Anuais</h6>
                                <VendasAnuais dados={vendasMetasAnual} vendasAnual={vendasAnual} metasEmpresas={metasEmpresas}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="card">
                            <div className="card-body">
                                <h6>Vendas Anuais</h6>
                                <div className="table-responsive">
                                    <table className="table text-sm table-sm">
                                        <thead>
                                        <tr>
                                            <th className="text-center">Mẽs</th>
                                            <th>Meta Vendas</th>
                                            <th>Meta Empresa</th>
                                            <th>Alcançado</th>
                                            <th>Meta x Vendas</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {vendasMetasAnual.map((item, index) => {
                                            const alcancado = vendasAnual?.[index + 1]?.vendas ?? 0
                                            const dif = alcancado - (item.total_metas ?? 0)
                                            const margem = ((alcancado - item.total_metas) / item.total_metas * 100) + 100

                                            metaAnoTotal += item.total_metas ?? 0
                                            metaAnoEmpresaTotal += (metasEmpresas?.[index + 1] ?? 0)
                                            alcancadoAnoTotal += alcancado ?? 0
                                            difMetasVendasTotal += dif
                                            margemMetasVendasTotal += margem > 100 ? margem : (-margem)

                                            return (
                                                <tr key={index}
                                                    className={dif >= 0 ? 'text-success' : (alcancado > 0 ? 'text-danger' : '')}>
                                                    <td className="text-center text-dark">
                                                        <b>{(item.mes).toUpperCase()}</b>
                                                    </td>
                                                    <td className="text-dark">R$ {convertFloatToMoney(item.total_metas)}</td>
                                                    <td className="text-dark">R$ {convertFloatToMoney(metasEmpresas?.[index + 1])}</td>
                                                    <td className="text-dark">R$ {convertFloatToMoney(alcancado)}</td>
                                                    <td>
                                                        R$ {alcancado > 0 ? convertFloatToMoney(dif) : '0,00'} (
                                                        {convertFloatToMoney(margem)}%
                                                        )
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        <tr
                                            className={difMetasVendasTotal >= 0 ? 'text-success' : (alcancadoAnoTotal > 0 ? 'text-danger' : '')}>
                                            <td className="text-center text-dark">
                                                <b>TOTAL</b>
                                            </td>
                                            <td className="text-dark">R$ {convertFloatToMoney(metaAnoTotal)}</td>
                                            <td className="text-dark">R$ {convertFloatToMoney(metaAnoEmpresaTotal)}</td>
                                            <td className="text-dark">R$ {convertFloatToMoney(alcancadoAnoTotal)}</td>
                                            <td>
                                                R$ {alcancadoAnoTotal > 0 ? convertFloatToMoney(difMetasVendasTotal) : '0,00'} (
                                                {convertFloatToMoney(margemMetasVendasTotal + 100)}%
                                                )
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-4 row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h6>Vendas Por Estados mês: {converterMes(mesesSelecionado?.[0])}/{anoSelecionado}</h6>
                                <VendasEstadosGrafico dados={vendasEstados}/>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </Layout>
    )
}
