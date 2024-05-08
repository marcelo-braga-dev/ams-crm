import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";
import chaves from "@/Layouts/VendedorLayout/menu-items/chaves";

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
            icon: InsertChartOutlinedRoundedIcon,

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
