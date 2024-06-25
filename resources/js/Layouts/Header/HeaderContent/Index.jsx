import {Box, useMediaQuery} from '@mui/material';
import Profile from './Profile';
import MobileSection from './MobileSection.jsx';
import NotificacoesIcones from "./Icones/NotificacoesIcones";
import AuthProvider from '@/Layouts/Contexts/Context'
import {useContext} from "react";

const HeaderContent = ({titlePage}) => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const {userTipo} = useContext(AuthProvider);

    return (
        <>
            <div className="row ms-2 w-100 text-truncate">
                {titlePage}
            </div>

            {userTipo !== 'integrador' && <NotificacoesIcones/>}

            {!matchesXs && <Profile/>}
            {matchesXs && <MobileSection/>}
        </>
    );
};

export default HeaderContent;
