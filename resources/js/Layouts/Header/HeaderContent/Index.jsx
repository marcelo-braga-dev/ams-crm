// material-ui
import { Box, useMediaQuery } from '@mui/material';

// project import
import Search from './Search.jsx';
import Profile from './Profile';
import MobileSection from './MobileSection.jsx';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificacoesIcones from "./Icones/NotificacoesIcones";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { router, usePage } from "@inertiajs/react";
import { isAdmin } from "@/Helpers/helper";

const HeaderContent = ({ titlePage }) => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    return (
        <>
            <div className="row w-100 text-truncate">
                <div className="mx-3 col-10 text-truncate">
                    {titlePage}
                </div>
            </div>

            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}

            <NotificacoesIcones  />

            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
};

export default HeaderContent;
