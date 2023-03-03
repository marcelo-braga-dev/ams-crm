import Layout from "@/Layouts/Supervisor/Layout";
import ChatInterno from "@/Components/Elementos/ChatInterno";

export default function ({conversas, pessoas}) {

    return (
        <Layout container titlePage="Chat Interno" menu="chat-interno" submenu="mensagens">

            <ChatInterno
                conversas={conversas}
                pessoas={pessoas}
                getUrl={'supervisor.chat-interno.mensagens'}
                urlSubmit={route('supervisor.chat-interno.store')}
            />
        </Layout>
    )
}
