import * as React from "react";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'sac',
            title: 'SAC',
            type: 'collapse',
            url: undefined,
            icon: SpeakerNotesOutlinedIcon,
            submenu: [
                {
                    id: 'sac-chamdos',
                    title: 'Chamados',
                    type: 'item',
                    url: route('admin.chamado.index'),
                }
            ]
        }
    ]
};

export default dashboard;
