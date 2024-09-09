// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';

// project imports
import config from '@/Template/Berry/config';
import Logo from '@/Template/Berry/ui-component/Logo';
import {MENU_OPEN} from '@/Template/Berry/store/actions';
import {Link} from "@inertiajs/react";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    // const defaultId = useSelector((state) => state.customization.defaultId);
    // const dispatch = useDispatch();
    return (<Logo/>
        // <ButtonBase disableRipple onClick={() => {
        // }} component={<Link/>} to={config.defaultPath}>
        //     <Logo/>
        // </ButtonBase>
    );
};

export default LogoSection;
