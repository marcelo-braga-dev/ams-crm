// material-ui
import {useTheme} from '@mui/material/styles';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled.js';
import {ButtonBase} from '@mui/material';
import Avatar from "@mui/material/Avatar";

const DrawerHeader = ({open}) => {
    const theme = useTheme();

    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={open} className="mt-2">
            <ButtonBase disableRipple href="/">
                <img alt="Logo" loading="lazy" style={{maxHeight: 70}}
                     src="/storage/app/logo.png"/>
            </ButtonBase>
        </DrawerHeaderStyled>
    );
};

export default DrawerHeader;
