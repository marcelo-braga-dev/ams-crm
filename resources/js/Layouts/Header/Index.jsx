import {useTheme} from '@mui/material/styles';
import {AppBar, IconButton, Stack, Toolbar, Typography, useMediaQuery} from '@mui/material';

import AppBarStyled from './AppBarStyled.js';
import HeaderContent from './HeaderContent/Index';

import React from "react";
import {ArrowLeft, ArrowLeftShort, TextIndentLeft, TextIndentRight} from "react-bootstrap-icons";
import AuthProvider from '@/Layouts/Contexts/Context'

const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
};
import { useContext } from 'react';
const Header = ({titlePage, voltar}) => {
    const {toggleMenu, menuToggle} = useContext(AuthProvider);

    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    const mainHeader = (
        <Toolbar style={{borderBottom: '1px solid #f4f4f4'}}>
            <Stack direction="row" spacing={1}>
                <IconButton disableRipple edge="start" onClick={() => menuToggle(e => !e)}>
                    {toggleMenu ? <TextIndentRight size="22"/> : <TextIndentLeft size="22"/>}
                </IconButton>
                <IconButton disableRipple edge="start" disabled={!!!voltar} href={voltar}>
                    {!!voltar && <ArrowLeftShort size="22"/>}
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
