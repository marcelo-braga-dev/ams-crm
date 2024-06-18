import { useMemo } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled.js';

const MainDrawer = ({ menu, submenu, permissoes, toggleMenu, setToggleMenu, window }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
    const container = window !== undefined ? () => window().document.body : undefined;

    // header content
    const drawerContent = useMemo(() => <DrawerContent menu={menu} submenu={submenu} permissoes={permissoes} />, []);
    const drawerHeader = useMemo(() => <DrawerHeader open={toggleMenu} />, [toggleMenu]);

    return (
        <Box component="nav" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }}>
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
                    onClose={() => setToggleMenu(e => !e)}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
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
