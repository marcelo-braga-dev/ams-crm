import React, { useEffect, useMemo, useState } from 'react';
import { Button, IconButton, Stack, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useWhatsapp } from '@/Hooks/useWhatsapp.jsx';
import Dialog from '@mui/material/Dialog';
import fetchRequisicao from '@/Components/Chats/Whatsapp/ChatWhatsapp/utils/requisicao.js';
import AlertError from '@/Components/Alerts/AlertError.jsx';
import { useFunilVendas } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import axios from 'axios';
import DialogIflame from '@/Components/Chats/Whatsapp/ChatWhatsapp/DialogIflame.jsx';
import { Whatsapp } from 'react-bootstrap-icons';

const OpenIflameChatWhatsapp = ({ numero, status, telefone, leadId, telefoneId, icone }) => {
    const [chatId, setChatId] = useState();
    const [openIflame, setOpenIflame] = useState(false);
    const [isPrimeiraMensagem, setIsPrimeiraMensagem] = useState(false);

    const { handleAtualizar } = useFunilVendas();
    const { urlFrontend, urlBackend, apiKey, credenciaisUsuario } = useWhatsapp();

    const URL_DO_WHATICKET = `${urlFrontend}/chat/${chatId}`;

    const fetch = async () => {
        try {
            const res = await fetchRequisicao(urlBackend, apiKey, numero, credenciaisUsuario);
            setChatId(res);
        } catch (error) {
            console.log('ATUALIZAR CARDS')
            handleAtualizar()
            AlertError(error.message);
        }
    };

    const handleClose = () => {
        setOpenIflame(false);
        setIsPrimeiraMensagem(false);
        handleAtualizar();
        setChatId();
    };

    useEffect(() => {
        chatId && setOpenIflame(true);
    }, [chatId]);


    //--- Primeira mensagem no chat --//
    useEffect(() => {
        if (openIflame) setIsPrimeiraMensagem(true);
    }, [openIflame]);

    // Listener para receber mensagens do iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'messageSent' && isPrimeiraMensagem && leadId) {
                saveMessageToDatabase(leadId, telefoneId);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [isPrimeiraMensagem, numero]);

    const saveMessageToDatabase = async (leadId, telefoneId) => {
        try {
            await axios.post(route('auth.lead.iniciado-chat'), {
                lead_id: leadId,
                telefone_id: telefoneId,
                origem: 'whatsapp',
                meta: 'funil-vendas',
            });
            setIsPrimeiraMensagem(false);
        } catch (error) {
            AlertError('Erro ao armazenar registro de contato.');
            console.error('Erro ao salvar a mensagem:', error);
        }
    };
    //---------------//

    return (
        <>
            {icone ? (
                <IconButton onClick={fetch}>
                    <Whatsapp size={18} color="green"/>
                </IconButton>
            ) : (
                <MenuItem disabled={status === 0} onClick={fetch}>
                    <Typography >{telefone}</Typography>
                </MenuItem>
            )}
            <DialogIflame openIflame={openIflame} handleClose={handleClose} urlFrontend={URL_DO_WHATICKET} noDialogLead />
        </>
    );
};
export default OpenIflameChatWhatsapp;
