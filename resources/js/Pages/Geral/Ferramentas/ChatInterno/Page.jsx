import Layout from '@/Layouts/Layout.jsx';
import MainLayout from '@/Pages/Geral/Ferramentas/ChatInterno/MainLayout.jsx';

const Page = () => {

    const channel = Echo.channel('my-channel');
    channel.listen('.my-event', function(data) {
        alert(JSON.stringify(data));
    });

    return (
        <Layout titlePage="Chat Interno"  menu="chats" submenu="chat-interno">
            <MainLayout/>
        </Layout>
    )
}
export default Page
