import {ativarStatusWhatsapp, inativarStatusWhatsapp} from "./statusUtils";

const apiURL = `${import.meta.env.VITE_WHATSAPP_API}/api`;
const apiToken = import.meta.env.VITE_WHATSAPP_API_TOKEN;

const optionsFetch = (token, number) => ({
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({number, name: 'TESTE', userId: "1"}),
});

// Função para cadastrar contato via API
export const fetchCadastrarContatoNoWhatsapp = async ({numero, id}, setContactId) => {
    try {
        const response = await fetch(`${apiURL}/messages/contacts`, optionsFetch(apiToken, `${numero}`));

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
