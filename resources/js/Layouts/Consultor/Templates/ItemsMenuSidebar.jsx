import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import * as React from "react";

export const ItemsMenuSidebar = [
    {
        'menu': 'Pedidos',
        'icone': <RequestPageOutlinedIcon/>,
        'submenu': [
            {'menu': 'Lista de Pedidos', 'url': route('consultor.pedidos.index')},
            {'menu': 'Históricos', 'url': route('consultor.historicos.index')},
        ]
    }, {
        'menu': 'Clientes',
        'icone': <PeopleAltOutlinedIcon/>,
        'submenu': [
            {'menu': 'Lista de Clientes', 'url': route('consultor.leads.main.index')},
            {'menu': 'Cadastrar Cliente', 'url': route('consultor.leads.main.create')},
        ]
    }, {
        'menu': 'Produtos',
        'icone': <Inventory2OutlinedIcon/>,
        'submenu': [
            {'menu': 'Lista de Produtos', 'url': route('consultor.pedidos.produtos.index')},
        ]
    }, {
        'menu': 'Chat Interno',
        'tag': 'chat-interno',
        'icone': <QuestionAnswerOutlinedIcon/>,
        'submenu': [
            {'menu': 'Mensagens', 'url': route('consultor.chat-interno.index'), 'tag': 'mensagens'},
        ]
    }, {
        'menu': 'SAC',
        'icone': <SpeakerNotesOutlinedIcon/>,
        'submenu': [
            {'menu': 'Chamados', 'url': route('consultor.chamados.index')},
        ]
    }, {
        'menu': 'Perfil',
        'icone': <ManageAccountsOutlinedIcon/>,
        'submenu': [
            {'menu': 'Sua Conta', 'url': route('consultor.perfil.index')},
        ]
    },
];
