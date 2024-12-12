import React, {useEffect, useState} from 'react';
import {Avatar, IconButton, Stack, Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import {useWhatsapp} from '@/Hooks/useWhatsapp.jsx';
import fetchRequisicao from '@/Components/Chats/Whatsapp/ChatWhatsapp/utils/requisicao.js';
import AlertError from '@/Components/Alerts/AlertError.jsx';
import {useFunilVendas} from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import axios from 'axios';
import DialogIflame from '@/Components/Chats/Whatsapp/ChatWhatsapp/DialogIflame.jsx';
import {Whatsapp} from 'react-bootstrap-icons';
import getLead from "@/Utils/GetNameContactLead.js";
import updateLeadContactService from "@/Services/Whatsapp/UpdateLeadContactService.jsx";

const OpenIflameChatWhatsapp = ({dados, icone}) => {
    const [chatId, setChatId] = useState();
    const [openIflame, setOpenIflame] = useState(false);
    const [isPrimeiraMensagem, setIsPrimeiraMensagem] = useState(false);

    const {handleAtualizar} = useFunilVendas();
    const {urlFrontend, urlBackend, apiKey, credenciaisUsuario} = useWhatsapp();

    const urlWhaticket = `${urlFrontend}/chat/${chatId}`;

    const fetch = async () => {
        try {
            const leadInfo = await getLead(dados.lead_id)

            const contact = await fetchRequisicao(urlBackend, apiKey, dados.numero, leadInfo.whatsapp_id, leadInfo.contato_nome);
            await updateLeadContactService(dados.id, contact)

            setChatId(contact?.data?.data?.id);
        } catch (error) {
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
            if (event.data.type === 'messageSent' && isPrimeiraMensagem && dados.lead_id) {
                saveMessageToDatabase(dados.lead_id, dados.id);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [isPrimeiraMensagem, dados.numero]);

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
                <MenuItem disabled={dados.status_whatsapp === 0} onClick={fetch}>
                    <Stack direction="row" spacing={1} alignItems="center">
                        {dados.whatsapp_picture && <Avatar src={dados.whatsapp_picture} sx={{width: 25, height: 25}}/>}
                        <Typography>{dados.telefone}</Typography>
                    </Stack>
                </MenuItem>
            )}
            <DialogIflame openIflame={openIflame} handleClose={handleClose} urlFrontend={urlWhaticket} noDialogLead/>
        </>
    );
};
export default OpenIflameChatWhatsapp;
