import chaves from "@/Layouts/Menus/chaves";
import {BoxSeam, CardText} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'produtos',
            title: 'Produtos',
            type: 'collapse',
            url: undefined,
            icon: BoxSeam,
            submenu: [
                {
                    id: 'produtos-cadastrados',
                    chave: chaves.produtos.cadastrados,
                    title: 'Lista de Produtos',
                    type: 'item',
                    url: route('consultor.pedidos.produtos.index'),
                },
            ]
        }
    ]
};

export default dashboard;
