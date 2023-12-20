import * as React from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const dashboard = {
    id: 'produtos',
    title: 'Produtos',
    type: 'group',
    children: [
        {
            id: 'produtos',
            title: 'Produtos',
            type: 'collapse',
            url: undefined,
            icon: Inventory2OutlinedIcon,
            submenu: [
                {
                    id: 'produtos-lista',
                    title: 'Todos Produtos',
                    type: 'item',
                    url: route('admin.produtos-fornecedores.index'),
                }, {
                    id: 'produtos-categorias',
                    title: 'Categorias',
                    type: 'item',
                    url: route('admin.produtos-categorias.index'),
                }, {
                    id: 'produtos-unidades',
                    title: 'Unidades',
                    type: 'item',
                    url: route('admin.produtos-unidades.index'),
                }, {
                    id: 'produtos-estoques',
                    title: 'Estoques',
                    type: 'item',
                    url: route('admin.config.index'),
                    submenu: [
                        {
                            id: 'produtos-estoques-transito',
                            title: 'Estoque em Transito',
                            url: route('admin.estoque-transito.index'),
                            tag: 'estoque-transito'
                        }, {
                            id: 'produtos-estoques-local',
                            title: 'Estoque Local',
                            url: route('admin.estoque-local.index'),
                            tag: 'estoque-local'
                        }
                    ]
                }
            ]
        }
    ]
};

export default dashboard;
