import chaves from "@/Layouts/Menus/chaves";
import {Coin} from "react-bootstrap-icons";

const dashboard = {
    id: 'adada',
    title: '',
    type: 'group',
    children: [
        {
            id: 'financeiro',
            title: 'Financeiro',
            type: 'collapse',
            url: undefined,
            icon: Coin,
            submenu: [
                {
                    id: 'fluxo-caixa',
                    chave: chaves.financeiro.fluxocaixa,
                    title: 'Fluxo de Caixa',
                    type: 'item',
                    url: route('admin.financeiro.fluxo-caixa.index'),
                }, {
                    id: 'financeiro-salarios',
                    chave: chaves.financeiro.salario,
                    title: 'Salários',
                    type: 'item',
                    url: route('admin.financeiro.salarios.index'),
                }, {
                    id: 'financeiro-faturamento',
                    chave: chaves.financeiro.faturamento,
                    title: 'Faturamento',
                    type: 'item',
                    url: route('admin.financeiro.faturamento.index'),
                }, {
                    id: 'financeiro-config',
                    chave: chaves.financeiro.cadastros,
                    title: 'Configurações',
                    type: 'item',
                    url: route('admin.financeiro.config.index'),
                }
            ]
        }
    ]
};

export default dashboard;
