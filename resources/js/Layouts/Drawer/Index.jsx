import {useContext, useMemo, useState} from 'react';

import {useTheme} from '@mui/material/styles';
import {Box, Drawer, useMediaQuery} from '@mui/material';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled.js';
import AuthProvider from '@/Layouts/Contexts/Context'

const MainDrawer = ({window, _toggleMenu}) => {
    const theme = useTheme();
    const {toggleMenu, menuToggle} = useContext(AuthProvider);
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
    const container = window !== undefined ? () => window().document.body : undefined;

    // header content
    const drawerHeader = useMemo(() => <DrawerHeader open={toggleMenu}/>, [toggleMenu]);
    const drawerContent = useMemo(() => <DrawerContent/>, []);

    const [timeoutId, setTimeoutId] = useState(null);

    const handleMouseEnter = () => {
        clearTimeout(timeoutId);  // Limpa qualquer timeout anterior
        const id = setTimeout(() => {
            menuToggle(true);
        }, 300);  // Atraso de 1 segundo
        setTimeoutId(id);  // Armazena o ID do timeout
    };

    const handleMouseLeave = () => {
        if(!_toggleMenu) return;
        clearTimeout(timeoutId);  // Limpa qualquer timeout anterior
        const id = setTimeout(() => {
            menuToggle(false);
        }, 300);  // Atraso de 1 segundo
        setTimeoutId(id);  // Armazena o ID do timeout
    };

    return (
        <Box component="nav" sx={{flexShrink: {md: 0}, zIndex: 1300}}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
        >
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
