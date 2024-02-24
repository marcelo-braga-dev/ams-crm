import InsertChartOutlinedRoundedIcon from "@mui/icons-material/InsertChartOutlinedRounded";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";
import * as React from "react";

export const ItemsMenuSidebar = [
    {
        'menu': 'Dashboard',
        'tag': 'dashboard',
        'icone': <InsertChartOutlinedRoundedIcon/>,
        'submenu': [
            {'menu': 'Indicadores de Vendas', 'url': route('admin.dashboard.vendas.index'), 'tag': 'vendas'},
            {
                'menu': 'Indicadores de Econômicos',
                'url': route('admin.dashboard.economicos.index'),
                'tag': 'economicos'
            },
            {
                'menu': 'Indicadores de Financeiros',
                'url': route('admin.dashboard.financeiros.index'),
                'tag': 'financeiros'
            },
        ]
    }, {
        'menu': 'Pedidos',
        'tag': 'pedidos',
        'icone': <RequestPageOutlinedIcon/>,
        'submenu': [
            {
                'menu': 'Lista de Pedidos',
                'url': route('admin.pedidos.index'),
                'tag': 'lista'
            }, {
                'menu': 'Relatório de Pedidos',
                'url': null,
                'tag': 'relatorios',
                'submenu': [
                    {
                        'menu': 'Produtos',
                        'url': route('admin.pedidos.relatorios.produtos.index'),
                        'tag': 'produtos'
                    },
                    {
                        'menu': 'Faturamento',
                        'url': route('admin.pedidos.relatorios.faturamento.index'),
                        'tag': 'faturamento'
                    },
                ]
            }, {
                'menu': 'Histórico', 'url': route('admin.historico.index'), 'tag': 'historico'
            }, {
                'menu': 'Configurações',
                'url': route('admin.config.index'),
                'tag': 'config'
            }]
    }, {
        'menu': 'Produtos',
        'icone': <Inventory2OutlinedIcon/>,
        'tag': 'produtos',
        'submenu': [
            {'menu': 'Todos Produtos', 'url': route('admin.produtos-fornecedores.index'), 'tag': 'todos-produtos'},
            {'menu': 'Categorias', 'url': route('admin.produtos-categorias.index'), 'tag': 'categorias'},
            {'menu': 'Unidades', 'url': route('admin.produtos-unidades.index'), 'tag': 'unidades'},
            {
                'menu': 'Estoques',
                'submenu': [
                    {
                        'menu': 'Estoque em Transito',
                        'url': route('admin.estoque-transito.index'),
                        'tag': 'estoque-transito'
                    },
                    {'menu': 'Estoque Local', 'url': route('admin.estoque-local.index'), 'tag': 'estoque-local'},
                ]
            }
        ]
    }, {
        'menu': 'Chat Interno',
        'tag': 'chat-interno',
        'icone': <QuestionAnswerOutlinedIcon/>,
        'submenu': [{'menu': 'Mensagens', 'url': route('admin.chat-interno.index'), 'tag': 'mensagens'},]
    }, {
        'menu': 'Agenda',
        'tag': 'calendario',
        'icone': <EventNoteOutlinedIcon/>,
        'submenu': [{'menu': 'Calendário', 'url': route('admin.agenda.calendario.index'), 'tag': 'calendario'},]
    }, {
        'menu': 'Leads',
        'tag': 'leads',
        'icone': <PeopleAltOutlinedIcon/>,
        'submenu': [
            {'menu': 'Relatórios', 'url': route('admin.leads.relatorios.index'), 'tag': 'relatorios'},
            {
                'menu': 'Histórico dos Leads',
                'url': route('admin.clientes.leads.leads-acompanhar'),
                'tag': 'acompanhar'
            }, {
                'menu': 'Leads Cadastrados',
                'url': route('admin.clientes.leads.leads-cadastrados'),
                'tag': 'cadastrados'
            }, {
                'menu': 'Cadastrar Leads',
                'url': route('admin.clientes.leads.leads-main.create'),
                'tag': 'cadastrar'
            }, {
                'menu': 'Encaminhar Leads',
                'url': route('admin.clientes.leads.leads-main.index'),
                'tag': 'encaminhar'
            }, {
                'menu': 'Alterar Consultor',
                'url': route('admin.clientes.leads.alterar-consultor'),
                'tag': 'alterar'
            },
            {'menu': 'Importar Planilhas', 'url': route('admin.clientes.leads.importar.index'), 'tag': 'importar'},
            {'menu': 'Status dos Leads', 'url': route('admin.clientes.leads.status.index'), 'tag': 'status'},
        ]
    }, {
        'menu': 'Metas de Vendas',
        'icone': <TrendingUpOutlinedIcon/>,
        'tag': 'meta-vendas',
        'submenu': [
            {'menu': 'Vendedores', 'url': route('admin.metas-vendas.consultores.index'), 'tag': 'consultores'},
            {'menu': 'Comissões', 'url': route('admin.metas-vendas.comissoes.index'), 'tag': 'comissoes'},
        ]
    }, {
        'menu': 'E-mails',
        'icone': <EmailOutlinedIcon/>,
        'tag': 'emails',
        'submenu': [
            {'menu': 'Caixa de Entrada', 'url': route('admin.emails.index'), 'tag': 'recebidas'},
            {'menu': 'Enviar Email', 'url': route('admin.emails.create'), 'tag': 'enviar'},
            {'menu': 'Configurações', 'url': route('admin.emails.config'), 'tag': 'config'},
        ]
    }, {
        'menu': 'Contas de Usuários',
        'tag': 'usuarios',
        'icone': <PersonOutlineOutlinedIcon/>,
        'submenu': [{
            'menu': 'Usuários',
            'url': route('admin.usuarios.usuario.index'),
            'tag': 'contas'
        }, {'menu': 'Migrar Conteúdo', 'url': route('admin.usuarios.migrar.index'), 'tag': 'migrar'},]
    }, {
        'menu': 'SAC',
        'tag': 'sac',
        'icone': <SpeakerNotesOutlinedIcon/>,
        'submenu': [{'menu': 'Chamados', 'url': route('admin.chamado.index'), 'tag': 'chamados'},]
    }, {
        'menu': 'Fornecedores',
        'tag': 'fornecedores',
        'icone': <LocalShippingOutlinedIcon/>,
        'submenu': [{'menu': 'Forncedeores', 'url': route('admin.fornecedores.index'), 'tag': 'lista'},]
    }, {
        'menu': 'Configurações',
        'tag': 'config',
        'icone': <SettingsSuggestOutlinedIcon/>,
        'submenu': [{'menu': 'Setores', 'url': route('admin.config.categorias.index'), 'tag': 'setores'},]
    }, {
        'menu': 'Desenvolvimento',
        'tag': 'dev',
        'icone': <LaptopMacOutlinedIcon/>,
        'submenu': [{'menu': 'Registros', 'url': route('admin.dev.index'), 'tag': 'registros'}, {
            'menu': 'Cadastrar',
            'url': route('admin.dev.create'),
            'tag': 'cadastrar'
        },]
    },
];
