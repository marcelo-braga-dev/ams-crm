import * as React from "react";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'agenda',
            title: 'Agenda',
            type: 'collapse',
            url: undefined,
            icon: RequestPageOutlinedIcon,
            submenu: [
                {
                    id: 'agenda-calendario',
                    title: 'Calendário',
                    type: 'item',
                    url: route('admin.agenda.calendario.index'),
                }
            ]
        }
    ]
};

export default dashboard;
