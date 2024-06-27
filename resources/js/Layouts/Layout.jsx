import React, {useState} from "react";
import {Box, Container} from "@mui/material";
import {Head} from "@inertiajs/react";

import Header from './Header/Index'
import Drawer from './Drawer/Index'
import Content from './Content/Box'
import ModalsAlerts from "@/Components/Modals/AlertsModals";

import {AuthProvider} from './Contexts/Context';

export default function Layout({children, titlePage, voltar, menu, submenu}) {

    const _toggleMenu = sessionStorage.getItem('_toggleMenu') === 'true';
    const [toggleMenu, setToggleMenu] = useState(!_toggleMenu)

    const menuToggle = (value) => {
        setToggleMenu(value)
        sessionStorage.setItem('_toggleMenu', !value);
    }

    return (
        <Box sx={{display: 'flex', width: '100%'}}>
            <Head title={titlePage}/>
            <ModalsAlerts/>
            <AuthProvider menu={menu} submenu={submenu} menuToggle={menuToggle} toggleMenu={toggleMenu}>
                <Header titlePage={titlePage} voltar={voltar}/>
                <Drawer/>

                <Content open={toggleMenu}>
                    <Container maxWidth={false}>
                        {children}
                    </Container>
                </Content>
            </AuthProvider>
        </Box>
    )
}
