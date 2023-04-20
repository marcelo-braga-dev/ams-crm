import * as React from "react";

export default function Sidebar({menuSidebar, submenuSidebar}) {
    const logo = "/storage/crm/imagens/logo_ams.png";

    const pages = [{
        'menu': 'Pedidos',
        'tag': 'pedidos',
        'icone': 'fas fa-angle-double-right',
        'submenu': [{
            'menu': 'Lista de Pedidos',
            'url': route('admin.pedidos.index'),
            'tag': 'lista'
        }, {'menu': 'Histórico', 'url': route('admin.historico.index'), 'tag': 'historico'}, {
            'menu': 'Configurações',
            'url': route('admin.config.index'),
            'tag': 'config'
        }]
    }, {
        'menu': 'Chat Interno',
        'tag': 'chat-interno',
        'icone': 'fas fa-angle-double-right',
        'submenu': [{'menu': 'Mensagens', 'url': route('admin.chat-interno.index'), 'tag': 'mensagens'},]
    }, {
        'menu': 'Dashboard',
        'tag': 'dashboard',
        'icone': 'fas fa-angle-double-right',
        'submenu': [
            {'menu': 'Indicadores de Vendas', 'url': route('admin.dashboard.vendas.index'), 'tag': 'vendas'},
            {'menu': 'Indicadores de Econômicos', 'url': route('admin.dashboard.economicos.index'), 'tag': 'economicos'},
            {'menu': 'Indicadores de Financeiros', 'url': route('admin.dashboard.financeiros.index'), 'tag': 'financeiros'},
        ]
    },{
        'menu': 'Agenda',
        'tag': 'calendario',
        'icone': 'fas fa-angle-double-right',
        'submenu': [{'menu': 'Calendário', 'url': route('admin.agenda.calendario.index'), 'tag': 'calendario'},]
    }, {
        'menu': 'Leads',
        'tag': 'leads',
        'icone': 'fas fa-angle-double-right',
        'submenu': [
            {'menu': 'Relatórios', 'url': route('admin.leads.relatorios.index'), 'tag': 'relatorios'},
            {
                'menu': 'Leads Cadastrados',
                'url': route('admin.clientes.leads.leads-cadastrados'),
                'tag': 'cadastrados'
            }, {
                'menu': 'Cadastrar Leads',
                'url': route('admin.clientes.leads.leads-main.create'),
                'tag': 'cadastrar'
            }, {
                'menu': 'Encaminhar Leads', 'url': route('admin.clientes.leads.leads-main.index'), 'tag': 'encaminhar'
            }, {'menu': 'Alterar Consultor', 'url': route('admin.clientes.leads.alterar-consultor'), 'tag': 'alterar'},
            {'menu': 'Importar Planilhas', 'url': route('admin.clientes.leads.importar.index'), 'tag': 'importar'},]
    }, {
        'menu': 'Metas de Vendas',
        'icone': 'fas fa-angle-double-right',
        'tag': 'meta-vendas',
        'submenu': [
            {'menu': 'Consultores', 'url': route('admin.metas-vendas.consultores.index'), 'tag': 'consultores'},
        ]
    }, {
        'menu': 'E-mails',
        'icone': 'fas fa-angle-double-right',
        'tag': 'emails',
        'submenu': [{'menu': 'Caixa de Entrada', 'url': route('admin.emails.index')}, {
            'menu': 'Enviar Email',
            'url': route('admin.emails.create')
        }, {'menu': 'Configurações', 'url': route('admin.emails.config')},]
    }, {
        'menu': 'Contas de Usuários',
        'tag': 'usuarios',
        'icone': 'fas fa-angle-double-right',
        'submenu': [{
            'menu': 'Usuários',
            'url': route('admin.usuarios.usuario.index'),
            'tag': 'contas'
        }, {'menu': 'Migrar Conteúdo', 'url': route('admin.usuarios.migrar.index'), 'tag': 'migrar'},]
    }, {
        'menu': 'SAC',
        'tag': 'sac',
        'icone': 'fas fa-angle-double-right',
        'submenu': [{'menu': 'Chamados', 'url': route('admin.chamado.index'), 'tag': 'chamados'},]
    }, {
        'menu': 'Fornecedores',
        'tag': 'fornecedores',
        'icone': 'fas fa-angle-double-right',
        'submenu': [{'menu': 'Forncedeores', 'url': route('admin.fornecedores.index'), 'tag': 'lista'},]
    }, {
        'menu': 'Configurações',
        'tag': 'config',
        'icone': 'fas fa-angle-double-right',
        'submenu': [{'menu': 'Setores', 'url': route('admin.config.categorias.index'), 'tag': 'setores'},]
    }, {
        'menu': 'Desenvolvimento',
        'tag': 'dev',
        'icone': 'fas fa-angle-double-right',
        'submenu': [{'menu': 'Registros', 'url': route('admin.dev.index'), 'tag': 'registros'}, {
            'menu': 'Cadastrar',
            'url': route('admin.dev.create'),
            'tag': 'cadastrar'
        },]
    },];

    function pageCurrent(url) {
        return {color: 'black', fontWeight: 600};
    }

    return (<>
        {/*<div className="position-absolute w-100" style={{minHeight: '10vh', "backgroundColor": "#252525"}}></div>*/}
        <aside id="sidenav-main" style={{zIndex: 100}}
               className="sidenav bg-white navbar navbar-vertical navbar-expand-xs fixed-start">
            <div style={{"backgroundColor": "#252525"}}>
                <a href="/">
                    <div className="text-center py-3">
                        <img src={logo} className="" width={100} alt="main_logo"/>
                    </div>
                </a>
            </div>
            <div className="horizontal px-1 mt-3">
                <div className="accordion accordion-flush w-auto mb-6" id="accordionFlushSidebar">

                    {/*ITEMS*/}
                    {pages.map(({menu, icone, submenu, tag}, index) => (
                        <div key={index} className="accordion-item text-dark navbar-nav border-bottom py-1">
                            <div className="accordion-header nav-item" id={"flush-heading-" + index}>
                                <div
                                    className={(tag === menuSidebar ? '' : 'collapsed ') + "accordion-button nav-link p-1 m-0"}
                                    data-bs-toggle="collapse"
                                    data-bs-target={"#flush-collapse-" + index} aria-expanded="false"
                                    aria-controls={"flush-collapse-" + index}>
                                    <div
                                        className="icon icon-sm border-radius-md d-flex align-items-center">
                                        <i className={icone + " text-dark text-sm opacity-10"}></i>
                                    </div>
                                    <span className="ms-2 font-weight-bold">{menu}</span>
                                </div>
                            </div>

                            <div id={"flush-collapse-" + index}
                                 className={(tag === menuSidebar ? 'show ' : 'x') + "accordion-collapse nav-item collapse"}
                                 aria-labelledby={"flush-heading-" + index}
                                 data-bs-parent="#accordionFlushSidebar">

                                {submenu.map(({menu, url, tag}, i) => (
                                    <a href={url} key={i} className="text-sm text-muted">
                                        <div className="accordion-body p-0 ms-5 mb-2">
                                                <span className="nav-link-text"
                                                      style={tag === submenuSidebar ? pageCurrent() : {}}>
                                                    {menu}
                                                </span>
                                        </div>
                                    </a>))}
                            </div>
                        </div>))}
                    {/*ITEMS - FIM*/}
                </div>
            </div>
        </aside>
    </>)
}
