import chaves from "@/Layouts/Menus/chaves";
import {BarChartLine} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'collapse',
            url: undefined,
            icon: BarChartLine,
            submenu: [
                {
                    id: 'dashboard-relatorios',
                    chave: chaves.dashboards.integrados,
                    title: 'Relatórios Integrados',
                    type: 'item',
                    admin: true,
                    url: route('admin.dashboard.relatorios.index'),
                }, {
                    id: 'dashboard-vendas',
                    chave: chaves.dashboards.vendas,
                    title: 'Indicadores de Vendas',
                    type: 'item',
                    url: route('admin.dashboard.vendas.index'),
                }, {
                    id: 'dashboard-leads',
                    chave: chaves.dashboards.leads,
                    title: 'Indicadores de Leads',
                    type: 'item',
                    url: route('admin.dashboard.leads.index'),
                }, {
                    id: 'dashboard-financeiro',
                    chave: chaves.dashboards.financeiros,
                    title: 'Indicadores Financeiros',
                    type: 'item',
                    admin: true,
                    url: route('admin.dashboard.financeiros.index'),
                }, {
                    id: 'dashboard-economico',
                    chave: chaves.dashboards.economicos,
                    title: 'Indicadores Econômicos',
                    type: 'item',
                    admin: true,
                    url: route('admin.dashboard.economicos.index'),
                }
            ]
        }
    ]
};

export default dashboard;
