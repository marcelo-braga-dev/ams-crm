import ChatInterno from "@/Components/Chats/ChatInterno/ChatInterno";
import Layout from "@/Layouts/Layout";

export default function ({pessoas, setores, chatId}) {
    return (
        <ChatInterno
            pessoas={pessoas}
            setores={setores}
            chatId={chatId}
            getUrl={'admin.chat-interno.mensagens'}
            urlSubmit={route('admin.chat-interno.store')}
            Layout={Layout}
            admin={true}
        />
    )
}
