import * as React from "react";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'fornecedores',
            title: 'Fornecedores',
            type: 'collapse',
            url: undefined,
            icon: RequestPageOutlinedIcon,
            submenu: [
                {
                    id: 'fornecedores-cadastrados',
                    title: 'Cadastrados',
                    type: 'item',
                    url: route('admin.fornecedores.index'),
                }
            ]
        }
    ]
};

export default dashboard;
