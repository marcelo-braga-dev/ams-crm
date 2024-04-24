import * as React from "react";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'usuarios',
            title: 'Usuários',
            type: 'collapse',
            url: undefined,
            icon: PersonOutlineOutlinedIcon,
            admin: true,
            submenu: [
                {
                    id: 'usuarios-contas',
                    title: 'Contas de Usuários',
                    type: 'item',
                    url: route('admin.usuarios.usuario.index'),
                }, {
                    id: 'usuarios-funcoes',
                    title: 'Funções',
                    type: 'item',
                    url: route('admin.usuarios.funcoes.index'),
                }, {
                    id: 'usuarios-online',
                    title: 'Histórico Online',
                    type: 'item',
                    url: route('admin.usuarios.historico-online.index'),
                }, {
                    id: 'usuarios-migrar',
                    title: 'Migrar Conteúdo',
                    type: 'item',
                    url: route('admin.usuarios.migrar.index'),
                }
            ]
        }
    ]
};

export default dashboard;
