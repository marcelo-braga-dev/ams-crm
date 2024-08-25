import chaves from "@/Layouts/Menus/chaves";
import {ChatText} from "react-bootstrap-icons";

const dashboard = {
    id: 'chat',
    title: '',
    type: 'group',
    children: [
        {
            id: 'chats',
            title: 'Chats',
            type: 'collapse',
            url: undefined,
            icon: ChatText,
            submenu: [
                {
                    id: 'chats-whatsapp',
                    chave: chaves.chats.interno,
                    title: 'WhatsApp',
                    type: 'item',
                    url: route('admin.chats.whatsapp.index'),
                }, {
                    id: 'chat-interno',
                    chave: chaves.chats.interno,
                    title: 'Chat Interno',
                    type: 'item',
                    url: route('admin.chat-interno.index'),
                },
            ]
        }
    ]
};

export default dashboard;
