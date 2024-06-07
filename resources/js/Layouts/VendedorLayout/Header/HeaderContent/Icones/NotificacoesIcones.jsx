import React from "react";
import RequestNotificacoes from "@/Layouts/VendedorLayout/Header/HeaderContent/Icones/RequestNotificacoes";
import {Badge, IconButton} from "@mui/material";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import setUltimoLoginUsuario from "@/Helpers/setUltimoLoginUsuario";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";

export default function NotificacoesIcones() {
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
                <HeadsetMicOutlinedIcon/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: 'black', mx: 1}}
                    href={route('consultor.chat-interno.index')}>
            <Badge badgeContent={qtdChatInterno} color="error">
                <ForumOutlinedIcon/>
            </Badge>
        </IconButton>

        <IconButton disableRipple sx={{color: 'black', mx: 1}}
                    href={route('consultor.notificacoes.leads.index')}>
            <Badge badgeContent={qtdLeads} color="error">
                <PeopleAltOutlinedIcon/>
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
