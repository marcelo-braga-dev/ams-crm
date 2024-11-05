import React, {useState} from "react";
import RequestNotificacoes from "@/Layouts/VendedorLayout/Header/HeaderContent/Icones/RequestNotificacoes";
import {Badge, IconButton} from "@mui/material";

import setUltimoLoginUsuario from "@/Helpers/setUltimoLoginUsuario";
import {Bell, Chat, People, Tags} from "react-bootstrap-icons";

export default function NotificacoesIcones() {
    const [notificacoes, setNotificacoes] = useState([]);

    const [qtdLeads, setQtdLeads] = React.useState(0);
    const [qtdPedidos, setQtdPedidos] = React.useState(0);
    const [qtdChatInterno, setChatInterno] = React.useState(0);
    const [qtdSac, setQtdSac] = React.useState(0);

    setUltimoLoginUsuario()

    return (<>
        <RequestNotificacoes
            url={route('consultor.notificacoes.pedidos.show', 0)}
            urlPageChat={route('consultor.chat-interno.index')}
            setQtdPedidos={setQtdPedidos} setChatInterno={setChatInterno} setQtdLeads={setQtdLeads} setQtdSac={setQtdSac}
        />

        <IconButton disableRipple sx={{color: 'black', mx: 1}} href={route('consultor.notificacoes.sac.index')}>
            <Badge badgeContent={qtdSac} color="error">
                <Tags size="20" color="black"/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: 'black', mx: 1}} href={route('consultor.chat-interno.index')}>
            <Badge badgeContent={qtdChatInterno} color="error">
                <Chat size="20" color="black"/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: 'black', mx: 1}} href={route('consultor.notificacoes.leads.index')}>
            <Badge badgeContent={qtdLeads} color="error">
                <People size="22" color="black"/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: 'black', mx: 1}} href={route('consultor.notificacoes.pedidos.index')}>
            <Badge badgeContent={qtdPedidos} color="error">
                <Bell size="20" color="black"/>
            </Badge>
        </IconButton>
    </>)
}
