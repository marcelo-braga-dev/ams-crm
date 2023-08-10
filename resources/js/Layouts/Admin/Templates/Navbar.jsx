import React, {useEffect, useState} from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from '@mui/icons-material/Notifications';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import {useForm, usePage} from "@inertiajs/react";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PeopleIcon from '@mui/icons-material/People';

import Popover from '@mui/material/Popover';

import NotificacoesNav from "@/Components/Alerts/NotificacoesNav";
import {List} from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import {styled} from '@mui/material/styles';


import Button from '@mui/material/Button';

const StyledBadge = styled(Badge)(({theme}) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

export default function Navbar({titlePage}) {
    const {props} = usePage()
    const {post} = useForm()

    const [qtdPedidos, setQtdPedidos] = useState();
    const [qtdChatInterno, setChatInterno] = useState();
    const [usuariosOnline, setUsuariosOnline] = useState([]);

    // MENU PERFIL
    const settings = [
        {title: 'Perfil', url: route('admin.perfil.config.edit', 0)}
    ];

    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    function submit(e) {
        post(route('logout'));
    }

    // MENU PERFIL - FIM

    // Online
    function getUsuariosOnline() {
        axios.post(route('geral.usuarios.usuarios-online')).then(response => {
            setUsuariosOnline(response.data)
        })

        setTimeout(function () {
            getUsuariosOnline();

        }, 60000)
    }

    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    useEffect(function () {
        getUsuariosOnline()
    }, [])
    // Online - fim


    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl2(null);
    };

    const open2 = Boolean(anchorEl2);
    const id = open ? 'simple-popover' : undefined;

    return (<>
            <NotificacoesNav url={route('admin.notificacoes.show', 0)} urlPageChat={route('admin.chat-interno.index')}
                             setQtdPedidos={setQtdPedidos} setChatInterno={setChatInterno}/>

            <nav className="navbar py-3 navbar-main navbar-expand-lg bg-white w-80 position-fixed top-0 z-index-2"
                 id="navbarBlur">
                <h6 className="ps-4 text-primary mb-0">{titlePage}</h6>

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

                        {/*Usuarios Online*/}

                        <li className="nav-item dropdown mx-3 d-flex align-items-center">
                            <div aria-describedby={id} onClick={handleClick2}>
                                <Badge badgeContent={usuariosOnline.length} color="success">
                                    <PeopleIcon className="text-primary"/>
                                </Badge>
                            </div>
                            <Popover
                                id={id}
                                open={open2}
                                anchorEl={anchorEl2}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                {usuariosOnline.length ? <List>
                                        {usuariosOnline.map((dado, index) => {
                                            return (
                                                <a key={index} href={route('admin.usuarios.consultores.show', dado.id)}>
                                                    <ListItem className=" pb-0">
                                                        <ListItemAvatar>
                                                            <StyledBadge
                                                                overlap="circular"
                                                                anchorOrigin={{
                                                                    vertical: 'bottom',
                                                                    horizontal: 'right'
                                                                }}
                                                                variant="dot">
                                                                <Avatar src={dado.foto}/>
                                                            </StyledBadge>

                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={dado.nome}
                                                            secondary={dado.setor_nome}
                                                        />
                                                    </ListItem>
                                                </a>
                                            )
                                        })}
                                    </List> :
                                    <small className="m-3">0 online</small>}
                            </Popover>
                        </li>

                        {/*<li className="nav-item dropdown mx-3 d-flex align-items-center">*/}
                        {/*    <div>*/}
                        {/*        <Typography*/}
                        {/*            aria-owns={open ? 'mouse-over-popover' : undefined}*/}
                        {/*            aria-haspopup="true"*/}
                        {/*            onMouseEnter={handlePopoverOpen}*/}
                        {/*            // onMouseLeave={handlePopoverClose}*/}
                        {/*        >*/}
                        {/*            <Badge badgeContent={usuariosOnline.length} color="success">*/}
                        {/*                <PeopleIcon className="text-primary"/>*/}
                        {/*            </Badge>*/}
                        {/*        </Typography>*/}
                        {/*        <Popover*/}
                        {/*            id="mouse-over-popover"*/}
                        {/*            sx={{*/}
                        {/*                pointerEvents: 'none',*/}
                        {/*            }}*/}
                        {/*            open={open}*/}
                        {/*            anchorEl={anchorEl}*/}
                        {/*            anchorOrigin={{*/}
                        {/*                vertical: 'bottom',*/}
                        {/*                horizontal: 'left',*/}
                        {/*            }}*/}
                        {/*            transformOrigin={{*/}
                        {/*                vertical: 'top',*/}
                        {/*                horizontal: 'left',*/}
                        {/*            }}*/}
                        {/*            onClose={handlePopoverClose}*/}
                        {/*            disableRestoreFocus*/}
                        {/*        >*/}
                        {/*            {usuariosOnline.length ? <List>*/}
                        {/*                    {usuariosOnline.map((dado, index) => {*/}
                        {/*                        return (*/}
                        {/*                            <ListItem key={index} className=" pb-0">*/}
                        {/*                                <ListItemAvatar>*/}
                        {/*                                    <StyledBadge*/}
                        {/*                                        overlap="circular"*/}
                        {/*                                        anchorOrigin={{*/}
                        {/*                                            vertical: 'bottom',*/}
                        {/*                                            horizontal: 'right'*/}
                        {/*                                        }}*/}
                        {/*                                        variant="dot">*/}
                        {/*                                        <Avatar src={dado.foto}/>*/}
                        {/*                                    </StyledBadge>*/}

                        {/*                                </ListItemAvatar>*/}
                        {/*                                <ListItemText*/}
                        {/*                                    primary={dado.nome}*/}
                        {/*                                    secondary={dado.setor_nome}*/}
                        {/*                                />*/}
                        {/*                            </ListItem>*/}
                        {/*                        )*/}
                        {/*                    })}*/}
                        {/*                </List> :*/}
                        {/*                <small className="m-3">0 online</small>}*/}
                        {/*        </Popover>*/}
                        {/*    </div>*/}
                        {/*</li>*/}

                        {/*ChatInterno*/}
                        <li className="nav-item dropdown mx-3 d-flex align-items-center">
                            <a href={route('admin.chat-interno.index')}>
                                <Badge badgeContent={qtdChatInterno} color="error">
                                    <QuestionAnswerIcon className="text-primary"/>
                                </Badge>
                            </a>
                        </li>

                        {/*Notificacoes*/}
                        <li className="nav-item dropdown mx-3 d-flex align-items-center">
                            <a href={route('admin.notificacoes.index')}>
                                <Badge badgeContent={qtdPedidos} color="error">
                                    <NotificationsIcon className="text-primary"/>
                                </Badge>
                            </a>
                        </li>

                        <li className="nav-item d-flex align-items-center mx-2">
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
                                        <Typography key={i} color={"black"} variant={"inherit"}
                                                    component={"a"}
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
            </nav>
        </>
    )
}
