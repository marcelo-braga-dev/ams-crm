import {styled} from '@mui/material/styles';
import {Box} from "@mui/material";
import {drawerWidth} from '@/Themes/config.js';

const BoxStyled = styled(Box)(({theme, open}) => ({
    width: '100%',
    marginTop: '6em',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

export default BoxStyled;