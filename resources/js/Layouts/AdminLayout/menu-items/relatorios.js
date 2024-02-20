import * as React from "react";

import BarChartIcon from '@mui/icons-material/BarChart';

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'relatorios',
            title: 'Relatórios',
            type: 'collapse',
            url: undefined,
            icon: BarChartIcon,
            submenu: [
                {
                    id: 'relatorios-leads',
                    title: 'Leads',
                    type: 'item',
                    url: route('admin.leads.relatorios.index'),
                }, {
                    id: 'relatorios-vendas',
                    title: 'Vendas',
                    admin: true,
                    type: 'item',
                    url: route('admin.relatorios.vendas.index'),
                }, {
                    id: 'metas-vendas',
                    title: 'Meta de Vendas',
                    type: 'item',
                    url: route('admin.relatorios.meta-vendas.index'),
                },
            ]
        }
    ]
};

export default dashboard;
