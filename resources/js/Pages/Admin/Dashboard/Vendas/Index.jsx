import Layout from "@/Layouts/Layout";
import "chart.js/auto";
import MetaVendas from "./Graficos/MetaVendas";
import Avatar from "@mui/material/Avatar";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import {Stack, TextField, Typography, LinearProgress, MenuItem, DialogContent} from "@mui/material";
import {useEffect, useState, useCallback} from "react";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {isAdmin} from "@/Helpers/helper";

import axios from "axios";
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples";
import VendasEstadosGrafico from "./Graficos/VendasEstadosGrafico";
import MetasVendas from "@/Pages/Admin/Dashboard/Vendas/Partials/MetasVendas";
import VendasAnuais from "@/Pages/Admin/Dashboard/Vendas/Partials/VendasAnuais";
import TopLeadsGrafico from "@/Pages/Admin/Dashboard/Vendas/Graficos/TopLeadsGrafico";
import {BarChartLine, GraphUp, Truck} from "react-bootstrap-icons";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import Link from "@/Components/Link";
import DistribuidorasGrafico from "@/Pages/Admin/Dashboard/Vendas/Graficos/DistribuidorasGrafico";
import MetasDistribuidoras from "@/Pages/Admin/Dashboard/Vendas/Graficos/MetasDistribuidoras.jsx";
import Dialog from "@mui/material/Dialog";

