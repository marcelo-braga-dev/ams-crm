// material-ui
import {styled} from '@mui/material/styles';
import {Box} from "@mui/material";

// project import
import {drawerWidth} from '@/Themes/config.js';

// ==============================|| HEADER - APP BAR STYLED ||============================== //

const BoxStyled = styled(Box)(({theme, open}) => ({
    width: '100%',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginTop: '6em',
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

export default BoxStyled;
