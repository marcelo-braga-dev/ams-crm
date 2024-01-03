import {useTheme} from '@mui/material/styles';
import {AppBar, IconButton, Toolbar, useMediaQuery} from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled.js';
import HeaderContent from './HeaderContent/Index';

// assets
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import {usePage} from "@inertiajs/react";

const Header = ({open, titlePage, voltar, handleDrawerToggle}) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    const franquias = usePage().props.franquias
    const franquia_selecionada = parseInt(usePage().props.franquia_selecionada)
    const franquia_cor = franquias[franquias.findIndex((item) => item.id === franquia_selecionada)]?.cor

    // common header
    const mainHeader = (
        <Toolbar sx={{backgroundColor: franquia_cor}}>
            <IconButton
                disableRipple
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{color: 'black', bgcolor: 'white', ml: {xs: 0, lg: -2}}}
                className="me-1"
            >
                {!open ? <MenuIcon/> : <MenuOpenIcon/>}
            </IconButton>
            <HeaderContent titlePage={titlePage} voltar={voltar}/>
        </Toolbar>
    );

    // app-bar params
    const appBar = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
            borderBottom: `1px solid ${theme.palette.divider}`
        }
    };

    return (
        <>
            {!matchDownMD ? (
                <AppBarStyled open={open} {...appBar}>
                    {mainHeader}
                </AppBarStyled>
            ) : (
                <AppBar {...appBar}>{mainHeader}</AppBar>
            )}
        </>
    );
};

export default Header;
