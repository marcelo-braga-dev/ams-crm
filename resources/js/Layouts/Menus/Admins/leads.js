import chaves from '@/Layouts/Menus/chaves';
import { People } from 'react-bootstrap-icons';

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
                // {
                //     id: 'leads-gerenciar',
                //     chave: chaves.leads.cadastrados,
                //     title: 'Gerenciar Leads',
                //     type: 'item',
                //     url: route('auth.leads.gerenciar.index'),
                // },
                {
                    id: 'leads-encaminhar',
                    chave: chaves.leads.cadastrados,
                    title: 'Leads',
                    type: 'item',
                    url: route('admin.clientes.leads.leads-cadastrados'),
                }, {
                    id: 'leads-cadastrar',
                    chave: chaves.leads.cadastrar,
                    title: 'Cadastrar',
                    type: 'item',
                    url: route('auth.leads.create'),
                }, {
                    id: 'leads-kanban',
                    chave: chaves.leads.kanban,
                    title: 'Funil de Vendas',
                    type: 'item',
                    url: route('auth.leads.funil-vendas-kanban.index'),
                }, {
                    id: 'leads-cards',
                    chave: chaves.leads.quadros,
                    title: 'Gerenciar de Leads',
                    type: 'item',
                    url: route('admin.leads.gerenciar.gerenciar-leads.index'),
                }, {
                    id: 'leads-historico',
                    chave: chaves.leads.historico,
                    title: 'Histórico',
                    type: 'item',
                    url: route('auth.leads.historico.index'),
                }, {
                    id: 'leads-encaminhados',
                    chave: chaves.leads.encaminhados,
                    title: 'Encaminhados',
                    type: 'item',
                    url: route('admin.leads.encaminhados.index'),
                }, {
                    id: 'leads-relatorios',
                    chave: chaves.leads.relatorio,
                    title: 'Relatórios',
                    type: 'item',
                    url: route('admin.leads.relatorios.index'),
                }, {
                    id: 'leads-importar',
                    chave: chaves.leads.importar,
                    title: 'Importar Planilhas',
                    type: 'item',
                    admin: true,
                    url: route('admin.clientes.leads.importar.index'),
                },
            ],
        },
    ],
};

export default dashboard;
