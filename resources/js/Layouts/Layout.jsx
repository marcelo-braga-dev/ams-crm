import React, {useState} from "react";
import {Box, Container} from "@mui/material";
import {Head, usePage} from "@inertiajs/react";

import Header from './Header/Index'
import Drawer from './Drawer/Index'
import Content from './Content/Box'
import ModalsAlerts from "@/Components/Modals/AlertsModals";

import {AuthProvider} from './Contexts/Context';
import ChatNotificacoes from "@/Components/Alerts/ChatNotificacoes.jsx";

export default function Layout({children, titlePage, voltar, menu, submenu}) {
    const {app_settings} = usePage().props;

    const _toggleMenu = sessionStorage.getItem('_toggleMenu') === 'true';
    const [toggleMenu, setToggleMenu] = useState(!_toggleMenu)

    const menuToggle = (value) => {
        setToggleMenu(value)
    }

    document.body.style.backgroundColor = app_settings.bg_color

    return (
        <Box sx={{display: 'flex', width: '100%'}}>
            <Head title={`${titlePage} - ${app_settings.app_name}`}/>
            <ModalsAlerts/>
            <AuthProvider menu={menu} submenu={submenu} menuToggle={menuToggle} toggleMenu={toggleMenu}>
                <ChatNotificacoes/>
                <Header titlePage={titlePage} voltar={voltar}/>
                <Drawer _toggleMenu={_toggleMenu}/>

                <Content open={toggleMenu}>
                    <Container maxWidth={false}>
                        {children}
                    </Container>
                </Content>
            </AuthProvider>
        </Box>
    )
}
