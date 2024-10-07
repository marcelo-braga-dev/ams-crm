import { FunilVendasProvider } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import { WhatsappProvider } from '@/Contexts/WhatsappContext.jsx';
import KanbanFunilVendas from '@/Pages/Admin/Leads/Kanban/KanbanFunilVendas.jsx';
import Layout from '@/Layouts/Layout.jsx';
import Kanban from './Kanban.jsx';
import { LeadProvider } from '@/Pages/Geral/Leads/Dialogs/LeadContext.jsx';

const Page = () => {
    return (
        <Layout titlePage="Funil de Vendas" menu="leads" submenu="leads-kanban">
            <FunilVendasProvider>
                <LeadProvider>
                    <WhatsappProvider>
                        <Kanban />
                    </WhatsappProvider>
                </LeadProvider>
            </FunilVendasProvider>
        </Layout>
    );
};
export default Page;
