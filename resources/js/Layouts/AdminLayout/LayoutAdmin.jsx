import React, {useEffect, useState} from 'react';
import {useTheme} from '@mui/material/styles';
import {Box, Container, useMediaQuery} from '@mui/material';

import {Head} from "@inertiajs/react";
import Card from "@mui/material/Card";

import Drawer from './Drawer';
import Header from './Header';
import ModalsAlerts from "@/Components/Modals/AlertsModals";

import BoxStyled from "./Content/Box";

const Layout = ({titlePage, menu, children, voltar}) => {
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));

    const [open, setOpen] = useState(true);
    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        setOpen(!matchDownLG);
    }, [matchDownLG]);

    return (
        <Box sx={{display: 'flex', width: '100%'}}>
            <Head title={titlePage}/>
            <ModalsAlerts/>
            <Header open={open} titlePage={titlePage} voltar={voltar} handleDrawerToggle={handleDrawerToggle}/>
            <Drawer open={open} menu={menu} handleDrawerToggle={handleDrawerToggle}/>
            <BoxStyled open={open}>
                <Container maxWidth="lg">
                    <Card className="p-3">
                        {children}
                    </Card>
                </Container>
            </BoxStyled>
        </Box>
    );
};

export default Layout;
