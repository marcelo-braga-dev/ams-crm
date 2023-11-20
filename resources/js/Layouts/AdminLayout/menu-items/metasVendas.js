import * as React from "react";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'meta-vendas',
            title: 'Metas de Vendas',
            type: 'collapse',
            url: undefined,
            icon: TrendingUpOutlinedIcon,
            submenu: [
                {
                    id: 'meta-vendas-consultores',
                    title: 'Consultores',
                    type: 'item',
                    url: route('admin.metas-vendas.consultores.index'),
                },
                {
                    id: 'meta-vendas-comissoes',
                    title: 'Comissões',
                    type: 'item',
                    url: route('admin.metas-vendas.comissoes.index'),
                },
            ]
        }
    ]
};

export default dashboard;
