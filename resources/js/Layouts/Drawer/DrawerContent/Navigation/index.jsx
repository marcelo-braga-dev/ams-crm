import * as React from "react";

import {Box} from '@mui/material';

import NavGroup from './Navs/NavGroup';
import menuItemsAdmin from '@/Layouts/AdminLayout/menu-items/index';
import menuItemsColsultor from '@/Layouts/VendedorLayout/menu-items/index';
import {usePage} from "@inertiajs/react";

const Navigation = ({menu, submenu, permissoes}) => {
    const funcao = usePage().props.auth.user.is_admin
    const menuItems = funcao ? menuItemsAdmin : menuItemsColsultor

    const navGroups = menuItems.items.map((item, index) => {
        let mostrarAba = false
        item.children.map(keys => {
            keys.submenu?.map(key => {
                if (permissoes?.[key.chave]) mostrarAba = true
            })
        })

        if (mostrarAba) return <NavGroup key={index} item={item} menu={menu} submenu={submenu} permissoes={permissoes}/>
    });

    return (
        <Box sx={{pt: 2}}>
            <div className="accordion accordion-flush" id="accordionFlushSidebar">
                {navGroups}
            </div>
        </Box>
    );
};

export default Navigation;
