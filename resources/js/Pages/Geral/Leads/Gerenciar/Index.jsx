import Layout from '@/Layouts/Layout.jsx';
import Filtro from './Filtro.jsx';
import Lead from './Lead.jsx';
import { GerenciarProvider } from '@/Pages/Geral/Leads/Gerenciar/Context.jsx';

const Page = () => {
    return (
        <Layout titlePage="Gerenciar Leads" menu="leads" submenu="leads-gerenciar">
            <GerenciarProvider>
                <Filtro />
                <Lead/>
            </GerenciarProvider>
        </Layout>
    );
};
export default Page;
