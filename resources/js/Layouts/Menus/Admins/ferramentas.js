import chaves from "@/Layouts/Menus/chaves";
import {Box} from "react-bootstrap-icons";

const dashboard = {
    id: 'ferramentas',
    title: '',
    type: 'group',
    children: [
        {
            id: 'ferramentas',
            title: 'Ferramentas',
            type: 'collapse',
            url: undefined,
            icon: Box,
            submenu: [
                {
                    id: 'ferramentas-agenda',
                    chave: chaves.ferramentas.agenda,
                    title: 'Agenda',
                    type: 'item',
                    url: route('admin.agenda.calendario.index'),
                }, {
                    id: 'ferramentas-tarefas',
                    chave: chaves.ferramentas.tarefas,
                    title: 'Tarefas',
                    type: 'item',
                    url: route('admin.ferramentas.tarefas.index'),
                }, {
                    id: 'ferramentas-bibliotecas',
                    chave: chaves.ferramentas.bibliotecas,
                    title: 'Bibliotecas',
                    type: 'item',
                    url: route('admin.ferramentas.bibliotecas.index'),
                }, {
                    id: 'ferramentas-email',
                    chave: chaves.ferramentas.email,
                    title: 'E-mail',
                    type: 'item',
                    url: route('admin.emails.index'),
                }
            ]
        }
    ]
};

export default dashboard;
