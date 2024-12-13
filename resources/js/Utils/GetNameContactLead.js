import axios from "axios";

const getLead = async (leadId) => {
    try {
        const {data} = await axios.get(route('auth.lead.find-lead', leadId));
        console.log(data)
        return {contato_nome: `${data?.nome?.trim() ?? data.razao_social} [ID #${leadId}]`, ...data.whatsapp}
    } catch (error) {
        console.error("Erro ao buscar os dados do lead:", error);
        throw error;
    }
}
export default getLead
