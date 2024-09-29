import chaves from "@/Layouts/Menus/chaves";
import {Gear} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'config',
            title: 'Configurações',
            type: 'collapse',
            url: undefined,
            icon: Gear,
            submenu: [
                {
                    id: 'config-franquias',
                    chave: chaves.config.franquias,
                    title: 'Franquias',
                    type: 'item',
                    url: route('admin.franquias.index'),
                },  {
                    id: 'config-setores',
                    chave: chaves.config.setores,
                    title: 'Setores',
                    type: 'item',
                    url: route('admin.config.categorias.index'),
                },
                {
                    id: 'config-plataforma',
                    chave: chaves.config.plataforma,
                    title: 'Plataforma',
                    type: 'item',
                    admin: true,
                    url: route('admin.config.plataforma.index'),
                },
            ]
        }
    ]
};

export default dashboard;
