import Layout from "@/Layouts/Supervisor/Layout";
import ChatInterno from "@/Components/Chats/ChatInterno/ChatInterno";

export default function ({pessoas}) {

    return (
        <ChatInterno
            pessoas={pessoas}
            getUrl={'supervisor.chat-interno.mensagens'}
            urlSubmit={route('supervisor.chat-interno.store')}
            Layout={Layout}
        />
    )
}
