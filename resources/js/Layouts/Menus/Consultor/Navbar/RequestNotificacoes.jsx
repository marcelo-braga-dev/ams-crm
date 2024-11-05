import useSound from "use-sound";
import boopSfx from "../../../../../../assets/sounds/2.wav";
import React, {useEffect} from "react";
import Snackbar from "@mui/material/Snackbar";
import {Alert} from "@mui/material";

export default function RequestNotificacoes({url, urlPageChat, setQtdPedidos, setChatInterno, setQtdLeads, setQtdSac}) {
    let qtdNotifiChatInterno;
    const [play] = useSound(boopSfx);

    async function buscaQtnNotificacoes() {
        await axios.get(url).then((res) => {
            setQtdPedidos(res.data.pedidos);
            setChatInterno(res.data.chat_interno);
            setQtdSac(res.data.sac)
            if (setQtdLeads) setQtdLeads(res.data.leads)
            if (res.data.chat_interno > qtdNotifiChatInterno) {
                alertChatInterno()
                play()
            }
            qtdNotifiChatInterno = res.data.chat_interno;
        })
        setTimeout(function () {
            buscaQtnNotificacoes();
        }, 60000)
    }

    useEffect(() => {
        buscaQtnNotificacoes();
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
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert className="text-end" onClose={handleClose} severity="success" sx={{width: '100%'}}>
                <h6>Nova mensagem no Chat Interno</h6>
                <a href={urlPageChat} className="btn btn-dark btn-sm">Ver</a>
            </Alert>
        </Snackbar>
    )
}
