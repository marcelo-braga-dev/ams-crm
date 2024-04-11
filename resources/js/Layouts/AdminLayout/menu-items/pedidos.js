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
                    id: 'pedidos-novo',
                    title: 'Emitir Pedido',
                    type: 'item',
                    url: route('admin.pedidos.emitir.index'),
                }, {
                    id: 'pedidos-historico',
                    title: 'Histórico de Pedidos',
                    type: 'item',
                    url: route('admin.historico.index'),
                }, {
                    id: 'pedidos-relatorios',
                    title: 'Relatórios',
                    admin: true,
                    type: 'item',
                    url: route('admin.relatorios.vendas.index'),
                }, {
                    id: 'pedidos-config',
                    title: 'Configurações',
                    type: 'item',
                    admin: true,
                    url: route('admin.config.index'),
                },
                // {
                //     id: 'pedidos-quadros',
                //     title: 'Quadros',
                //     type: 'item',
                //     admin: true,
                //     url: route('admin.pedidos.quadros.index'),
                // }
            ]
        }
    ]
};

export default dashboard;
