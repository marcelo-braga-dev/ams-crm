// material-ui
import {styled} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

// project import
import {drawerWidth, drawerMinWidth} from '@/Themes/config.js';

const openedMixin = (theme, settings) => ({
    width: drawerWidth,
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden',
    boxShadow: 'none',
    backgroundColor: settings?.navbar_bgcolor
});

const closedMixin = (theme, settings) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: drawerMinWidth,
    borderRight: 'none',
    boxShadow: theme.customShadows.z1,
    backgroundColor: settings?.navbar_bgcolor
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerStyled =
    styled(Drawer, {
        shouldForwardProp: (prop) => prop !== 'open'
    })
    (({theme, open, settings}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme, settings)
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme, settings)
        })

    }));

export default MiniDrawerStyled;
