import { ativarStatusWhatsapp, inativarStatusWhatsapp } from './statusUtils';
import { useEffect, useState } from 'react';

const optionsFetch = (token, number, userId) => ({
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ number, name: 'TESTE', userId: userId }),
});

// Função para cadastrar contato via API
export const fetchCadastrarContatoNoWhatsapp = async ({ numero, id }, setContactId) => {

    const [keys, setKeys] = useState({ urlFrontend: '', urlBackend: '', apiKey: '', userId: '' });
    const apiURL = `${keys.urlBackend}/api`;
    const apiToken = keys.apiKey;

    const fetchKeys = async () => {
        const urlFrontend = await axios.get(route('auth.chats.whatsapp.chaves'));
        setKeys(urlFrontend.data);
    };

    useEffect(() => {
        fetchKeys();
    }, []);

    try {
        const response = await fetch(`${apiURL}/messages/contacts`, optionsFetch(apiToken, `${numero}`, keys.userId));

        if (!response.ok) {
            if (response.status === 400) inativarStatusWhatsapp(id);
            throw new Error('Erro na requisição');
        }

        const data = await response.json();
        setContactId(data?.data?.contactId);

        ativarStatusWhatsapp(id);
        return true;
    } catch (error) {
        return false;
    }
};
