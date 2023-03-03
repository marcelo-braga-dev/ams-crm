import React, {useEffect} from "react";
import {Alert} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import NavMenuToglle from "../../../assets/argon/bootstrap5/js/nav-menu-toglle";

export default function NotificacoesNav({url, urlPageChat, setQtdPedidos, setChatInterno, setQtdLeads}) {
    let qtdNotifiChatInterno;

    function buscaQtnNotificacoes() {
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setQtdPedidos(data.pedidos);
                setChatInterno(data.chat_interno);
                if (setQtdLeads) setQtdLeads(data.leads)
                if (data.chat_interno > qtdNotifiChatInterno &&
                    window.location.href !== urlPageChat) {
                    alertChatInterno()
                }
                qtdNotifiChatInterno = data.chat_interno;
            });
    }

    useEffect(() => {
        NavMenuToglle();
        buscaQtnNotificacoes();

        setInterval(function () {
            buscaQtnNotificacoes();
        }, 10000)
    }, []);
// NOTIFICACAO
    const [open, setOpen] = React.useState(false);

    const alertChatInterno = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    // NOTIFICACAO- fim

    return (
        <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
            open={open}
            severity="success"
            onClose={handleClose}
        >
            <Alert className="text-end" onClose={handleClose} severity="success" sx={{width: '100%'}}>
                <h6>Nova mensagem no Chat Interno</h6>
                <a href={urlPageChat} className="btn btn-dark btn-sm">Ver</a>
            </Alert>
        </Snackbar>
    )
}
