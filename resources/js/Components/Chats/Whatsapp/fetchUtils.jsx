import { ativarStatusWhatsapp, inativarStatusWhatsapp } from './statusUtils';
import axios from 'axios';
import AlertSuccess from '@/Components/Alerts/AlertSuccess.jsx';

const optionsFetch = (token, number, userId) => ({
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    data: {
        number,
        name: 'TESTE',
        userId,
    },
});

export const fetchCadastrarContatoNoWhatsapp = async ({ numero, id }, setChattId, keysWhatsapp) => {
    try {
        const url = `${keysWhatsapp.urlBackend}/api/messages/contacts`;
        const options = optionsFetch(keysWhatsapp.apiKey, numero, keysWhatsapp.userId);

        const response = await axios.post(url, options.data, { headers: options.headers });

        console.log('----------------\\/--------------');
        console.log('STATUS: ', response.status);
        console.log('RESPONSE: ', response);
        console.log('----------------/\\--------------');

        // CONTATO CADASTRADO
        if (response.status === 201) {
            // AlertSuccess(response.data.message);
        }

        const data = response.data;
        setChattId(data?.data?.id);

        ativarStatusWhatsapp(id);
        return true;
    } catch (error) {
        console.log('/-ERROR-------\\/--------/');
        console.log('ERROR STATUS: ', error?.response?.status);
        console.log('ERROR MESSAGE: ', error?.response?.data?.message);
        console.log('ERROR: ', error);
        console.log('/------------/\\-----/');

        let msgError = 'Erro Desconhecido!';
        if (error?.response?.data?.message === 'ERR_NO_DEF_WAPP_FOUND') msgError = 'SEM CONEXÃO COM WHATSAPP';
        if (error?.response?.data?.message === 'ERR_WAPP_INVALID_CONTACT') {
            inativarStatusWhatsapp(id);
            return;
        }
        ;

        throw new Error(msgError);
    }
};
