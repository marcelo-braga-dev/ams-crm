import * as React from "react";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'config',
            title: 'Configurações',
            type: 'collapse',
            url: undefined,
            icon: SettingsSuggestOutlinedIcon,
            admin: true,
            submenu: [
                {
                    id: 'config-franquias',
                    title: 'Franquias',
                    type: 'item',
                    url: route('admin.franquias.index'),
                },{
                    id: 'config-fornecedores',
                    title: 'Fornecedores',
                    type: 'item',
                    url: route('admin.fornecedores.index'),
                }, {
                    id: 'config-setores',
                    title: 'Setores',
                    type: 'item',
                    url: route('admin.config.categorias.index'),
                },
            ]
        }
    ]
};

export default dashboard;
