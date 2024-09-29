import chaves from '@/Layouts/Menus/chaves';
import { Whatsapp } from 'react-bootstrap-icons';

const menu = {
    id: 'whatsapp',
    title: '',
    type: 'group',
    children: [
        {
            id: 'whatsapp',
            title: 'Whatsapp',
            type: 'collapse',
            url: undefined,
            icon: Whatsapp,
            submenu: [
                {
                    id: 'whatsapp-chat',
                    chave: chaves.chats.whatsapp.chat,
                    title: 'WhatsApp',
                    type: 'item',
                    url: route('auth.ferramentas.whatsapp.index'),
                },
            ],
        },
    ],
};

export default menu;
