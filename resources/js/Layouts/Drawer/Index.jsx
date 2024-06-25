import {useContext, useMemo} from 'react';

import {useTheme} from '@mui/material/styles';
import {Box, Drawer, useMediaQuery} from '@mui/material';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled.js';
import AuthProvider from '@/Layouts/Contexts/Context'

const MainDrawer = ({window}) => {
    const theme = useTheme();
    const {toggleMenu, menuToggle} = useContext(AuthProvider);
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
    const container = window !== undefined ? () => window().document.body : undefined;

    // header content
    const drawerHeader = useMemo(() => <DrawerHeader open={toggleMenu}/>, [toggleMenu]);
    const drawerContent = useMemo(() => <DrawerContent/>, []);

    return (
        <Box component="nav" sx={{flexShrink: {md: 0}, zIndex: 1300}} onMouseEnter={() => menuToggle(true)} onMouseLeave={() => menuToggle(false)}>
            {!matchDownMD ? (
                <MiniDrawerStyled variant="permanent" open={toggleMenu}>
                    {drawerHeader}
                    {drawerContent}
                </MiniDrawerStyled>
            ) : (
                <Drawer
                    container={container}
                    variant="temporary"
                    open={toggleMenu}
                    onClose={() => menuToggle(e => !e)}
                    ModalProps={{keepMounted: true}}
                    sx={{
                        display: {xs: 'block', lg: 'none'},
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: 260,
                            borderRight: `1px solid ${theme.palette.divider}`,
                            backgroundImage: 'none',
                            boxShadow: 'inherit'
                        }
                    }}
                >
                    {toggleMenu && drawerHeader}
                    {toggleMenu && drawerContent}
                </Drawer>
            )}
        </Box>
    );
};

export default MainDrawer;
