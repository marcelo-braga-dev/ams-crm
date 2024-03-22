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

export default function ({metaVendas, topConsultores, topCompradores, valores, vendasMensais, mes, ano}) {
    function filtrar(mes, ano) {
        router.get(route('admin.dashboard.vendas.index'), {mes: mes, ano: ano})
    }

    return (
        <Layout container titlePage="Indicadores de Vendas" menu="dashboard" submenu="dashboard-vendas">
            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col-2">
                        <TextField label="Ano" select fullWidth defaultValue={ano}
                                   onChange={e => filtrar(mes, e.target.value)}>
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-2">
                        <TextField label="Mês" select fullWidth defaultValue={mes}
                                   onChange={e => filtrar(e.target.value, ano)}>
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
                                    <h5 className="text-end">R$ {valores.vendas}</h5>
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
                                    <h5 className="text-end">R$ {valores.meta}</h5>
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
                                    <h5 className="text-end">R$ {valores.dif_vendas_meta}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h6>Top 5 Consultores(as)</h6>
                            <TopVendas dados={topConsultores} cor="#ffa500aa"/>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h6>Top 5 Integradores</h6>
                            <TopVendas dados={topCompradores} cor="#cb0ec5aa"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <h6>Meta x Vendas</h6>
                        <MetaVendas dados={metaVendas}/>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-sm text-sm">
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Meta</th>
                                <th>Venda</th>
                                <th>Margem</th>
                                <th>Diferença</th>
                            </tr>
                            </thead>
                            <tbody>
                            {metaVendas.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td><b>{item.nome}</b></td>
                                        <td>R$ {item.meta_money}</td>
                                        <td>R$ {item.vendas_money}</td>
                                        <td>{item.margem_money}%</td>
                                        <td>
                                            {item.diferenca_meta < 0 ?
                                                <span
                                                    className="text-danger">R$ {item.diferenca_meta_money}</span> :
                                                <span>R$ {item.diferenca_meta_money}</span>}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="row mb-4">
                <div className="col-md-5">
                    <div className="card">
                        <div className="card-body">
                            <h6>Vendas Mensais</h6>
                            <VendasMensasPie dados={vendasMensais}/>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card">
                        <div className="card-body">
                            <h6>Vendas Mensais</h6>
                            <div className="table-responsive">
                                <table className="table table-sm text-sm">
                                    <thead>
                                    <tr>
                                        <th>Mẽs</th>
                                        <th>Meta</th>
                                        <th>Vendas</th>
                                        <th>Diferença</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td><b>JAN</b></td>
                                        <td>R$ {vendasMensais[1]?.meta}</td>
                                        <td>R$ {vendasMensais[1]?.money ?? '0,00'}</td>
                                        <td>R$ {vendasMensais[1]?.diferenca ?? '0,00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b>FEV</b></td>
                                        <td>R$ {vendasMensais[2]?.meta}</td>
                                        <td>R$ {vendasMensais[2]?.money ?? '0,00'}</td>
                                        <td>R$ {vendasMensais[2]?.diferenca ?? '0,00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b>MAR</b></td>
                                        <td>R$ {vendasMensais[3]?.meta}</td>
                                        <td>R$ {vendasMensais[3]?.money ?? '0,00'}</td>
                                        <td>R$ {vendasMensais[3]?.diferenca ?? '0,00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b>ABR</b></td>
                                        <td>R$ {vendasMensais[4]?.meta}</td>
                                        <td>R$ {vendasMensais[4]?.money ?? '0,00'}</td>
                                        <td>R$ {vendasMensais[4]?.diferenca ?? '0,00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b>MAI</b></td>
                                        <td>R$ {vendasMensais[5]?.meta}</td>
                                        <td>R$ {vendasMensais[5]?.money ?? '0,00'}</td>
                                        <td>R$ {vendasMensais[5]?.diferenca ?? '0,00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b>JUN</b></td>
                                        <td>R$ {vendasMensais[6]?.meta}</td>
                                        <td>R$ {vendasMensais[6]?.money ?? '0,00'}</td>
                                        <td>R$ {vendasMensais[6]?.diferenca ?? '0,00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b>JUL</b></td>
                                        <td>R$ {vendasMensais[7]?.meta}</td>
                                        <td>R$ {vendasMensais[7]?.money ?? '0,00'}</td>
                                        <td>R$ {vendasMensais[7]?.diferenca ?? '0,00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b>AGO</b></td>
                                        <td>R$ {vendasMensais[8]?.meta}</td>
                                        <td>R$ {vendasMensais[8]?.money ?? '0,00'}</td>
                                        <td>R$ {vendasMensais[8]?.diferenca ?? '0,00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b>SET</b></td>
                                        <td>R$ {vendasMensais[9]?.meta}</td>
                                        <td>R$ {vendasMensais[9]?.money ?? '0,00'}</td>
                                        <td>R$ {vendasMensais[9]?.diferenca ?? '0,00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b>OUT</b></td>
                                        <td>R$ {vendasMensais[10]?.meta}</td>
                                        <td>R$ {vendasMensais[10]?.money ?? '0,00'}</td>
                                        <td>R$ {vendasMensais[10]?.diferenca ?? '0,00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b>NOV</b></td>
                                        <td>R$ {vendasMensais[11]?.meta}</td>
                                        <td>R$ {vendasMensais[11]?.money ?? '0,00'}</td>
                                        <td>R$ {vendasMensais[11]?.diferenca ?? '0,00'}</td>
                                    </tr>
                                    <tr>
                                        <td><b>DEZ</b></td>
                                        <td>R$ {vendasMensais[12]?.meta}</td>
                                        <td>R$ {vendasMensais[12]?.money ?? '0,00'}</td>
                                        <td>R$ {vendasMensais[12]?.diferenca ?? '0,00'}</td>
                                    </tr>
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
