import chaves from "@/Layouts/Menus/chaves";
import {Folder} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'orcamentos',
            title: 'Orçamentos',
            type: 'collapse',
            url: undefined,
            icon: Folder,
            submenu: [
                {
                    id: 'orcamentos-solar',
                    chave: chaves.dev.chamados,
                    title: 'Orçamentos Solar',
                    type: 'item',
                    url: route('consultor.orcamentos.index'),
                },
            ]
        }
    ]
};

export default dashboard;
