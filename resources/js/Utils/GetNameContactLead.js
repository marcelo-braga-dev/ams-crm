import axios from "axios";

const getNameContactLead = async (leadId) => {
    try {
        const {data} = await axios.get(route('auth.lead.get-all-data', leadId));

        return `${data.nome ?? data.razao_social} [#${leadId}]`;
    } catch (error) {
        console.error("Erro ao buscar os dados do lead:", error);
        throw error;
    }
}
export default getNameContactLead
