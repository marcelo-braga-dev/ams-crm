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

export const fetchCadastrarContatoNoWhatsapp = async ({ numero, id }, setChattId, urlFrontend, urlBackend, apiKey, credenciaisUsuario) => {
    try {
        const url = `${urlBackend}/api/messages/contacts`;

        const options = optionsFetch(apiKey, numero, credenciaisUsuario.whatsappId);

        const response = await axios.post(url, options.data, { headers: options.headers });

        console.log('----\\/------');
        console.log('RESPONSE: ', response);
        console.log('----/\\------');

        const data = response.data;
        setChattId(data?.data?.id);

        // ativarStatusWhatsapp(id);
        return true;
    } catch (error) {
        console.error('/-ERROR-------\\/--------/');
        console.error('ERROR MESSAGE: ', error?.response?.data?.message);
        console.error('ERROR: ', error);
        console.error('/------------/\\-----/');

        let msgError = 'Erro Desconhecido!';
        if (error?.response?.data?.message === 'ERR_NO_DEF_WAPP_FOUND') msgError = 'SEM CONEXÃO COM WHATSAPP';
        if (error?.response?.data?.message === 'ERR_WAPP_INVALID_CONTACT') {
            inativarStatusWhatsapp(numero);
            msgError = 'Número de Whatsapp Inválido!';
        }

        throw new Error(msgError);
    }
};
