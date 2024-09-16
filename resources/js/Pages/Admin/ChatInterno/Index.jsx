import ChatInterno from "@/Components/Chats/ChatInterno/ChatInterno";
import Layout from "@/Layouts/Layout";
import {Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import Alert from "@mui/material/Alert";


export default function ({pessoas, setores, chatId}) {
    return (
        <Layout titlePage="Chat Interno" menu="chats" submenu="chat-interno">
            <CardContainer>
                <CardBody>
                    <Alert severity="warning">CHAT INTERNO EM MANUTENÇÃO.</Alert>
                </CardBody>
            </CardContainer>
        </Layout>

    )
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
