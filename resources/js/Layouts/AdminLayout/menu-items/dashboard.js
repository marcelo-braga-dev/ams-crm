import * as React from "react";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
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
                    id: 'dashboard-vendas',
                    title: 'Indicadores de Vendas',
                    type: 'item',
                    url: route('admin.dashboard.vendas.index'),
                }, {
                    id: 'dashboard-economico',
                    title: 'Indicadores de Econômicos',
                    type: 'item',
                    url: route('admin.dashboard.economicos.index'),
                }, {
                    id: 'dashboard-financeiro',
                    title: 'Indicadores de Financeiros',
                    type: 'item',
                    url: route('admin.dashboard.financeiros.index'),
                }
            ]
        }
    ]
};

export default dashboard;
