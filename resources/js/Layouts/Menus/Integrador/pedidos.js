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
                },{
                    id: 'pedidos-historico',
                    chave: true,
                    title: 'Histórico de Pedidos',
                    type: 'item',
                    url: route('integrador.pedidos.historico.index'),
                },
            ]
        }
    ]
};

export default dashboard;
