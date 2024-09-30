import React, { useEffect, useState, useCallback, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import { CircularProgress } from '@mui/material';
import { WhatsappButton } from './WhatsappButton';
import { fetchCadastrarContatoNoWhatsapp } from './fetchUtils';
import axios from 'axios';
import AlertError from '@/Components/Alerts/AlertError.jsx';
import { inativarStatusWhatsapp } from '@/Components/Chats/Whatsapp/statusUtils.jsx';
import { FunilVendasContext } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import { useWhatsapp } from '@/Hooks/useWhatsapp.jsx';

const AbrirChatWhatsapp = ({ telefones, atualizarCards }) => {
    const [openIflame, setOpenIflame] = useState(false);
    const [chatId, setChattId] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const [isPrimeiraMensagem, setIsPrimeiraMensagem] = useState(false);
    const [telefoneSelecionado, setTelefoneSelecionado] = useState(null);

    const { urlFrontend, urlBackend, apiKey, credenciaisUsuario } = useWhatsapp();

    const URL_DO_WHATICKET = `${urlFrontend}/chat/${chatId}`;

    // Abre o iframe quando o contactId é definido
    useEffect(() => {
        if (chatId) setOpenIflame(true);
    }, [chatId]);

    // Marcar como primeira mensagem quando o iframe é aberto
    useEffect(() => {
        if (openIflame) setIsPrimeiraMensagem(true);
    }, [openIflame]);

    // Listener para receber mensagens do iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data.type === 'messageSent' && isPrimeiraMensagem && telefoneSelecionado?.lead_id) {
                saveMessageToDatabase(telefoneSelecionado);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, [isPrimeiraMensagem, telefoneSelecionado]);

    // Função para selecionar o telefone para contatar
    const selecionarTelefonesParaContatar = useCallback(async () => {
        let noContato = true;
        try {
            for (const item of telefones) {
                if (item.numero && item.status_whatsapp) {
                    const success = await fetchCadastrarContatoNoWhatsapp(item, setChattId, urlFrontend, urlBackend, apiKey, credenciaisUsuario);
                    setTelefoneSelecionado(item);
                    if (success) {
                        noContato = false;
                        break;
                    }
                }
                setChattId(false);
            }
            if (noContato) {
                AlertError('Nenhum número de Whatsapp válido!');
            }
        } catch (error) {
            AlertError(error.message);
        }

    }, [telefones]);

    // Função para abrir o WhatsApp
    const handleOpenWhatsapp = async () => {
        setCarregando(true);
        setChattId(null);

        try {
            await selecionarTelefonesParaContatar();
        } catch (error) {
            AlertError('Erro ao iniciar a conversa no WhatsApp');
            console.error('Erro ao abrir o WhatsApp:', error);
        } finally {
            setCarregando(false);
        }
    };

    // Função para fechar o iframe
    const handleClose = () => {
        setIsPrimeiraMensagem(false);
        setOpenIflame(false);
    };

    // Função para salvar a mensagem no banco de dados
    const saveMessageToDatabase = async (telefone) => {
        try {
            await axios.post(route('auth.chats.whatsapp.enviado-mensagem'), {
                lead_id: telefone.lead_id,
                telefone_id: telefone.id,
                origem: 'whatsapp',
                meta: 'funil-vendas',
            });
            setIsPrimeiraMensagem(false);
        } catch (error) {
            AlertError('Erro ao armazenar registro de contato.');
            console.error('Erro ao salvar a mensagem:', error);
        }
    };

    return (
        <>
            {carregando ? <CircularProgress size={20} /> : <WhatsappButton telefones={telefones} handleOpen={handleOpenWhatsapp} />}
            <Dialog open={openIflame} onClose={handleClose} fullWidth maxWidth="xs">
                {openIflame && (
                        <iframe
                            src={URL_DO_WHATICKET}
                            style={{ width: '100%', height: '700px', border: 'none' }}
                            title="WhatsApp"
                        />
                )}
            </Dialog>
        </>
    );
};

export default AbrirChatWhatsapp;
