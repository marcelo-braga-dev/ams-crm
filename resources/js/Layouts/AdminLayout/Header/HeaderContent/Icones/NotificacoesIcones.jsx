import React, {useState, useEffect} from "react";
import RequestNotificacoes from "@/Layouts/AdminLayout/Header/HeaderContent/Icones/RequestNotificacoes";
import {Badge, IconButton, List} from "@mui/material";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import PeopleIcon from "@mui/icons-material/People";
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';

import Popover from "@mui/material/Popover";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import {styled} from "@mui/material/styles";

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

export default function NotificacoesIcones() {
    const [qtdLeads, setQtdLeads] = React.useState();
    const [qtdPedidos, setQtdPedidos] = React.useState();
    const [qtdChatInterno, setChatInterno] = React.useState();
    const [usuariosOnline, setUsuariosOnline] = useState([]);

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
            url={route('admin.notificacoes.show', 0)}
            urlPageChat={route('admin.chat-interno.index')}
            setQtdPedidos={setQtdPedidos} setChatInterno={setChatInterno} setQtdLeads={setQtdLeads}
        />

        <IconButton disableRipple sx={{color: 'black', mx: 1}}
                    onClick={handleClick2}>
            <Badge badgeContent={usuariosOnline.length} color="error">
                <PeopleAltOutlinedIcon/>
            </Badge>
        </IconButton>
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

        <IconButton disableRipple sx={{color: 'black', mx: 1}}
                    href={route('consultor.chat-interno.index')}>
            <Badge badgeContent={qtdChatInterno} color="error">
                <ForumOutlinedIcon/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: 'black', mx: 1}}
                    href={route('consultor.notificacoes.leads.index')}>
            <Badge badgeContent={qtdLeads} color="error">
                <ContactPhoneOutlinedIcon/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: 'black', mx: 1}}
                    href={route('consultor.notificacoes.pedidos.index')}>
            <Badge badgeContent={qtdPedidos} color="error">
                <NotificationsOutlinedIcon/>
            </Badge>
        </IconButton>
    </>)
}
