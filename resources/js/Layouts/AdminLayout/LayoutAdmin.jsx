import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Container, useMediaQuery } from '@mui/material';

import { Head, usePage } from "@inertiajs/react";
import Card from "@mui/material/Card";

import Drawer from './Drawer';
import Header from './Header';
import ModalsAlerts from "@/Components/Modals/AlertsModals";

import BoxStyled from "./Content/Box";

const Layout = ({ titlePage, menu, submenu, children, voltar, empty }) => {
    const permissoes = usePage().props._permissoesUsuario
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
    const stateMenu = sessionStorage.getItem('menuOpen');

    const [open, setOpen] = useState(stateMenu === 'true' && !matchDownLG);

    const handleDrawerToggle = () => {
        sessionStorage.setItem('menuOpen', !open)
        setOpen(!open);
    };

    const handleDrawerToggle2 = () => {
    };

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Head title={titlePage} />
            <ModalsAlerts />
            <Header open={!open} titlePage={titlePage} voltar={voltar} handleDrawerToggle={handleDrawerToggle} />
            <Drawer open={!open} menu={menu} submenu={submenu} handleDrawerToggle={handleDrawerToggle2} permissoes={permissoes} />
            <BoxStyled open={!open}>
                <Container maxWidth={false}>
                    {empty ? children :
                        <Card className="p-3 mb-4" sx={{ minHeight: '85vh' }}>
                            {children}
                        </Card>
                    }
                </Container>
            </BoxStyled>
        </Box>
    );
};

export default Layout;
