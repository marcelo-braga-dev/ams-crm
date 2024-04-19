// material-ui
import { Box } from '@mui/material';

// project import
import NavGroup from './NavGroup.jsx';
import menuItem from '@/Layouts/VendedorLayout/menu-items/index';
import { useState } from 'react';

const Navigation = ({ menu, permissoes }) => {
    let per = false
    const navGroups = menuItem.items.map((item) => {
        item.children.map(key => {
            if (permissoes?.[key.id]) per = true
        })

        if (per) switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} menu={menu} permissoes={permissoes} />;
            default:
                return '';
        }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
