import * as React from "react";

import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import chaves from "./chaves";

const dashboard = {
    id: 'clientes',
    title: 'Clientes',
    type: 'group',
    children: [{
        id: 'clientes-lista',
        title: 'Lista de Clientes',
        type: 'item',
        url: route('consultor.leads.main.index'),
        icon: PeopleAltOutlinedIcon,
        breadcrumbs: false
    }, {
        id: 'clientes-cadastrar',
        chave: chaves.leads.cadastrar,
        title: 'Cadastrar Cliente',
        type: 'item',
        url: route('consultor.leads.main.create'),
        icon: PersonAddAlt1OutlinedIcon,
        breadcrumbs: false
    }
    ]
};

export default dashboard;
