import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import ChatInterno from "@/Components/Chats/ChatInterno/ChatInterno";

export default function ({pessoas, setores}) {
    return (
        <ChatInterno
            pessoas={pessoas}
            setores={setores}
            getUrl={'consultor.chat-interno.mensagens'}
            urlSubmit={route('consultor.chat-interno.store')}
            Layout={Layout}
        />
    )
}
