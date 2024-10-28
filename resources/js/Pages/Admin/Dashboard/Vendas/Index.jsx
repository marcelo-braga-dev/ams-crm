import Layout from '@/Layouts/Layout';
import 'chart.js/auto';
import MetaVendas from './Graficos/MetaVendas';
import Avatar from '@mui/material/Avatar';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

import { Stack, TextField, Typography, LinearProgress, MenuItem, DialogContent } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import convertFloatToMoney from '@/Helpers/converterDataHorario';
import { isAdmin } from '@/Helpers/helper';

import axios from 'axios';
import SelectMesesMultiples from '@/Components/Inputs/SelectMesesMultiples';
import VendasEstadosGrafico from './Graficos/VendasEstadosGrafico';
import MetasVendas from '@/Pages/Admin/Dashboard/Vendas/Partials/MetasVendas';
import VendasAnuais from '@/Pages/Admin/Dashboard/Vendas/Partials/VendasAnuais';
import TopLeadsGrafico from '@/Pages/Admin/Dashboard/Vendas/Graficos/TopLeadsGrafico';
import { BarChartLine, GraphUp, Truck } from 'react-bootstrap-icons';
import CardContainer from '@/Components/Cards/CardContainer';
import CardBody from '@/Components/Cards/CardBody';
import CardTitle from '@/Components/Cards/CardTitle';
import Link from '@/Components/Link';
import DistribuidorasGrafico from '@/Pages/Admin/Dashboard/Vendas/Graficos/DistribuidorasGrafico';
import MetasDistribuidoras from '@/Pages/Admin/Dashboard/Vendas/Graficos/MetasDistribuidoras.jsx';
import Dialog from '@mui/material/Dialog';
import VendasDistribuidoraPorVendedor from '@/Pages/Admin/Dashboard/Vendas/Graficos/Components/VendasDistribuidoraPorVendedor.jsx';
import TopCompradores from '@/Pages/Admin/Dashboard/Vendas/Graficos/Components/TopCompradores.jsx';
import TopDistribuidoras from '@/Pages/Admin/Dashboard/Vendas/Graficos/Components/TopDistribuidoras.jsx';
import MetaVendasComponent from '@/Pages/Admin/Dashboard/Vendas/Graficos/Components/MetaVendasComponent.jsx';
import CardsComponent from '@/Pages/Admin/Dashboard/Vendas/Graficos/Components/CardsComponent.jsx';
import FiltrosComponent from '@/Pages/Admin/Dashboard/Vendas/Graficos/Components/FiltrosComponent.jsx';

export default function DashboardVendas({ mes, ano, setores, setor }) {
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
        mesesSelecionado: [mes], anoSelecionado: ano, setorSelecionado: setor, mesesSelecionadoComp: [], anoSelecionadoComp: undefined,
    });

    const [carregando, setCarregando] = useState(true);
    const [filtrar, setFiltrar] = useState(false);

    const fetchData = useCallback(async () => {
        setCarregando(true);
        try {
            const { data } = await axios.get(route('admin.dashboard.vendas.registros', {
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
                fornecedores_vendas: data.fornecedores_vendas,
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
        setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    };

    const handleFiltrar = () => {
        setFiltrar((prev) => !prev);
    };

    return (
        <Layout empty titlePage="Indicadores de Vendas" menu="dashboard" submenu="dashboard-vendas">
            <FiltrosComponent filters={filters} ano={ano} setor={setor} setores={setores} handleFilterChange={handleFilterChange} handleFiltrar={handleFiltrar} />

            {carregando ? (<LinearProgress />) : (<>

                <CardsComponent vendasData={vendasData} filters={filters} />

                <MetaVendasComponent vendasData={vendasData} filters={filters} />

                <VendasAnuais
                    vendasAnual={vendasData.vendasAnual}
                    metasEmpresas={vendasData.metasEmpresas}
                    vendasMetasAnual={vendasData.vendasMetasAnual}
                />

                <div className="row">
                    <div className="col">
                        <TopDistribuidoras vendasData={vendasData} filters={filters} />
                        <VendasDistribuidoraPorVendedor consultores={vendasData?.vendasUsuarios} filters={filters} />
                    </div>
                    <div className="col">
                        <TopCompradores vendasData={vendasData} filters={filters} />
                    </div>
                </div>
                <CardContainer>
                    <CardTitle title="Vendas Por Estados" icon={<BarChartLine size="22" />} />
                    <CardBody>
                        <VendasEstadosGrafico dados={vendasData.vendasEstados} />
                    </CardBody>
                </CardContainer>
            </>)}

        </Layout>);
}


