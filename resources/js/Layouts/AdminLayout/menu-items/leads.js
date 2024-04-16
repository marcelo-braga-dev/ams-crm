import * as React from "react";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'leads',
            title: 'Leads',
            type: 'collapse',
            url: undefined,
            icon: PeopleAltOutlinedIcon,
            submenu: [
                {
                    id: 'leads-cadastrados',
                    title: 'Cadastrados',
                    type: 'item',
                    url: route('admin.clientes.leads.leads-cadastrados'),
                }, {
                    id: 'leads-cadastrar',
                    title: 'Cadastrar',
                    type: 'item',
                    url: route('admin.clientes.leads.leads-main.create'),
                }, {
                    id: 'leads-historico',
                    title: 'Histórico',
                    type: 'item',
                    url: route('admin.clientes.leads.leads-acompanhar'),
                }, {
                    id: 'leads-encaminhar',
                    title: 'Encaminhar',
                    type: 'item',
                    url: route('admin.clientes.leads.leads-main.index'),
                }, {
                    id: 'leads-alterar',
                    title: 'Alterar Consultor',
                    type: 'item',
                    url: route('admin.clientes.leads.alterar-consultor'),
                }, {
                    id: 'leads-relatorios',
                    title: 'Relatórios',
                    type: 'item',
                    url: route('admin.leads.relatorios.index'),
                },{
                    id: 'leads-importar',
                    title: 'Importar Planilhas',
                    type: 'item',
                    admin: true,
                    url: route('admin.clientes.leads.importar.index'),
                }
            ]
        }
    ]
};

export default dashboard;
