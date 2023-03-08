import Layout from "@/Layouts/Consultor/Layout";
import ChatInterno from "@/Components/Chats/ChatInterno/ChatInterno";

export default function ({pessoas}) {
    return (
        <ChatInterno
            pessoas={pessoas}
            getUrl={'consultor.chat-interno.mensagens'}
            urlSubmit={route('consultor.chat-interno.store')}
            Layout={Layout}
        />
    )
}
