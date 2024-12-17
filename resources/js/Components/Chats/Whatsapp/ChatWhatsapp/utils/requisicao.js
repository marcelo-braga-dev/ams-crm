import axios from 'axios';
import analizarErros from '@/Components/Chats/Whatsapp/ChatWhatsapp/utils/analizarErros.js';

const optionsFetch = (token, number, userId, leadName, conexaoId) => ({
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
    data: {
        number,
        name: leadName,
        userId,
        whatsappId: conexaoId
    },
});

const fetchRequisicao = async (urlBackend, apiKey, numero, whatsappId, leadName, conexaoId) => {

    whatsappId = whatsappId ? whatsappId : null

    const options = optionsFetch(apiKey, numero, whatsappId, leadName, conexaoId);
    const url = `${urlBackend}/api/messages/contacts`;

    try {
        return await axios.post(url, options.data, {headers: options.headers})
    } catch (error) {
        throw new Error(analizarErros(error, numero));
    }
}
export default fetchRequisicao
