import chaves from "@/Layouts/Menus/chaves";
import {CardText, PersonGear} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'perfil',
            title: 'Perfil',
            type: 'collapse',
            url: undefined,
            icon: PersonGear,
            submenu: [
                {
                    id: 'perfil-conta',
                    chave: true,
                    title: 'Sua Conta',
                    type: 'item',
                    url: route('consultor.perfil.index'),
                },
            ]
        }
    ]
};

export default dashboard;
