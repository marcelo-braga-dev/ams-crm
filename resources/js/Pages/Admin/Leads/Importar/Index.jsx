import Layout from '@/Layouts/Layout';
import Historico from "@/Pages/Admin/Leads/Importar/Index/Historico.jsx";
import PlanilhaForm from "@/Pages/Admin/Leads/Importar/Index/PlanilhaForm.jsx";

export default function ({setores, modelo, historicos}) {

    return (
        <Layout titlePage="Importar Planilhas de Leads" menu="leads" submenu="leads-importar">
            <PlanilhaForm setores={setores} modelo/>
            <Historico historicos={historicos}/>
        </Layout>
    );
}
