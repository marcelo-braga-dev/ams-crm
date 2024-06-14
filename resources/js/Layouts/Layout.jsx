import {useState} from "react";
import {Box, Container} from "@mui/material";
import {Head, usePage} from "@inertiajs/react";

import Header from './Header/Index'
import Drawer from './Drawer/Index'
import Content from './Content/Box'

export default function Layout({children, titlePage, voltar, menu, submenu}) {
    const permissoes = usePage().props._permissoesUsuario
    const [toggleMenu, setToggleMenu] = useState(true)

    return (
        <Box sx={{display: 'flex', width: '100%'}}>
            <Head title={titlePage}/>
            <Header toggleMenu={toggleMenu} titlePage={titlePage} voltar={voltar} setToggleMenu={setToggleMenu}/>
            <Drawer toggleMenu={toggleMenu} permissoes={permissoes} menu={menu} submenu={submenu}/>

            <Content open={toggleMenu}>
                <Container maxWidth={false}>
                    {children}
                </Container>
            </Content>
        </Box>
    )
}
