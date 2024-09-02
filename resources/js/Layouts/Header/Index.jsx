import {useTheme} from '@mui/material/styles';
import {AppBar, IconButton, Stack, Toolbar, useMediaQuery} from '@mui/material';

import AppBarStyled from './AppBarStyled.js';
import HeaderContent from './HeaderContent/Index';

import React from "react";
import {ArrowLeftShort, TextIndentLeft, TextIndentRight} from "react-bootstrap-icons";
import AuthProvider from '@/Layouts/Contexts/Context'

const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
};
import {useContext} from 'react';
import {Link} from "@inertiajs/react";
import {drawerMinWidth} from '@/Themes/config.js';

const Header = ({titlePage, voltar}) => {
    const {toggleMenu, menuToggle, app_settings} = useContext(AuthProvider);

    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    const handleVoltar = () => {
        window.history.back();
    };

    const mainHeader = (
        <Toolbar style={{borderBottom: '1px solid #f4f4f4', paddingLeft: (!toggleMenu && (drawerMinWidth + 7)), backgroundColor: app_settings.header_bgcolor}}>
            <Stack direction="row" spacing={1}>
                <IconButton disableRipple edge="start" onClick={() => {
                    menuToggle(!toggleMenu)
                    sessionStorage.setItem('_toggleMenu', toggleMenu);
                }}>
                    {toggleMenu ? <TextIndentRight size="22" color="black"/> : <TextIndentLeft size="22" color="black"/>}
                </IconButton>
                <IconButton disableRipple edge="start" className="m-0" onClick={handleVoltar} disabled={!!!voltar}>
                    {/*<Link href={voltar}>*/}
                        {!!voltar && <ArrowLeftShort size="20" color="black"/>}
                    {/*</Link>*/}
                </IconButton>
            </Stack>
            <HeaderContent titlePage={titlePage}/>
        </Toolbar>
    );

    return matchDownMD
        ? <AppBar {...appBar}>{mainHeader}</AppBar>
        : <AppBarStyled open={toggleMenu} {...appBar}>{mainHeader}</AppBarStyled>
};

export default Header;
