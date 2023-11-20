import * as React from "react";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";

const dashboard = {
    id: 'pedidos',
    title: 'Pedidos',
    type: 'group',
    children: [
        {
            id: 'pedidos',
            title: 'Pedidos',
            type: 'collapse',
            url: undefined,
            icon: RequestPageOutlinedIcon,
            submenu: [
                {
                    id: 'pedidos-lista',
                    title: 'Lista de Pedidos',
                    type: 'item',
                    url: route('admin.pedidos.index'),
                }, {
                    id: 'pedidos-relatorio',
                    title: 'Relatório de Pedidos',
                    type: 'item',
                    url: undefined,
                    submenu: [
                        {
                            id: 'pedidos-relatorios',
                            title: 'Produtos',
                            url: route('admin.pedidos.relatorios.produtos.index'),
                        },
                        {
                            id: 'pedidos-faturamento',
                            title: 'Faturamento',
                            url: route('admin.pedidos.relatorios.faturamento.index'),
                        },
                    ]
                }, {
                    id: 'pedidos-historico',
                    title: 'Histórico de Pedidos',
                    type: 'item',
                    url: route('admin.historico.index'),
                }, {
                    id: 'pedidos-config',
                    title: 'Configurações',
                    type: 'item',
                    url: route('admin.config.index'),
                }
            ]
        }
    ]
};

export default dashboard;
