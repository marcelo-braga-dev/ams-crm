// material-ui
import { Box } from '@mui/material';

// project import
import NavGroup from './NavGroup.jsx';
import menuItem from '@/Layouts/VendedorLayout/menu-items/index';
import { useState } from 'react';

const Navigation = ({ menu, permissoes }) => {

    const navGroups = menuItem.items.map((item) => {

        let mostrarAba = false
        item.children.map(key => {
            if (permissoes?.[key.chave] || !key.chave) mostrarAba = true
        })

        if (mostrarAba) switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} menu={menu} permissoes={permissoes} />;
            default:
                return '';
        }
    });

    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
