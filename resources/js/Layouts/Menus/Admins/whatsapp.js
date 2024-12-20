import chaves from '@/Layouts/Menus/chaves';
import {Whatsapp} from 'react-bootstrap-icons';

const dashboard = {
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
                }, {
                    id: 'whatsapp-contatos',
                    chave: chaves.chats.whatsapp.usuarios,
                    title: 'Contatos',
                    type: 'item',
                    url: route('auth.ferramentas.whatsapp.contato.index'),
                },{
                    id: 'whatsapp-conexoes',
                    chave: chaves.chats.whatsapp.usuarios,
                    title: 'Conexões',
                    type: 'item',
                    url: route('auth.ferramentas.whatsapp.conexoes.index'),
                }, {
                    id: 'whatsapp-usuario',
                    chave: chaves.chats.whatsapp.usuarios,
                    title: 'Usuários',
                    type: 'item',
                    url: route('admin.ferramentas.whatsapp.usuario.index'),
                },
            ],
        },
    ],
};

export default dashboard;
