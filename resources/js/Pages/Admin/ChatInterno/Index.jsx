import Layout from "@/Layouts/Admin/Layout";
import ChatInterno from "@/Components/Elementos/ChatInterno";

export default function ({conversas, pessoas}) {

    return (
        <Layout container titlePage="Chat Interno" menu="chat-interno" submenu="mensagens">

            <ChatInterno
                conversas={conversas}
                pessoas={pessoas}
                getUrl={'admin.chat-interno.mensagens'}
                urlSubmit={route('admin.chat-interno.store')}
            />
        </Layout>
    )
}
