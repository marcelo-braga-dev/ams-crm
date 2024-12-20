import chaves from "@/Layouts/Menus/chaves";
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
                    chave: chaves.pedidos.quadros,
                    title: 'Quadro de Pedidos',
                    type: 'item',
                    url: route('admin.pedidos.index'),
                }, {
                    id: 'pedidos-fretes',
                    chave: chaves.pedidos.fretes,
                    title: 'Fretes',
                    type: 'item',
                    url: route('admin.pedidos.fretes.index'),
                }, {
                    id: 'pedidos-historico',
                    chave: chaves.pedidos.historico,
                    title: 'Histórico de Pedidos',
                    type: 'item',
                    url: route('admin.historico.index'),
                }, {
                    id: 'pedidos-relatorios',
                    chave: chaves.pedidos.relatorio,
                    title: 'Relatórios',
                    admin: true,
                    type: 'item',
                    url: route('admin.relatorios.vendas.index'),
                }, {
                    id: 'pedidos-config',
                    chave: chaves.pedidos.config,
                    title: 'Configurações',
                    type: 'item',
                    admin: true,
                    url: route('admin.config.index'),
                }, {
                    id: 'pedidos-permissoes',
                    chave: chaves.pedidos.config,
                    title: 'Permissões',
                    type: 'item',
                    admin: true,
                    url: route('admin.pedidos.permissao.index'),
                }
            ]
        }
    ]
};

export default dashboard;
