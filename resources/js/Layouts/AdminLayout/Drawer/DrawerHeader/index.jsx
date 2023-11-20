// material-ui
import {useTheme} from '@mui/material/styles';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled.js';
import {ButtonBase} from '@mui/material';

const DrawerHeader = ({open}) => {
    const theme = useTheme();

    return (
        // only available in paid version
        <DrawerHeaderStyled theme={theme} open={open} className="px-4 mt-2">
            <ButtonBase disableRipple href="/">
                <img src="/storage/app/logo.png" width="100%" alt="Logo"/>
            </ButtonBase>
        </DrawerHeaderStyled>
    );
};

export default DrawerHeader;
