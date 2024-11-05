import Layout from '@/Layouts/Layout.jsx';
import {FunilVendasProvider} from './FunilVendasContext.jsx';
import KanbanFunilVendas from './KanbanFunilVendas';

const Page = () => {
    return (
        <Layout titlePage="Funil de Vendas" menu="leads" submenu="leads-kanban">
            <FunilVendasProvider>
                <KanbanFunilVendas/>
            </FunilVendasProvider>
        </Layout>
    );
};
export default Page;
