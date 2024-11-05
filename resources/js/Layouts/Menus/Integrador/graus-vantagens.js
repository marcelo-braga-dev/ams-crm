import {Coin} from "react-bootstrap-icons";

const dashboard = {
    id: 'graus-vantagens',
    title: 'Pedidos',
    type: 'group',
    children: [
        {
            id: 'graus-vantagens',
            title: 'Graus de Vantagens',
            type: 'collapse',
            url: undefined,
            icon: Coin,
            submenu: [
                {
                    id: 'graus-vantagens-pontos',
                    chave: true,
                    title: 'Seus Pontos',
                    type: 'item',
                    url: route('integrador.graus-vantagem.graus.index'),
                },
            ]
        }
    ]
};

export default dashboard;
