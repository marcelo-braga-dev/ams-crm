import Layout from '@/Layouts/Layout.jsx';
import ChatsWhatsapp from '@/Components/Chats/Whatsapp/ChatsWhatsapp/ChatsWhatspp.jsx';

const Page = () => {

    return (
        <Layout titlePage="Whatsapp" menu="whatsapp" submenu="whatsapp-chat">
            <ChatsWhatsapp/>
        </Layout>
    );
};

export default Page;
