import {ativarStatusWhatsapp, inativarStatusWhatsapp} from "./statusUtils";

const apiURL = 'http://localhost:8082/api';
const apiToken = '8b34400c-e402-4a91-986a-05488f489241';

const optionsFetch = (token, number) => ({
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({number, name: 'TESTE', userId: "2"}),
});

// Função para cadastrar contato via API
export const fetchCadastrarContato = async ({numero, id}, setContactId) => {
    try {
        const response = await fetch(`${apiURL}/messages/contacts`, optionsFetch(apiToken, `${numero}`));
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();

        setContactId(data?.data?.contactId);

        ativarStatusWhatsapp(id);
        return true;
    } catch (error) {
        inativarStatusWhatsapp(id);
        return false;
    }
};
