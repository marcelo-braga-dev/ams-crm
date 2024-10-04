import Layout from '@/Layouts/Layout.jsx';
import { WhatsappProvider } from '@/Contexts/WhatsappContext.jsx';
import ChatsWhatsapp from '@/Components/Chats/Whatsapp/ChatsWhatsapp/ChatsWhatspp.jsx';


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
