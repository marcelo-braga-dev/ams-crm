import { inativarStatusWhatsapp } from '@/Components/Chats/Whatsapp/ChatWhatsapp/statusUtils.jsx';

const analizarErros = (error, numero) => {
    console.error('/-ERROR-------\\/--------/');
    console.error('ERROR MESSAGE: ', error?.response?.data?.message);
    console.error('ERROR: ', error);
    console.error('/------------/\\-----/');

    let msgError = 'Erro DesconhecidoX!';
    if (error?.response?.data?.message === 'ERR_NO_DEF_WAPP_FOUND') msgError = 'SEM CONEXÃO COM WHATSAPP';
    if (error?.response?.data?.message === 'ERR_WAPP_INVALID_CONTACT' || error?.response?.data?.message === 'ERR_WAPP_CHECK_CONTACT') {
        inativarStatusWhatsapp(numero);
        msgError = 'Número Inválido!'
    }
    return msgError;
}
export default analizarErros
