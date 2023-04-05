import Layout from "@/Layouts/Admin/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";

export default function Edit({dados}) {console.log(dados)
    return (
        <Layout container titlePage="Lead - Atendimento"
                voltar={route('admin.leads.consultores-cards.index', {id: dados.consultor.id})}>
            <LeadsDados dados={dados}/>
        </Layout>
    )
}
