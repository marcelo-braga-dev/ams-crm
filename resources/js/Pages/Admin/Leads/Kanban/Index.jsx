import Layout from '@/Layouts/Layout.jsx';
import { FunilVendasProvider } from './FunilVendasContext.jsx';
import KanbanFunilVendas from './KanbanFunilVendas';
import { WhatsappProvider } from '@/Contexts/WhatsappContext.jsx';

const Page = () => {
    return (
        <Layout titlePage="Funil de Vendas" menu="leads" submenu="leads-kanban">
            <FunilVendasProvider>
                <WhatsappProvider>
                    <KanbanFunilVendas />
                </WhatsappProvider>
            </FunilVendasProvider>
        </Layout>
    );
};
export default Page;
