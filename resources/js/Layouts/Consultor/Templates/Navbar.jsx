import React, {useEffect} from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/NotificationsNone";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {useForm, usePage} from "@inertiajs/react";

import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import NotificacoesNav from "@/Components/Alerts/NotificacoesNav";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

export default function Navbar({titlePage}) {
    const {props} = usePage()
    const [qtdLeads, setQtdLeads] = React.useState();
    const [qtdPedidos, setQtdPedidos] = React.useState();
    const [qtdChatInterno, setChatInterno] = React.useState();

    // MENU PERFIL
    const settings = [
        {'title': 'Perfil', 'url': route('consultor.perfil.index')}
    ];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const {post} = useForm();

    function submit(e) {
        post(route('logout'));
    }

    // MENU PERFIL - FIM

    return (<>
            <NotificacoesNav url={route('consultor.notificacoes.pedidos.show', 0)}
                             urlPageChat={route('consultor.chat-interno.index')}
                             setQtdPedidos={setQtdPedidos} setChatInterno={setChatInterno} setQtdLeads={setQtdLeads}/>
            <nav className="navbar navbar-main navbar-expand-lg pb-3" id="navbarBlur"
                 data-scroll="false"  style={{"backgroundColor": "#252525"}}>
                <div className="container-fluid py-1 mt-2">
                    <nav aria-label="breadcrumb">
                        <h6 className="font-weight-bolder text-white mb-0">{titlePage}</h6>
                    </nav>
                    <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
                        <div className="ms-md-auto pe-md-3 d-flex align-items-center"></div>
                        <ul className="navbar-nav  justify-content-end">

                            {/*HamburguemMenu*/}
                            <li className="nav-item d-xl-none mx-2 d-flex align-items-center">
                                <div className="nav-link text-white p-0" id="iconNavbarSidenav">
                                    <div className="sidenav-toggler-inner">
                                        <i className="sidenav-toggler-line bg-white"></i>
                                        <i className="sidenav-toggler-line bg-white"></i>
                                        <i className="sidenav-toggler-line bg-white"></i>
                                    </div>
                                </div>
                            </li>

                            {/*ChatInterno*/}
                            <li className="nav-item dropdown mx-3 d-flex align-items-center">
                                <a href={route('consultor.chat-interno.index')}>
                                    <Badge badgeContent={qtdChatInterno} color="error">
                                        <QuestionAnswerIcon style={{color: 'white'}}/>
                                    </Badge>
                                </a>
                            </li>

                            {/*LEADS*/}
                            <li className="nav-item dropdown mx-3 d-flex align-items-center">
                                <a href={route('consultor.notificacoes.leads.index')}>
                                    <Badge badgeContent={qtdLeads} color="error">
                                        <PermPhoneMsgIcon style={{color: 'white'}}/>
                                    </Badge>
                                </a>
                            </li>

                            {/*Notificacoes*/}
                            <li className="nav-item dropdown mx-3 d-flex align-items-center">
                                <a href={route('consultor.notificacoes.pedidos.index')}>
                                    <Badge badgeContent={qtdPedidos} color="error">
                                        <NotificationsIcon style={{color: 'white'}}/>
                                    </Badge>
                                </a>
                            </li>

                            <li className="nav-item d-flex align-items-center mx-4">
                                <Box sx={{flexGrow: 0}}>
                                    <Tooltip title="Configurações">
                                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                            <Badge
                                                overlap="circular"
                                                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                                                badgeContent={
                                                    <span className="badge rounded-pill bg-white">
                                                        <i style={{fontSize: 12}}
                                                           className=" text-dark fas fa-user-cog"/>
                                                    </span>
                                                }>
                                                <Avatar src={props.foto_usuario}/>
                                            </Badge>
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{mt: '45px'}}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map(({title, url}, i) => (
                                            <Typography key={i} color={"black"} variant={"inherit"} component={"a"}
                                                        href={url}>
                                                <MenuItem key={i} onClick={handleCloseUserMenu}>
                                                    {title}
                                                </MenuItem>
                                            </Typography>
                                        ))}
                                        <div onClick={() => submit()} style={{minWidth: 150}}>
                                            <MenuItem key="Sair" onClick={handleCloseUserMenu}>
                                                Sair
                                            </MenuItem>
                                        </div>
                                    </Menu>
                                </Box>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
