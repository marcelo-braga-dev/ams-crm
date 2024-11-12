import chaves from '@/Layouts/Menus/chaves';
import {Easel} from 'react-bootstrap-icons';

const dashboard = {
    id: 'cursos',
    title: '',
    type: 'group',
    children: [
        {
            id: 'cursos',
            title: 'UniLevelead',
            type: 'collapse',
            url: undefined,
            icon: Easel,
            submenu: [
                {
                    id: 'cursos-index',
                    chave: chaves.chats.interno,
                    title: 'Cursos',
                    type: 'item',
                    url: route('auth.cursos.curso.index'),
                },
            ],
        },
    ],
};

export default dashboard;
