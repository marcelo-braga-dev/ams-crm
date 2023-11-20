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
            submenu: [
                {
                    id: 'config-setores',
                    title: 'Setores',
                    type: 'item',
                    url: route('admin.config.categorias.index'),
                }
            ]
        }
    ]
};

export default dashboard;
