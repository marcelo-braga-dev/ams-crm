import AuthProvider from '@/Layouts/Contexts/Context'

import {Box, ButtonBase} from '@mui/material';
import {useContext} from "react";

const DrawerHeader = ({open}) => {
    const {app_settings} = useContext(AuthProvider);

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 70,
            margin: 1
        }}>
            <ButtonBase disableRipple href="/" sx={{paddingInline: 3}}>
                <img alt="Logo" style={{maxHeight: 70}} src={app_settings.logo}/>
            </ButtonBase>
        </Box>
    );
};

export default DrawerHeader;
