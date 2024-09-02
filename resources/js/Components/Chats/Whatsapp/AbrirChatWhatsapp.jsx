import React, {useEffect, useState} from "react";
import Dialog from '@mui/material/Dialog';
import {CircularProgress} from "@mui/material";
import {WhatsappButton} from "./WhatsappButton";
import {fetchCadastrarContato} from "./fetchUtils";
import {armazenarMensagemDB} from "./armazenarMensagemDB.js";
import {router} from "@inertiajs/react";

const AbrirChatWhatsapp = ({telefones}) => {
    const [open, setOpen] = useState(false);
    const [contactId, setContactId] = useState(null);
    const [carregando, setCarregando] = useState(false);

    let URL_DO_WHATICKET = `http://localhost:3000/tickets/${contactId}`

    useEffect(() => {
        if (contactId) setOpen(true);
    }, [contactId]);

    const selecionarTelefones = async () => {
        for (const item of telefones) {
            if (item.numero && item.status_whatsapp) {
                const success = await fetchCadastrarContato(item, setContactId);
                if (success) break;
            }
        }
    };

    const handleOpenWhatsapp = async () => {
        setCarregando(true);
        setContactId(false)

        try {
            await selecionarTelefones();
        } catch (error) {
            console.error("Erro ao abrir o WhatsApp:", error);
        } finally {
            setCarregando(false);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };


    armazenarMensagemDB()

    const handleMessage = (event) => {
        if (event.data.type === 'messageSent') {
            const message = event.data.data;

            saveMessageToDatabase(message);
            console.info('ARMAZENAR NO DB: ', message)
        }
    };

    const saveMessageToDatabase = async (message) => {
        try {
            await router.post(route('auth.chats.whatsapp.armazenar-mensagem'),
                {mensagem: message?.content, origem: 'funil-vendas', lead_id: '1'});
        } catch (error) {
            console.error('Erro ao salvar a mensagem:', error);
        }
    };

    useEffect(() => {
        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    return (<>
        {carregando && <CircularProgress size={20}/>}
        {!carregando && <WhatsappButton telefones={telefones} handleOpen={handleOpenWhatsapp}/>}

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            {open && (<iframe
                src={URL_DO_WHATICKET}
                style={{width: '100%', height: '700px', border: 'none'}}
                title="WhatsApp"
            />)}
        </Dialog>
    </>);
};

export default AbrirChatWhatsapp;
