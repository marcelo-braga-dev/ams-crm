import * as React from "react";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import chaves from "@/Layouts/VendedorLayout/menu-items/chaves";

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
                    id: 'produtos-cadastrados',
                    chave: chaves.produtos.cadastrados,
                    title: 'Produtos',
                    type: 'item',
                    url: route('admin.produtos.index'),
                },{
                    id: 'produtos-categorias',
                    chave: chaves.produtos.categorias,
                    title: 'Categorias',
                    type: 'item',
                    url: route('admin.produtos-categorias.index'),
                }, {
                    id: 'produtos-unidades',
                    chave: chaves.produtos.unidades,
                    title: 'Unidades',
                    type: 'item',
                    url: route('admin.produtos-unidades.index'),
                }, {
                    id: 'produtos-unidades',
                    chave: chaves.produtos.unidades,
                    title: 'Configurações',
                    type: 'item',
                    url: route('admin.produtos-unidades.index'),
                },
            ]
        }
    ]
};

export default dashboard;
