import * as React from "react";

import { Box } from '@mui/material';

import NavGroup from './Navs/NavGroup';
import menuItems from '@/Layouts/AdminLayout/menu-items/index';

const Navigation = ({ menu, submenu, permissoes }) => {

    const navGroups = menuItems.items.map((item, index) => {
        let mostrarAba = false
        item.children.map(keys => {
            keys.submenu.map(key => {
                if (permissoes?.[key.chave]) mostrarAba = true
            })
        })

        if (mostrarAba) switch (item.type) {
            case 'group':
                return <NavGroup key={index} item={item} menu={menu} submenu={submenu} permissoes={permissoes} />;
            default:
                return <></>;
        }
    });

    return (
        <Box sx={{ pt: 2 }}>
            <div className="mb-6 accordion accordion-flush" id="accordionFlushSidebar">
                {navGroups}
            </div>
        </Box>
    );
};

export default Navigation;
