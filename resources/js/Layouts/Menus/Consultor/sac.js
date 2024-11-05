import chaves from "@/Layouts/Menus/chaves";
import {CardText, Tags} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'sac',
            title: 'SAC',
            type: 'collapse',
            url: undefined,
            icon: Tags,
            submenu: [
                {
                    id: 'sac-chamados',
                    chave: chaves.sac.chamados,
                    title: 'Chamados',
                    type: 'item',
                    url: route('consultor.chamados.index'),
                },
            ]
        }
    ]
};

export default dashboard;
