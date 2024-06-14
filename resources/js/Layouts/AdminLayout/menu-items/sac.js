import chaves from "@/Layouts/VendedorLayout/menu-items/chaves";
import {Tag} from "react-bootstrap-icons";

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
            icon: Tag,
            submenu: [
                {
                    id: 'sac-chamados',
                    chave: chaves.sac.chamados,
                    title: 'Chamados',
                    type: 'item',
                    url: route('admin.chamados.index'),
                }
            ]
        }
    ]
};

export default dashboard;
