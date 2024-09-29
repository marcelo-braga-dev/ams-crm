import Layout from '@/Layouts/Layout.jsx';
import { ProviderFunilVendas } from './ContextFunilVendas';
import KanbanFunilVendas from './KanbanFunilVendas';

const Page = () => {
    return (
        <Layout titlePage="Funil de Vendas" menu="leads" submenu="leads-kanban">
            <ProviderFunilVendas>
                <KanbanFunilVendas />
            </ProviderFunilVendas>
        </Layout>
    );
};
export default Page;
