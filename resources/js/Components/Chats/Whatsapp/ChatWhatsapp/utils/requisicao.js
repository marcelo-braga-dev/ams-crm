import axios from 'axios';
import analizarErros from '@/Components/Chats/Whatsapp/ChatWhatsapp/utils/analizarErros.js';

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

const fetchRequisicao = async (urlBackend, apiKey, numero, credenciaisUsuario) => {

    const options = optionsFetch(apiKey, numero, credenciaisUsuario.whatsappId);
    const url = `${urlBackend}/api/messages/contacts`;

    try {
        const response =  await axios.post(url, options.data, { headers: options.headers })

        return response?.data?.data?.id
    } catch (error) {
        console.log('ERRO')
        throw new Error(analizarErros(error));
    }
}
export default fetchRequisicao
