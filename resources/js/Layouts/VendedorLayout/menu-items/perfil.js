import * as React from "react";

import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";

const dashboard = {
    id: 'perfil',
    title: 'Perfil',
    type: 'group',
    children: [{
        id: 'perfil-conta',
        title: 'Sua Conta',
        type: 'item',
        url: route('consultor.perfil.index'),
        icon: ManageAccountsOutlinedIcon,
        breadcrumbs: false
    }
    ]
};

export default dashboard;
