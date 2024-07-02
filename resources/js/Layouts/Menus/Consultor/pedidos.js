import chaves from "@/Layouts/Menus/chaves";
import {Folder2Open} from "react-bootstrap-icons";

const dashboard = {
    id: 'pedidos',
    title: 'Pedidos',
    type: 'group',
    children: [
        {
            id: 'pedidos',
            title: 'Pedidos',
            type: 'collapse',
            url: undefined,
            icon: Folder2Open,
            submenu: [
                {
                    id: 'pedidos-lista',
                    chave: chaves.pedidos.quadros,
                    title: 'Quadro de Pedidos',
                    type: 'item',
                    url: route('consultor.pedidos.index'),
                }, {
                    id: 'pedidos-historico',
                    chave: chaves.pedidos.historico,
                    title: 'Histórico Pedidos',
                    type: 'item',
                    url: route('consultor.historicos.index'),
                },
            ]
        }
    ]
};

export default dashboard;
