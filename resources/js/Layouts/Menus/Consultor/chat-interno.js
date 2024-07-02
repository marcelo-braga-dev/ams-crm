import chaves from "@/Layouts/Menus/chaves";
import {CardText, Chat} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'chats',
            title: 'Chats',
            type: 'collapse',
            url: undefined,
            icon: Chat,
            submenu: [
                {
                    id: 'chat-interno',
                    chave: chaves.chats.interno,
                    title: 'Chat Interno',
                    type: 'item',
                    url: route('consultor.chat-interno.index'),
                },
            ]
        }
    ]
};

export default dashboard;
