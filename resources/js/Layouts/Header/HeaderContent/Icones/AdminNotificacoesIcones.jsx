import React, {useState, useEffect} from "react";
import RequestNotificacoes from "../Request/AdminNotificacoesRequest.jsx";
import {Badge, IconButton, List, Stack} from "@mui/material";

import Popover from "@mui/material/Popover";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import {styled} from "@mui/material/styles";
import setUltimoLoginUsuario from "@/Helpers/setUltimoLoginUsuario";
import {Bell, CalendarEvent, Chat, Envelope, ListTask, People, Tags} from "react-bootstrap-icons";
import {usePage} from "@inertiajs/react";

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

export default function AdminNotificacoesIcones({corTexto}) {

    const [notificacoes, setNotificacoes] = useState([]);

    const {_permissoesUsuario} = usePage().props;

    setUltimoLoginUsuario()

    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

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

    return (
        <Stack direction="row" alignItems="center" spacing={3} paddingRight={4}>
            <RequestNotificacoes
                url={route('admin.notificacoes.status.index')}
                setNotificacoes={setNotificacoes}
                urlPageChat={route('admin.chat-interno.index')}
            />

            {_permissoesUsuario?.[22] && <IconButton disableRipple sx={{color: corTexto}} href={route('admin.notificacoes.sac.index')}>
                <Badge badgeContent={notificacoes.sac} color="error">
                    <Tags size="20" color="black"/>
                </Badge>
            </IconButton>}

            {_permissoesUsuario?.[59] && <IconButton disableRipple sx={{color: corTexto}} href={route('admin.notificacoes.sac.index')}>
                <Badge badgeContent={notificacoes.tarefas} color="error">
                    <ListTask size="24" color="black"/>
                </Badge>
            </IconButton>}

            {_permissoesUsuario?.[28] && <IconButton disableRipple sx={{color: corTexto}} href={route('admin.emails.index')}>
                <Badge badgeContent={notificacoes.email} color="error">
                    <Envelope size="20" color="black"/>
                </Badge>
            </IconButton>}

            {_permissoesUsuario?.[17] && <IconButton disableRipple sx={{color: corTexto}} href={route('admin.agenda.calendario.index')}>
                <Badge badgeContent={notificacoes.agenda} color="error">
                    <CalendarEvent size="20" color="black"/>
                </Badge>
            </IconButton>}

            {_permissoesUsuario?.[20] && <IconButton disableRipple sx={{color: corTexto}} onClick={handleClick2}>
                <Badge badgeContent={notificacoes?.user_online?.length} color="error">
                    <People size="22" color="black"/>
                </Badge>
            </IconButton>}

            <Popover
                id={id} open={open2} anchorEl={anchorEl2}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}>
                {notificacoes?.user_online?.length ? <List>
                        {notificacoes?.user_online?.map((dado, index) => {
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

            {_permissoesUsuario?.[12] && <IconButton disableRipple sx={{color: corTexto}} href={route('admin.chat-interno.index')}>
                <Badge badgeContent={notificacoes.chat_interno} color="error">
                    <Chat size="20" color="black"/>
                </Badge>
            </IconButton>}

            <IconButton disableRipple sx={{color: corTexto}} href={route('admin.notificacoes.pedidos.index')}>
                <Badge badgeContent={notificacoes.pedidos} color="error">
                    <Bell size="20" color="black"/>
                </Badge>
            </IconButton>
        </Stack>
    )
}
