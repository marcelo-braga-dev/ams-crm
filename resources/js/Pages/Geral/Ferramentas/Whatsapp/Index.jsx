import Layout from '@/Layouts/Layout.jsx';
import { ChatWhatsapp } from '@/Components/Whastapp/ChatWhatsapp.jsx';
import { WhatsappProvider } from '@/Contexts/WhatsappContext.jsx';


const Page = () => {

    return (
        <Layout titlePage="Whatsapp" menu="whatsapp" submenu="whatsapp-chat">
            <WhatsappProvider>
                <ChatWhatsapp/>
            </WhatsappProvider>
        </Layout>
    );
};

export default Page;
