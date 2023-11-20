import * as React from "react";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'emails',
            title: 'E-mails',
            type: 'collapse',
            url: undefined,
            icon: EmailOutlinedIcon,
            submenu: [
                {
                    id: 'emails-entrada',
                    title: 'Caixa de Entrada',
                    type: 'item',
                    url: route('admin.emails.index'),
                }, {
                    id: 'emails-enviar',
                    title: 'Enviar Email',
                    type: 'item',
                    url: route('admin.emails.create'),
                }, {
                    id: 'emails-config',
                    title: 'Configurações',
                    type: 'item',
                    url: route('admin.emails.config'),
                },
            ]
        }
    ]
};

export default dashboard;
