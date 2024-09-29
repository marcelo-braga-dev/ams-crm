import React, { createContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useAlert } from '@/Hooks/useAlert.jsx';

export const WhatsappContext = createContext({ urlFrontend: null, urlBackend: null, apiKey: null });

const logarWhatsapp = (email, senha) => {
    window.addEventListener('message', function(event) {
        if (event.data === 'getSharedVariable') {

            const login = {
                email: email,
                password: senha,
            };

            event.source.postMessage({ sharedVariable: login }, event.origin);
        }
    });
};

export const WhatsappProvider = ({ children }) => {
    const { alertError } = useAlert();

    const [keys, setKeys] = useState(
        {
            urlFrontend: null,
            urlBackend: null,
            apiKey: null,
            credenciaisUsuario: {
                email: '',
                password: '',
            },
        });

    const fetchKeys = useCallback(async () => {
        try {
            const response = await axios.get(route('auth.chats.whatsapp.chaves'));
            setKeys(response.data);

            if (!response.data.urlBackend) alertError('API do Whatsapp não está configurada!');

        } catch (err) {
            alertError('Erro ao buscar chaves do WhatsApp:', err);
        }
    }, []);

    useEffect(() => {
        fetchKeys();
    }, [fetchKeys]);

    useEffect(() => {
        if (keys.credenciaisUsuario?.email) {
            logarWhatsapp(keys.credenciaisUsuario.email, keys.credenciaisUsuario.password);
        }
    }, [keys]);

    return (
        <WhatsappContext.Provider value={{ ...keys }}>
            {children}
        </WhatsappContext.Provider>
    );
};
