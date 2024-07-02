import {Box, Typography, useMediaQuery} from '@mui/material';
import Profile from './Profile';
import MobileSection from './MobileSection.jsx';
import NotificacoesIconesAdmin from "./Icones/NotificacoesIcones";
import AuthProvider from '@/Layouts/Contexts/Context'
import {useContext} from "react";
import NotificacoesIcones from '@/Layouts/Menus/Consultor/Navbar/NotificacoesIcones'

const HeaderContent = ({titlePage}) => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const {userTipo, funcaoUsuario} = useContext(AuthProvider);

    return (
        <>
            <div className="row w-100 text-truncate">
                <Typography color="black">{titlePage}</Typography>
            </div>

            {/*{(userTipo !== 'integrador') && <NotificacoesIconesAdmin/>}*/}
            {funcaoUsuario ? <NotificacoesIconesAdmin/> : <NotificacoesIcones/>}

            {!matchesXs && <Profile/>}
            {matchesXs && <MobileSection/>}
        </>
    );
};

export default HeaderContent;
