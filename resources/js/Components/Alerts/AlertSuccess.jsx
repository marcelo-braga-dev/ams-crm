import {toast} from "react-toastify";

const AlertSuccess = (mensagem) => {

    return toast.success(mensagem, {
        autoClose: true
    });
}
export default AlertSuccess
