import React from "react";
import RequestNotificacoes from "@/Layouts/AdminLayout/Header/HeaderContent/Icones/RequestNotificacoes";
import {Badge, IconButton} from "@mui/material";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';

export default function NotificacoesIcones() {
    const [qtdLeads, setQtdLeads] = React.useState();
    const [qtdPedidos, setQtdPedidos] = React.useState();
    const [qtdChatInterno, setChatInterno] = React.useState();

    return (<>
        <RequestNotificacoes
            url={route('consultor.notificacoes.pedidos.show', 0)}
            urlPageChat={route('consultor.chat-interno.index')}
            setQtdPedidos={setQtdPedidos} setChatInterno={setChatInterno} setQtdLeads={setQtdLeads}
        />

        <IconButton disableRipple sx={{color: 'black', mx: 1}}
                    href={route('consultor.chat-interno.index')}>
            <Badge badgeContent={qtdChatInterno} color="primary">
                <ForumOutlinedIcon/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: 'black', mx: 1}}
                    href={route('consultor.notificacoes.leads.index')}>
            <Badge badgeContent={qtdLeads} color="primary">
                <PeopleAltOutlinedIcon/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: 'black', mx: 1}}
                    href={route('consultor.notificacoes.pedidos.index')}>
            <Badge badgeContent={qtdPedidos} color="primary">
                <NotificationsOutlinedIcon/>
            </Badge>
        </IconButton>
    </>)
}
