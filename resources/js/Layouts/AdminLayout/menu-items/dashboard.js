import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";

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
            admin: true,
            submenu: [
                {
                    id: 'dashboard-relatorios',
                    title: 'Relatórios Integrados',
                    type: 'item',
                    url: route('admin.dashboard.relatorios.index'),
                }, {
                    id: 'dashboard-vendas',
                    title: 'Indicadores de Vendas',
                    type: 'item',
                    url: route('admin.dashboard.vendas.index'),
                }, {
                    id: 'dashboard-financeiro',
                    title: 'Indicadores Financeiros',
                    type: 'item',
                    url: route('admin.dashboard.financeiros.index'),
                }, {
                    id: 'dashboard-economico',
                    title: 'Indicadores Econômicos',
                    type: 'item',
                    url: route('admin.dashboard.economicos.index'),
                }
            ]
        }
    ]
};

export default dashboard;
