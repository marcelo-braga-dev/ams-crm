import chaves from "@/Layouts/VendedorLayout/menu-items/chaves";
import {CodeSlash} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dev',
            title: 'Desenvolvimento',
            type: 'collapse',
            url: undefined,
            icon: CodeSlash,
            admin: true,
            submenu: [
                {
                    id: 'dev-registros',
                    chave: chaves.dev.chamados,
                    title: 'Registros',
                    type: 'item',
                    url: route('admin.dev.index'),
                },
                {
                    id: 'dev-cadastrar',
                    chave: chaves.dev.chamados,
                    title: 'Cadastrar',
                    type: 'item',
                    url: route('admin.dev.create'),
                },
            ]
        }
    ]
};

export default dashboard;
