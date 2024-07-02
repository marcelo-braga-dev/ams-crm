import chaves from "@/Layouts/Menus/chaves";
import {CardText, People} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'leads',
            title: 'Base de Clientes',
            type: 'collapse',
            url: undefined,
            icon: People,
            submenu: [
                {
                    id: 'leads-quadros',
                    chave: chaves.leads.quadros,
                    title: 'Kanban de Clientes',
                    type: 'item',
                    url: route('consultor.leads.main.index'),
                }, {
                    id: 'leads-cadastrar',
                    chave: chaves.leads.cadastrar,
                    title: 'Cadastrar Clientes',
                    type: 'item',
                    url: route('consultor.leads.main.create'),
                }, {
                    id: 'leads-encaminhados',
                    chave: chaves.leads.encaminhados,
                    title: 'Clientes Encaminhados',
                    type: 'item',
                    url: route('consultor.leads.encaminhados.index'),
                },
            ]
        }
    ]
};

export default dashboard;
