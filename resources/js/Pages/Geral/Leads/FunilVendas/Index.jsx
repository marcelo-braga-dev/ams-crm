import { FunilVendasProvider } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import { WhatsappProvider } from '@/Contexts/WhatsappContext.jsx';
import KanbanFunilVendas from '@/Pages/Admin/Leads/Kanban/KanbanFunilVendas.jsx';
import Layout from '@/Layouts/Layout.jsx';
import Kanban from './Kanban.jsx';

const Page = () => {
    return (
        <Layout titlePage="Funil de Vendas" menu="leads" submenu="leads-kanban">
            <FunilVendasProvider>
                <WhatsappProvider>
                    <Kanban />
                </WhatsappProvider>
            </FunilVendasProvider>
        </Layout>
    )
}
export default Page
