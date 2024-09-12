import {Person} from "react-bootstrap-icons";

const menu = {
    id: 'perfil',
    title: 'Perfil',
    type: 'group',
    children: [
        {
            id: 'perfil',
            title: 'Perfil',
            type: 'collapse',
            url: undefined,
            icon: Person,
            submenu: [
                {
                    id: 'perfil-conta',
                    chave: true,
                    title: 'Seu Perfil',
                    type: 'item',
                    url: route('auth.perfil.index'),
                },
            ]
        }
    ]
};

export default menu;
