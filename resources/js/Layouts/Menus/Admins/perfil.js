import chaves from "@/Layouts/Menus/chaves";
import {PersonGear} from "react-bootstrap-icons";

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
                    id: 'perfil-index',
                    chave: true,
                    title: 'Sua Conta',
                    type: 'item',
                    url: route('auth.perfil.index'),
                },
            ]
        }
    ]
};

export default dashboard;
