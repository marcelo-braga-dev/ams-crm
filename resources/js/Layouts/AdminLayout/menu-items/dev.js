import * as React from "react";

import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dev',
            title: 'Desenvolvimento',
            type: 'collapse',
            url: undefined,
            icon: LaptopMacOutlinedIcon,
            admin: true,
            submenu: [
                {
                    id: 'dev-registros',
                    title: 'Registros',
                    type: 'item',
                    url: route('admin.dev.index'),
                },
                {
                    id: 'dev-cadastrar',
                    title: 'Cadastrar',
                    type: 'item',
                    url: route('admin.dev.create'),
                },
            ]
        }
    ]
};

export default dashboard;
