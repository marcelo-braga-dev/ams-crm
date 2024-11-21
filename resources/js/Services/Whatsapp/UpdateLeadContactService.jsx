import axios from "axios";

const updateLeadContactService = async  (telefoneId, contact) => {
    await axios.post(route('auth.leads.api.update-contato'), {telefoneId, contact})
}
export default updateLeadContactService
