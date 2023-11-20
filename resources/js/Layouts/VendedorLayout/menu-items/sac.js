import * as React from "react";

import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";

const dashboard = {
    id: 'sac',
    title: 'SAC',
    type: 'group',
    children: [{
        id: 'sac-chamados',
        title: 'Chamados',
        type: 'item',
        url: route('consultor.chamados.index'),
        icon: SpeakerNotesOutlinedIcon,
        breadcrumbs: false
    }
    ]
};

export default dashboard;
