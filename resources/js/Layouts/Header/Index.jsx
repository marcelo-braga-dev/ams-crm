import {useTheme} from '@mui/material/styles';
import {AppBar, IconButton, Toolbar, useMediaQuery} from '@mui/material';

import AppBarStyled from './AppBarStyled.js';
import HeaderContent from './HeaderContent/Index';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import React from "react";

const appBar = {
    position: 'fixed',
    color: 'inherit',
    elevation: 0,
};

const Header = ({toggleMenu, titlePage, voltar}) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    const mainHeader = (
        <Toolbar style={{borderBottom: '1px solid #f4f4f4'}}>
            <IconButton disableRipple edge="start" disabled={!!!voltar} href={voltar}>
                {!!voltar && <ArrowBackOutlinedIcon sx={{fontSize: 18}}/>}
            </IconButton>
            <HeaderContent titlePage={titlePage}/>
        </Toolbar>
    );

    return matchDownMD
        ? <AppBar {...appBar}>{mainHeader}</AppBar>
        : <AppBarStyled open={toggleMenu} {...appBar}>{mainHeader}</AppBarStyled>
};

export default Header;
