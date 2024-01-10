// material-ui
import {Box, useMediaQuery} from '@mui/material';

// project import
import Search from './Search.jsx';
import Profile from './Profile';
import MobileSection from './MobileSection.jsx';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NotificacoesIcones from "./Icones/NotificacoesIcones";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {router, usePage} from "@inertiajs/react";
import {isAdmin} from "@/Helpers/helper";

const HeaderContent = ({titlePage, voltar}) => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const franquias = usePage().props.franquias
    const franquia_selecionada = usePage().props.franquia_selecionada
    const franquia = franquias[franquias.findIndex((item) => item.id === parseInt(franquia_selecionada))]

    const selecionaFranquia = (id) => {
        router.post(route('admin.franquias.seleciona-franquia', {id: id}))
    }

    return (
        <>
            {/*{!matchesXs && <Search />}*/}
            <div className="row w-100 text-truncate">
                <div className="col-10 text-truncate mx-3" style={{color: franquia?.cor_texto}}>
                    {titlePage}
                    {voltar && <a className="ms-4" style={{color: franquia?.cor_texto}} href={voltar}><ArrowBackIcon sx={{fontSize: 16}}/></a>}
                </div>
            </div>

            {isAdmin() && <div className="row w-100 text-truncate">
                <div className="col-8 text-truncate pt-2">
                    <TextField label="Franquia" select fullWidth size="small" className="bg-white rounded"
                               defaultValue={franquia_selecionada ?? ''}
                               onChange={e => selecionaFranquia(e.target.value)}>
                        <MenuItem value="">Todas</MenuItem>
                        {franquias.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                    </TextField>
                </div>
            </div>}

            {matchesXs && <Box sx={{width: '100%', ml: 1}}/>}

            <NotificacoesIcones corTexto={franquia?.cor_texto  ?? 'black'} />

            {!matchesXs && <Profile/>}
            {matchesXs && <MobileSection/>}
        </>
    );
};

export default HeaderContent;
