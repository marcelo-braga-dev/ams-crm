import {Box, Typography, useMediaQuery} from '@mui/material';
import Profile from './Profile';
import MobileSection from './MobileSection.jsx';
import NotificacoesIconesAdmin from "./Icones/AdminNotificacoesIcones.jsx";
import AuthProvider from '@/Layouts/Contexts/Context'
import {useContext} from "react";
import ConsultorNotificacoesIcones from "./Icones/ConsultorNotificacoesIcones.jsx";
import IntegradorNotificacoesIcones from "./Icones/IntegradorNotificacoesIcones.jsx";

const HeaderContent = ({titlePage}) => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const {funcaoUsuario, userTipo} = useContext(AuthProvider);

    const isIntegrador = userTipo === 'integrador'

    return (
        <>
            <div className="row w-100 text-truncate">
                <Typography color="black">{titlePage}</Typography>
            </div>

            {funcaoUsuario ? <NotificacoesIconesAdmin/> : (isIntegrador ? <IntegradorNotificacoesIcones/> : <ConsultorNotificacoesIcones/>)}

            {!matchesXs && <Profile/>}
            {matchesXs && <MobileSection/>}
        </>
    );
};

export default HeaderContent;
