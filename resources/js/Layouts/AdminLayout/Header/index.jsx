import {useTheme} from '@mui/material/styles';
import {AppBar, IconButton, Toolbar, useMediaQuery} from '@mui/material';

// project import
import AppBarStyled from './AppBarStyled.js';
import HeaderContent from './HeaderContent/Index';

// assets
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({open, titlePage, voltar, handleDrawerToggle}) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    const iconBackColor = 'grey.100';
    const iconBackColorOpen = 'grey.200';

    // common header
    const mainHeader = (
        <Toolbar>
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
