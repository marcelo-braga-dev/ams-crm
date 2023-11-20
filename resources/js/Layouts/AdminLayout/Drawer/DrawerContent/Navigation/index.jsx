import * as React from "react";

import {Box} from '@mui/material';

import NavGroup from './Navs/NavGroup';
import menuItems from '@/Layouts/AdminLayout/menu-items/index';

const Navigation = ({menu}) => {
    const menuSidebar = ''
    const submenuSidebar = ''

    const navGroups = menuItems.items.map((item) => {
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} menu={menu}/>;
            default:
                return '';
        }
    });

    return (
        <Box sx={{pt: 2}}>
            <div className="accordion accordion-flush mb-6" id="accordionFlushSidebar">
                {navGroups}
            </div>
        </Box>
    );
};

export default Navigation;
