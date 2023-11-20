// material-ui
import {Box, useMediaQuery} from '@mui/material';

// project import
import Search from './Search.jsx';
import Profile from './Profile';
import MobileSection from './MobileSection.jsx';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificacoesIcones from "./Icones/NotificacoesIcones";

const HeaderContent = ({titlePage, voltar}) => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <>
            {/*{!matchesXs && <Search />}*/}
            <div className="row w-100 text-truncate">
                <div className="col-12 text-truncate">
                    {titlePage}
                    {voltar && <a className="text-muted ms-4" href={voltar}><ArrowBackIcon sx={{fontSize: 16}}/></a>}
                </div>
            </div>
            {matchesXs && <Box sx={{width: '100%', ml: 1}}/>}

            <NotificacoesIcones/>

            {!matchesXs && <Profile/>}
            {matchesXs && <MobileSection/>}
        </>
    );
};

export default HeaderContent;
