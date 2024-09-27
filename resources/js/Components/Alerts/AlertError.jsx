import { toast } from 'react-toastify';

const AlertError = (mensagem) => {

    return toast.error(mensagem, {
        autoClose: true,
    });
};
export default AlertError;
