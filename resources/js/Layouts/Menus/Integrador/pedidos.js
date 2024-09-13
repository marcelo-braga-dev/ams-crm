import {CardText} from "react-bootstrap-icons";

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
            icon: CardText,
            submenu: [
                {
                    id: 'pedidos-lista',
                    chave: true,
                    title: 'Quadro de Pedidos',
                    type: 'item',
                    url: route('integrador.pedidos.pedido.index'),
                },
            ]
        }
    ]
};

export default dashboard;
