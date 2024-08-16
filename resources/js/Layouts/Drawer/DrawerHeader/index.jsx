// material-ui
import {useTheme} from '@mui/material/styles';
import AuthProvider from '@/Layouts/Contexts/Context'

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled.js';
import {ButtonBase} from '@mui/material';
import Avatar from "@mui/material/Avatar";
import {useContext} from "react";

const DrawerHeader = ({open}) => {
    const theme = useTheme();
    const {toggleMenu, menuToggle, app_settings} = useContext(AuthProvider);

    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={true} className="mt-2">
            <ButtonBase disableRipple href="/">
                <img alt="Logo" style={{maxHeight: 70}} src={app_settings.logo}/>
            </ButtonBase>
        </DrawerHeaderStyled>
    );
};

export default DrawerHeader;
