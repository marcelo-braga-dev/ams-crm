import chaves from "@/Layouts/Menus/chaves";
import {PersonGear} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'usuarios',
            title: 'Usuários',
            type: 'collapse',
            url: undefined,
            icon: PersonGear,
            submenu: [
                {
                    id: 'usuarios-contas',
                    chave: chaves.usuarios.contas,
                    title: 'Contas de Usuários',
                    type: 'item',
                    url: route('admin.usuarios.usuario.index'),
                }, {
                    id: 'usuarios-funcoes',
                    chave: chaves.usuarios.funcoes,
                    title: 'Funções',
                    type: 'item',
                    url: route('admin.usuarios.funcoes.index'),
                }, {
                    id: 'usuarios-online',
                    chave: chaves.usuarios.online,
                    title: 'Histórico Online',
                    type: 'item',
                    url: route('admin.usuarios.historico-online.index'),
                }, {
                    id: 'usuarios-migrar',
                    chave: chaves.usuarios.migrar,
                    title: 'Migrar Conteúdo',
                    type: 'item',
                    url: route('admin.usuarios.migrar.index'),
                }
            ]
        }
    ]
};

export default dashboard;
