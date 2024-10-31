import {FunilVendasProvider} from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import Layout from '@/Layouts/Layout.jsx';
import Kanban from './Kanban.jsx';
import {LeadProvider} from '@/Pages/Geral/Leads/Dialogs/LeadContext.jsx';

const Page = () => {
    return (
        <Layout titlePage="Funil de Vendas - Leads" menu="leads" submenu="leads-kanban">
            <FunilVendasProvider>
                <LeadProvider>
                    <Kanban/>
                </LeadProvider>
            </FunilVendasProvider>
        </Layout>
    );
};
export default Page;
