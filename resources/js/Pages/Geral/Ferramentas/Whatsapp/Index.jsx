import Layout from '@/Layouts/Layout.jsx';
import { ChatsWhatsapp } from '@/Components/Whastapp/ChatsWhatsapp.jsx';
import { WhatsappProvider } from '@/Contexts/WhatsappContext.jsx';


const Page = () => {

    return (
        <Layout titlePage="Whatsapp" menu="whatsapp" submenu="whatsapp-chat">
            <WhatsappProvider>
                <ChatsWhatsapp/>
            </WhatsappProvider>
        </Layout>
    );
};

export default Page;
