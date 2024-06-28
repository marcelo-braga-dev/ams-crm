import React, {useState, useEffect} from "react";
import RequestNotificacoes from "@/Layouts/AdminLayout/Header/HeaderContent/Icones/RequestNotificacoes";
import {Badge, IconButton, List} from "@mui/material";

import Popover from "@mui/material/Popover";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import {styled} from "@mui/material/styles";
import setUltimoLoginUsuario from "@/Helpers/setUltimoLoginUsuario";
import {Bell, CalendarEvent, Chat, Envelope, People, Tags} from "react-bootstrap-icons";

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

export default function NotificacoesIcones({corTexto}) {
    const [qtdLeads, setQtdLeads] = React.useState();
    const [qtdPedidos, setQtdPedidos] = React.useState(0);
    const [qtdChatInterno, setChatInterno] = React.useState(0);
    const [qtdSac, setQtdSac] = React.useState(0);
    const [usuariosOnline, setUsuariosOnline] = useState([]);

    setUltimoLoginUsuario()

    // Online
    function getUsuariosOnline() {
        axios.post(route('geral.usuarios.usuarios-online'))
            .then(response => {
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

    const [anchorEl2, setAnchorEl2] = React.useState(null);

    const handleClick2 = (event) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl2(null);
    };

    const open2 = Boolean(anchorEl2);
    const id = open ? 'simple-popover' : undefined;
    // Online - fim

    return (<>
        <RequestNotificacoes
            url={route('admin.notificacoes.pedidos.show', 0)}
            urlPageChat={route('admin.chat-interno.index')}
            setQtdPedidos={setQtdPedidos} setChatInterno={setChatInterno} setQtdLeads={setQtdLeads} setQtdSac={setQtdSac}
        />

        <IconButton disableRipple sx={{color: corTexto, mx: 1}} href={route('admin.notificacoes.sac.index')}>
            <Badge badgeContent={qtdSac} color="error">
                <Tags size="20" color="black"/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: corTexto, mx: 1}} href={route('admin.emails.index')}>
            <Badge badgeContent={0} color="error">
                <Envelope size="20" color="black"/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: corTexto, mx: 1}} href={route('admin.agenda.calendario.index')}>
            <Badge badgeContent={0} color="error">
                <CalendarEvent size="18" color="black"/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: corTexto, mx: 1}} onClick={handleClick2}>
            <Badge badgeContent={usuariosOnline.length} color="error">
                <People size="22" color="black"/>
            </Badge>
        </IconButton>
        <Popover
            id={id} open={open2} anchorEl={anchorEl2}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}>
            {usuariosOnline.length ? <List>
                    {usuariosOnline.map((dado, index) => {
                        return (
                            <ListItem key={dado.id} className="pb-0 cursor-pointer"
                                      onClick={() => window.location.href = route('admin.usuarios.usuario.show', dado.id)}>
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
                        )
                    })}
                </List> :
                <small className="m-3">0 online</small>}
        </Popover>

        <IconButton disableRipple sx={{color: corTexto, mx: 1}}
                    href={route('admin.chat-interno.index')}>
            <Badge badgeContent={qtdChatInterno} color="error">
                <Chat size="20" color="black"/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: corTexto, mx: 1}}
                    href={route('admin.notificacoes.pedidos.index')}>
            <Badge badgeContent={qtdPedidos} color="error">
                <Bell size="20" color="black"/>
            </Badge>
        </IconButton>
    </>)
}
