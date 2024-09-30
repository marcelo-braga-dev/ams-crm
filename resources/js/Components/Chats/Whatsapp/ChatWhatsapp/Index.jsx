import { WhatsappProvider } from '@/Contexts/WhatsappContext.jsx';
import ChatWhatsappIflame from '@/Components/Chats/Whatsapp/ChatWhatsapp/ChatWhatsappIflame.jsx';

const ChatWhatsapp = () => {
    return (
        <WhatsappProvider>
            <ChatWhatsappIflame />
        </WhatsappProvider>
    );
};
export default ChatWhatsapp;
