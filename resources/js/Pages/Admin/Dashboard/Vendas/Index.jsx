import Layout from "@/Layouts/Layout";
import "chart.js/auto";
import MetaVendas from "./Graficos/MetaVendas";
import Avatar from "@mui/material/Avatar";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import {Stack, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {isAdmin} from "@/Helpers/helper";

import * as React from 'react';
import axios from "axios";
import LinearProgress from '@mui/material/LinearProgress';
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples";
import VendasEstadosGrafico from "./Graficos/VendasEstadosGrafico";
import MetasVendas from "@/Pages/Admin/Dashboard/Vendas/Partials/MetasVendas";
import VendasAnuais from "@/Pages/Admin/Dashboard/Vendas/Partials/VendasAnuais";
import TopLeadsGrafico from "@/Pages/Admin/Dashboard/Vendas/Graficos/TopLeadsGrafico";
import {BarChartLine, CardChecklist, GraphUp} from "react-bootstrap-icons";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";

export default function ({mes, ano, setores, setor}) {
    const [vendasUsuarios, setVendasUsuarios] = useState([]);
    const [vendasUsuariosComp, setVendasUsuariosComp] = useState([]);
    const [vendasTotal, setVendasTotal] = useState([]);
    const [vendasAnual, setVendasAnual] = useState([]);
    const [metasUsuarios, setMetasUsuarios] = useState([]);
    const [metasUsuariosComp, setMetasUsuariosComp] = useState([]);

    const [mesesSelecionado, setMesesSelecionado] = useState([mes]);
    const [anoSelecionado, setAnoSelecionado] = useState(ano);
    const [setorSelecionado, setSetorSelecionado] = useState(setor);
    const [mesesSelecionadoComp, setMesesSelecionadoComp] = useState([]);
    const [anoSelecionadoComp, setAnoSelecionadoComp] = useState();

    const [vendasMetas, setVendasMetas] = useState([]);
    const [vendasLeads, setVendasLeads] = useState([]);
    const [vendasLeadsComp, setVendasLeadsComp] = useState([]);
    const [metasEmpresas, setMetasEmpresas] = useState([]);
    const [vendasMetasAnual, setVendasMetasAnual] = useState([]);
    const [vendasMetasComp, setVendasMetasComp] = useState([]);
    const [vendasMetasAnualComp, setVendasMetasAnualComp] = useState([]);
    const [vendasEstados, setVendasEstados] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [filtrar, setFiltrar] = useState(false);
    const [leads, setLeads] = useState([]);

    const admin = isAdmin()

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

                setVendasLeads(res.data.vendas_leads)
                setVendasLeadsComp(res.data.vendas_leads_comp)
                setLeads(res.data.leads)
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
        <Layout empty titlePage="Indicadores de Vendas" menu="dashboard" submenu="dashboard-vendas">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-2">
                            <TextField label="Setor" select fullWidth defaultValue={setor}
                                       onChange={e => setSetorSelecionado(e.target.value)}>
                                {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-3">
                            <Stack direction="row">
                                <SelectMesesMultiples label="Mês Referência" value={mesesSelecionado} useState={setMesesSelecionado}/>
                                <TextField label="Ano" select fullWidth defaultValue={ano} style={{width: '10rem'}}
                                           onChange={e => setAnoSelecionado(e.target.value)}>
                                    <MenuItem value="2023">2023</MenuItem>
                                    <MenuItem value="2024">2024</MenuItem>
                                </TextField>
                            </Stack>
                        </div>
                        <div className="col-3">
                            <Stack direction="row">
                                <SelectMesesMultiples value={mesesSelecionadoComp} label="Comparar Meses"
                                                      useState={setMesesSelecionadoComp}/>
                                <TextField label="Comparar Ano" select fullWidth style={{width: '10rem'}}
                                           onChange={e => setAnoSelecionadoComp(e.target.value)}>
                                    <MenuItem value="2023">2023</MenuItem>
                                    <MenuItem value="2024">2024</MenuItem>
                                </TextField>
                            </Stack>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary btn-sm"
                                    onClick={() => setFiltrar(e => !e)}>Filtrar
                            </button>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
            {carregando ? <LinearProgress/> : <>
                {/*Cards*/}
                <div className="row row-cols-4">
                    <div className="col">
                        <CardContainer>
                            <CardBody>
                                <Stack direction="row" spacing={2}>
                                    <Avatar sx={{bgcolor: 'red'}}><AttachMoneyIcon/></Avatar>
                                    <div>
                                        <Typography variant="body2">Vendas</Typography>
                                        <Typography fontWeight="bold">R$ {convertFloatToMoney(vendasTotal.vendas)}</Typography>
                                        {vendasMetasComp?.totalVendas &&
                                            <Typography fontWeight="bold">R$ {convertFloatToMoney(vendasMetasComp?.totalVendas)}</Typography>}
                                    </div>
                                </Stack>
                            </CardBody>
                        </CardContainer>
                    </div>
                    <div className="col">
                        <CardContainer>
                            <CardBody>
                                <Stack direction="row" spacing={2}>
                                    <Avatar sx={{bgcolor: 'orange'}}><TrendingUpIcon/></Avatar>
                                    <div>
                                        <Typography variant="body2">Meta de Vendas</Typography>
                                        <Typography fontWeight="bold">R$ {convertFloatToMoney(vendasMetas?.totalMetas)}</Typography>
                                        {vendasMetasComp?.totalMetas &&
                                            <Typography fontWeight="bold">R$ {convertFloatToMoney(vendasMetasComp?.totalMetas)}</Typography>}
                                    </div>
                                </Stack>
                            </CardBody>
                        </CardContainer>
                    </div>
                    <div className="col">
                        <CardContainer>
                            <CardBody>
                                <Stack direction="row" spacing={2}>
                                    <Avatar sx={{bgcolor: 'blue'}}><AccountBalanceOutlinedIcon/></Avatar>
                                    <div>
                                        <Typography variant="body2">Meta de Vendas da Empresa</Typography>
                                        <Typography fontWeight="bold">R$ {convertFloatToMoney(metasEmpresas?.[mes])}</Typography>
                                        {vendasMetasComp?.totalMetas &&
                                            <Typography fontWeight="bold">R$ {convertFloatToMoney(vendasMetasComp?.totalMetas)}</Typography>}
                                    </div>
                                </Stack>
                            </CardBody>
                        </CardContainer>
                    </div>
                    <div className="col">
                        <CardContainer>
                            <CardBody>
                                <Stack direction="row" spacing={2}>
                                    <Avatar sx={{bgcolor: 'green'}}><TimelineIcon/></Avatar>
                                    <div>
                                        <Typography variant="body2">Vendas x Meta</Typography>
                                        <Typography fontWeight="bold">
                                            R$ {convertFloatToMoney(vendasTotal.vendas - vendasMetas?.totalMetas)} (
                                            {convertFloatToMoney(((vendasTotal.vendas - vendasMetas?.totalMetas) / vendasMetas?.totalMetas * 100) + 100)}%)
                                        </Typography>
                                        {vendasMetasComp?.totalMetas &&
                                            <Typography
                                                fontWeight="bold">R$ {convertFloatToMoney(vendasMetasComp?.totalVendas - vendasMetasComp?.totalMetas)}</Typography>}
                                    </div>
                                </Stack>
                            </CardBody>
                        </CardContainer>
                    </div>
                </div>

                <CardContainer>
                    <CardTitle title="Meta x Vendas" icon={<GraphUp size="22"/>}>
                        <a className="btn btn-primary btn-sm mb-0" href={route('admin.metas-vendas.vendas-faturadas.index')}>Ver Pedidos</a>
                    </CardTitle>
                    <CardBody>
                        <MetasVendas
                            metasUsuarios={metasUsuarios} vendasMetasComp={vendasMetasComp} vendasUsuariosComp={vendasUsuariosComp}
                            vendasTotal={vendasTotal} vendasMetas={vendasMetas} vendasUsuarios={vendasUsuarios}
                            metasUsuariosComp={metasUsuariosComp} admin={admin} mes={mesesSelecionado?.[0]} ano={ano}/>

                        <MetaVendas vendasUsuarios={vendasUsuarios} metasUsuarios={metasUsuarios}
                                    vendasUsuariosComp={vendasUsuariosComp} metasUsuariosComp={metasUsuariosComp}/>
                    </CardBody>
                </CardContainer>

                <VendasAnuais vendasAnual={vendasAnual} metasEmpresas={metasEmpresas} vendasMetasAnual={vendasMetasAnual}/>

                <CardContainer>
                    <CardTitle title="Top Compradores (Leads)" icon={<BarChartLine size="22"/>}>
                        <a className="btn btn-primary btn-sm mb-0" href={route('admin.dashboard.vendas.leads')}>Ver Todos</a>
                    </CardTitle>
                    <CardBody>
                        <TopLeadsGrafico dados={vendasLeads} leads={leads} vendasLeadsComp={vendasLeadsComp}/>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardTitle title="Vendas Por Estados" icon={<BarChartLine size="22"/>}/>
                    <CardBody>
                        <VendasEstadosGrafico dados={vendasEstados}/>
                    </CardBody>
                </CardContainer>
            </>}
        </Layout>
    )
}
