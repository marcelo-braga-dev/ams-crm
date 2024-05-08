import * as React from "react";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import chaves from "@/Layouts/VendedorLayout/menu-items/chaves";

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
                    chave: chaves.pedidos.quadros,
                    title: 'Quadro de Pedidos',
                    type: 'item',
                    url: route('admin.pedidos.index'),
                }, {
                    id: 'pedidos-novo',
                    chave: chaves.pedidos.emitir,
                    title: 'Emitir Pedido',
                    type: 'item',
                    url: route('admin.pedidos.emitir.index'),
                }, {
                    id: 'pedidos-historico',
                    chave: chaves.pedidos.historico,
                    title: 'Histórico de Pedidos',
                    type: 'item',
                    url: route('admin.historico.index'),
                }, {
                    id: 'pedidos-relatorios',
                    chave: chaves.pedidos.relatorio,
                    title: 'Relatórios',
                    admin: true,
                    type: 'item',
                    url: route('admin.relatorios.vendas.index'),
                }, {
                    id: 'pedidos-config',
                    chave: chaves.pedidos.config,
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
