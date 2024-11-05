import React, {useState} from "react";
import {Badge, IconButton} from "@mui/material";
import setUltimoLoginUsuario from "@/Helpers/setUltimoLoginUsuario";
import {Bell, Chat, People, Tags} from "react-bootstrap-icons";
import AdminNotificacoesRequest from "@/Layouts/Header/HeaderContent/Request/AdminNotificacoesRequest.jsx";

export default function ConsultorNotificacoesIcones() {
    const [notificacoes, setNotificacoes] = useState([]);

    setUltimoLoginUsuario()

    return (<>
        <AdminNotificacoesRequest
            url={route('consultor.notificacoes.status.index')}
            setNotificacoes={setNotificacoes}/>

        <IconButton disableRipple sx={{color: 'black', mx: 1}} href={route('consultor.notificacoes.sac.index')}>
            <Badge badgeContent={notificacoes.sac} color="error">
                <Tags size="20" color="black"/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: 'black', mx: 1}} href={route('consultor.chat-interno.index')}>
            <Badge badgeContent={notificacoes.chat_interno} color="error">
                <Chat size="20" color="black"/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: 'black', mx: 1}} href={route('consultor.notificacoes.leads.index')}>
            <Badge badgeContent={notificacoes.leads} color="error">
                <People size="22" color="black"/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: 'black', mx: 1}} href={route('consultor.notificacoes.pedidos.index')}>
            <Badge badgeContent={notificacoes.pedidos} color="error">
                <Bell size="20" color="black"/>
            </Badge>
        </IconButton>
    </>)
}
