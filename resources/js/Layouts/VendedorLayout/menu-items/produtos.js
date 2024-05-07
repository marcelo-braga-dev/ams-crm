import * as React from "react";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import chaves from "./chaves";

const dashboard = {
    id: 'produtos',
    title: 'Produtos',
    type: 'group',
    children: [{
        id: 'produtos-lista',
        chave: chaves.produtos.cadastrados,
        title: 'Lista de Produtos',
        type: 'item',
        url: route('consultor.pedidos.produtos.index'),
        icon: Inventory2OutlinedIcon,
        breadcrumbs: false
    }
    ]
};

export default dashboard;
