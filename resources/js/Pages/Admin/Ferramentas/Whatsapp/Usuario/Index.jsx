import Layout from '@/Layouts/Layout.jsx';
import { WhatsappProvider } from '@/Contexts/WhatsappContext.jsx';
import UsuariosWhatsapp from '@/Pages/Admin/Ferramentas/Whatsapp/Usuario/UsuariosWhatsapp.jsx';

const Page = () => {
    return (
        <Layout titlePage="Usuário do Whatsapp" menu="whatsapp" submenu="whatsapp-usuario">
            <WhatsappProvider>
                <UsuariosWhatsapp />
            </WhatsappProvider>
        </Layout>
    );
};
export default Page;
