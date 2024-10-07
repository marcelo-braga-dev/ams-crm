import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { drawerWidth, drawerMinWidth } from '@/Themes/config.js';

const BoxStyled = styled(Box)(({ theme, open }) => ({
    width: `calc(100% - ${drawerMinWidth}px)`,

    // width: '100%',
    marginTop: '6em',
    paddingInline: '2em',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.down('lg')]: {
            width: `100%`,
        },
    }),

    [theme.breakpoints.down('lg')]: {
        paddingInline: '0.5em',
        width: `100%`,
    },
}));

export default BoxStyled;
