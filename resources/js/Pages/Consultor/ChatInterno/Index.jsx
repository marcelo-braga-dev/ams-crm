import Layout from "@/Layouts/Consultor/Layout";
import ChatInterno from "@/Components/Elementos/ChatInterno";

export default function ({conversas, pessoas}) {

    return (
        <Layout container titlePage="Chat Interno" menu="chat-interno" submenu="mensagens">

            <ChatInterno
                conversas={conversas}
                pessoas={pessoas}
                getUrl={'consultor.chat-interno.mensagens'}
                urlSubmit={route('consultor.chat-interno.store')}
            />
        </Layout>
    )
}
