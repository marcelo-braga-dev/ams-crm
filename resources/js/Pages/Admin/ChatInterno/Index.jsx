import ChatInterno from "@/Components/Chats/ChatInterno/ChatInterno";
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

export default function ({pessoas, setores}) {
    return (
        <ChatInterno
            pessoas={pessoas}
            setores={setores}
            getUrl={'admin.chat-interno.mensagens'}
            urlSubmit={route('admin.chat-interno.store')}
            Layout={Layout}
            admin={true}
        />
    )
}
