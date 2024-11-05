import * as React from "react";

import AuthProvider from '@/Layouts/Contexts/Context'
import {Box} from '@mui/material';
import NavGroup from './Navs/NavGroup';
import {useContext} from "react";

const Navigation = () => {
    const {menuItems, permissoes} = useContext(AuthProvider)

    const navGroups = menuItems.items.map((item, index) => {
        let mostrarAba = false

        item.children.map(keys => {
            keys.submenu?.map(key => {
                if (permissoes?.[key.chave] || key.chave === true) mostrarAba = true
            })
        })

        if (mostrarAba) return <NavGroup key={index} item={item}/>
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
