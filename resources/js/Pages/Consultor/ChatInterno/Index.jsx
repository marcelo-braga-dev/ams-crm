import Layout from "@/Layouts/Layout";
import ChatInterno from "@/Components/Chats/ChatInterno/ChatInterno";

export default function ({pessoas, setores, chatId}) {

    return (
        <ChatInterno
            pessoas={pessoas}
            setores={setores}
            chatId={chatId}
            getUrl={'consultor.chat-interno.mensagens'}
            urlSubmit={route('consultor.chat-interno.store')}
            Layout={Layout}
        />
    )
}
