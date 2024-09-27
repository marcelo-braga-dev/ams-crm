import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ContextFunilVendas = createContext();

export const ProviderFunilVendas = ({ children }) => {
    const [atualizarRegistros, setAtualizarRegistros] = useState(false);
    const [keysWhatsapp, setKeysWhatsapp] = useState(false);

    const fetchKeys = async () => {
        const urlFrontend = await axios.get(route('auth.chats.whatsapp.chaves'));
        setKeysWhatsapp(urlFrontend.data);
    };

    useEffect(() => {
        fetchKeys();
    }, []);

    return (
        <ContextFunilVendas.Provider value={{ atualizarRegistros, setAtualizarRegistros, keysWhatsapp }}>
            {children}
        </ContextFunilVendas.Provider>
    );
};
