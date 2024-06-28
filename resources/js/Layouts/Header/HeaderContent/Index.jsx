import {Box, Typography, useMediaQuery} from '@mui/material';
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
            <div className="row w-100 text-truncate">
                <Typography color="black">{titlePage}</Typography>
            </div>

            {userTipo !== 'integrador' && <NotificacoesIcones/>}

            {!matchesXs && <Profile/>}
            {matchesXs && <MobileSection/>}
        </>
    );
};

export default HeaderContent;
