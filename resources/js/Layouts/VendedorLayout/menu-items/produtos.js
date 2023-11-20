import * as React from "react";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const dashboard = {
    id: 'produtos',
    title: 'Produtos',
    type: 'group',
    children: [{
        id: 'produtos-lista',
        title: 'Lista de Produtos',
        type: 'item',
        url: route('consultor.pedidos.produtos.index'),
        icon: Inventory2OutlinedIcon,
        breadcrumbs: false
    }
    ]
};

export default dashboard;
