import * as React from "react";

import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'menu-meta-vendas',
            title: 'Metas de Vendas',
            type: 'collapse',
            url: undefined,
            icon: TrendingUpOutlinedIcon,
            admin: true,
            submenu: [
                {
                    id: 'meta-vendas',
                    title: 'Meta de Vendas',
                    type: 'item',
                    url: route('admin.metas-vendas.consultores.index'),
                }
            ]
        }
    ]
};

export default dashboard;