export default function DashboardVendas({mes, ano, setores, setor}) {
    const [vendasUsuarioDistribuidora, setVendasUsuarioDistribuidora] = useState()

    const [vendasData, setVendasData] = useState({
        vendasUsuarios: [],
        vendasUsuariosComp: [],
        vendasTotal: [],
        vendasAnual: [],
        metasUsuarios: [],
        metasUsuariosComp: [],
        vendasMetas: [],
        vendasLeads: [],
        vendasLeadsComp: [],
        metasEmpresas: [],
        vendasMetasAnual: [],
        vendasMetasComp: [],
        vendasMetasAnualComp: [],
        vendasEstados: [],
        leads: [],
        fornecedores_vendas: [],
    });

    const [filters, setFilters] = useState({
        mesesSelecionado: [mes], anoSelecionado: ano, setorSelecionado: setor, mesesSelecionadoComp: [], anoSelecionadoComp: undefined
    });

    const [carregando, setCarregando] = useState(true);
    const [filtrar, setFiltrar] = useState(false);

    const admin = isAdmin();

    const fetchData = useCallback(async () => {
        setCarregando(true);
        try {
            const {data} = await axios.get(route('admin.dashboard.vendas.registros', {
                mes: filters.mesesSelecionado,
                ano: filters.anoSelecionado,
                setor: filters.setorSelecionado,
                mesComp: filters.mesesSelecionadoComp,
                anoComp: filters.anoSelecionadoComp,
            }));

            setVendasData({
                vendasUsuarios: data.vendas.usuarios,
                vendasUsuariosComp: data.vedas_comp.usuarios,
                vendasTotal: data.vendas.total,
                vendasAnual: data.vendas_anual,
                metasUsuarios: data.metas_usuarios,
                metasUsuariosComp: data.metas_usuarios_comp,
                vendasLeads: data.vendas_leads,
                vendasLeadsComp: data.vendas_leads_comp,
                metasEmpresas: data.meta_anual_empresa,
                vendasMetas: data.vedas_metas,
                vendasMetasAnual: data.vedas_metas_anual,
                vendasMetasComp: data.vedas_metas_comp,
                vendasMetasAnualComp: data.vedas_metas_anual_comp,
                vendasEstados: data.vendas_estados,
                leads: data.leads,
                fornecedores_vendas: data.fornecedores_vendas
            });
        } catch (error) {
            console.error('Erro ao buscar dados de vendas:', error);
        } finally {
            setCarregando(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchData();
    }, [fetchData, filtrar]);

    const handleFilterChange = (key, value) => {
        setFilters((prevFilters) => ({...prevFilters, [key]: value}));
    };

    const handleFiltrar = () => {
        setFiltrar((prev) => !prev);
    };

    const fetchUsuario = (id) => {
        axios.get(route('admin.dashboard.get-vendas.fornecedores-usuario', {
            usuario: id,
            mes: filters.mesesSelecionado,
            ano: filters.anoSelecionado,
            setor: filters.setorSelecionado,
            mesComp: filters.mesesSelecionadoComp,
            anoComp: filters.anoSelecionadoComp,
        }))
            .then(res => setVendasUsuarioDistribuidora(res.data))
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Layout empty titlePage="Indicadores de Vendas" menu="dashboard" submenu="dashboard-vendas">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-2">
                            <TextField
                                label="Setor"
                                select
                                fullWidth
                                defaultValue={setor}
                                onChange={(e) => handleFilterChange('setorSelecionado', e.target.value)}
                            >
                                {setores.map(item => (<MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>))}
                            </TextField>
                        </div>
                        <div className="col-3">
                            <Stack direction="row">
                                <SelectMesesMultiples
                                    label="Mês Referência"
                                    value={filters.mesesSelecionado}
                                    useState={(value) => handleFilterChange('mesesSelecionado', value)}
                                />
                                <TextField
                                    label="Ano"
                                    select
                                    fullWidth
                                    defaultValue={ano}
                                    style={{width: '10rem'}}
                                    onChange={(e) => handleFilterChange('anoSelecionado', e.target.value)}
                                >
                                    <MenuItem value="2023">2023</MenuItem>
                                    <MenuItem value="2024">2024</MenuItem>
                                </TextField>
                            </Stack>
                        </div>
                        <div className="col-3">
                            <Stack direction="row">
                                <SelectMesesMultiples
                                    label="Comparar Meses"
                                    value={filters.mesesSelecionadoComp}
                                    useState={(value) => handleFilterChange('mesesSelecionadoComp', value)}
                                />
                                <TextField
                                    label="Comparar Ano"
                                    select
                                    fullWidth
                                    style={{width: '10rem'}}
                                    onChange={(e) => handleFilterChange('anoSelecionadoComp', e.target.value)}
                                >
                                    <MenuItem value="2023">2023</MenuItem>
                                    <MenuItem value="2024">2024</MenuItem>
                                </TextField>
                            </Stack>
                        </div>
                        <div className="col-2">
                            <button className="btn btn-primary btn-sm" onClick={handleFiltrar}>
                                Filtrar
                            </button>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            {carregando ? (<LinearProgress/>) : (<>
                {/* Cards */}
                <div className="row row-cols-4">
                    <DataCard
                        color="red"
                        icon={<AttachMoneyIcon/>}
                        title="Vendas"
                        value={vendasData.vendasTotal.vendas}
                        compValue={vendasData.vendasMetasComp?.totalVendas}
                    />
                    <DataCard
                        color="orange"
                        icon={<TrendingUpIcon/>}
                        title="Meta de Vendas"
                        value={vendasData.vendasMetas?.totalMetas}
                        compValue={vendasData.vendasMetasComp?.totalMetas}
                    />
                    <DataCard
                        color="blue"
                        icon={<AccountBalanceOutlinedIcon/>}
                        title="Meta de Vendas da Empresa"
                        value={vendasData.metasEmpresas?.[filters.mesesSelecionado[0]]}
                        compValue={vendasData.vendasMetasComp?.totalMetas}
                    />
                    <DataCard
                        color="green"
                        icon={<TimelineIcon/>}
                        title="Vendas x Meta"
                        value={vendasData.vendasTotal.vendas - vendasData.vendasMetas?.totalMetas}
                        compValue={vendasData.vendasMetasComp?.totalVendas - vendasData.vendasMetasComp?.totalMetas}
                        additionalText={((vendasData.vendasTotal.vendas - vendasData.vendasMetas?.totalMetas) / vendasData.vendasMetas?.totalMetas * 100) + 100 + "%"}
                    />
                </div>

                <CardContainer>
                    <CardTitle title="Meta x Vendas" icon={<GraphUp size="22"/>}>
                        <Link className="btn btn-primary btn-sm mb-0" href={route('admin.metas-vendas.vendas-faturadas.index')}>
                            Ver Pedidos
                        </Link>
                    </CardTitle>
                    <CardBody>
                        <MetasVendas
                            metasUsuarios={vendasData.metasUsuarios}
                            vendasMetasComp={vendasData.vendasMetasComp}
                            vendasUsuariosComp={vendasData.vendasUsuariosComp}
                            vendasTotal={vendasData.vendasTotal}
                            vendasMetas={vendasData.vendasMetas}
                            vendasUsuarios={vendasData.vendasUsuarios}
                            metasUsuariosComp={vendasData.metasUsuariosComp}
                            admin={admin}
                            mes={filters.mesesSelecionado?.[0]}
                            ano={filters.anoSelecionado}
                        />
                        <MetaVendas
                            vendasUsuarios={vendasData.vendasUsuarios}
                            metasUsuarios={vendasData.metasUsuarios}
                            vendasUsuariosComp={vendasData.vendasUsuariosComp}
                            metasUsuariosComp={vendasData.metasUsuariosComp}
                        />
                    </CardBody>
                </CardContainer>

                <VendasAnuais
                    vendasAnual={vendasData.vendasAnual}
                    metasEmpresas={vendasData.metasEmpresas}
                    vendasMetasAnual={vendasData.vendasMetasAnual}
                />

                <div className="row">
                    <div className="col">
                        <CardContainer>
                            <CardTitle title="Top Distribuidoras" icon={<Truck size="22"/>}>
                                <Link label="Ver Todos"
                                      href={route('admin.dashboard.vendas.fornecedores', {
                                          ano: filters.anoSelecionado, mes: filters.mesesSelecionado, setor: filters.setorSelecionado,
                                      })}
                                >
                                    Ver Todos
                                </Link>
                            </CardTitle>
                            <CardBody>
                                <DistribuidorasGrafico
                                    dados={vendasData.fornecedores_vendas}
                                    leads={vendasData.leads}
                                    vendasLeadsComp={vendasData.vendasLeadsComp}
                                />
                            </CardBody>
                        </CardContainer>
                        <CardContainer>
                            <CardTitle title="Vendas Distribuidora por Vendedor" icon={<Truck size="22"/>}/>
                            <CardBody>
                                <TextField select sx={{width: 250, marginBottom: 2}} size="small"
                                           onChange={e => fetchUsuario(e.target.value)}>
                                    {vendasData?.vendasUsuarios?.map(item => (
                                        <MenuItem key={item.user_id} value={item.user_id}>
                                            <Stack direction="row" spacing={1}>
                                                <Avatar src={item.foto} sx={{width: 20, height: 20}}/>
                                                <Typography>{item.nome}</Typography>
                                            </Stack>
                                        </MenuItem>
                                    ))}
                                </TextField>

                                {vendasUsuarioDistribuidora && (
                                    <div className="row">
                                        <div className="col text-end">
                                            <button className="btn btn-warning btn-sm" onClick={handleClickOpen}>Abrir tabela</button>
                                            <MetasDistribuidoras vendasDistribuidoras={vendasUsuarioDistribuidora}/>
                                        </div>
                                    </div>
                                )}
                            </CardBody>

                        </CardContainer>
                    </div>
                    <div className="col">
                        <CardContainer>
                            <CardTitle title="Top Compradores (Leads)" icon={<BarChartLine size="22"/>}>
                                <Link label="Ver Todos"
                                      href={route('admin.dashboard.vendas.leads', {
                                          ano: filters.anoSelecionado, mes: filters.mesesSelecionado, setor: filters.setorSelecionado,
                                      })}
                                >
                                    Ver Todos
                                </Link>
                            </CardTitle>
                            <CardBody>
                                <TopLeadsGrafico
                                    dados={vendasData.vendasLeads}
                                    leads={vendasData.leads}
                                    vendasLeadsComp={vendasData.vendasLeadsComp}
                                />
                            </CardBody>
                        </CardContainer>
                    </div>
                </div>
                <CardContainer>
                    <CardTitle title="Vendas Por Estados" icon={<BarChartLine size="22"/>}/>
                    <CardBody>
                        <VendasEstadosGrafico dados={vendasData.vendasEstados}/>
                    </CardBody>
                </CardContainer>
            </>)}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogContent>
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>
                                Distribuidora
                            </th>
                            <th>
                                Valor
                            </th>
                            <th>
                                Margem
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {vendasUsuarioDistribuidora?.map(item => {
                            const total = vendasUsuarioDistribuidora.reduce((acc, item) => acc + item.valor, 0);
                            return (<tr>
                                <td>{item?.fornecedor_nome}</td>
                                <td>R$ {convertFloatToMoney(item?.valor)}</td>
                                <td>{convertFloatToMoney((item.valor / total) * 100)}%</td>
                            </tr>)
                        })}
                        {vendasUsuarioDistribuidora && <tr className="bg-light">
                            <td><Typography fontWeight="bold">TOTAL</Typography></td>
                            <td>
                                <Typography fontWeight="bold">R$ {convertFloatToMoney(vendasUsuarioDistribuidora.reduce((acc, item) => acc + item.valor, 0))}</Typography>
                            </td>
                            <td></td>
                        </tr>}
                        </tbody>
                    </table>
                </DialogContent>
            </Dialog>
        </Layout>)
}

const DataCard = ({color, icon, title, value, compValue, additionalText}) => (<div className="col">
    <CardContainer>
        <CardBody>
            <Stack direction="row" spacing={2}>
                <Avatar sx={{bgcolor: color}}>{icon}</Avatar>
                <div>
                    <Typography variant="body2">{title}</Typography>
                    <Typography fontWeight="bold">R$ {convertFloatToMoney(value)}</Typography>
                    {compValue > 0 && <Typography fontWeight="bold">R$ {convertFloatToMoney(compValue)}</Typography>}
                    {compValue > 0 && <Typography fontWeight="bold">{additionalText}</Typography>}
                </div>
            </Stack>
        </CardBody>
    </CardContainer>
</div>);
