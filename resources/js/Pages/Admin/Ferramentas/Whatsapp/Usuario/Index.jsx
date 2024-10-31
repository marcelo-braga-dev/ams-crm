import Layout from '@/Layouts/Layout.jsx';
import UsuariosWhatsapp from '@/Pages/Admin/Ferramentas/Whatsapp/Usuario/UsuariosWhatsapp.jsx';

const Page = () => {
    return (
        <Layout titlePage="Usuário do Whatsapp" menu="whatsapp" submenu="whatsapp-usuario">
            <UsuariosWhatsapp/>
        </Layout>
    );
};
export default Page;
