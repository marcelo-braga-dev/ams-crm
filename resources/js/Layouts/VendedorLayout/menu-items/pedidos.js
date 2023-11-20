import * as React from "react";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';

const dashboard = {
    id: 'pedidos',
    title: 'Pedidos',
    type: 'group',
    children: [{
        id: 'pedidos-lista',
        title: 'Lista de Pedidos',
        type: 'item',
        url: route('consultor.pedidos.index'),
        icon: RequestPageOutlinedIcon,
        breadcrumbs: false
    }, {
        id: 'pedidos-historico',
        title: 'Histórico de Pedidos',
        type: 'item',
        url: route('consultor.historicos.index'),
        icon: HistoryOutlinedIcon,
        breadcrumbs: false
    }
    ]
};

export default dashboard;
