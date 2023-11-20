import ChatInterno from "@/Components/Chats/ChatInterno/ChatInterno";
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

export default function ({pessoas}) {
    return (
        <ChatInterno
            pessoas={pessoas}
            getUrl={'admin.chat-interno.mensagens'}
            urlSubmit={route('admin.chat-interno.store')}
            Layout={Layout}
            admin={true}
        />
    )
}
