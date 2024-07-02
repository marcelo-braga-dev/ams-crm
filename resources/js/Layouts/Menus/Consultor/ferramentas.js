import chaves from "@/Layouts/Menus/chaves";
import {Archive, CardText} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'ferramentas',
            title: 'Ferramentas',
            type: 'collapse',
            url: undefined,
            icon: Archive,
            submenu: [
                {
                    id: 'ferramentas-agenda',
                    chave: chaves.ferramentas.agenda,
                    title: 'Agenda',
                    type: 'item',
                    url: route('consultor.calendario.agenda.index'),
                },
            ]
        }
    ]
};

export default dashboard;
