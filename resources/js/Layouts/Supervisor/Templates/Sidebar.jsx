import * as React from "react";

export default function Sidebar() {
    const logo = "/storage/crm/imagens/logo_ams.png";

    const pages = [
        {
            'menu': 'Pedidos',
            'icone': 'fas fa-angle-double-right',
            'submenu': [
                {'menu': 'Lista de Pedidos', 'url': route('supervisor.pedidos.index')},
                {'menu': 'Históricos', 'url': route('supervisor.pedidos.historicos.index')},
                {'menu': 'Configurações', 'url': route('supervisor.pedidos.config.index')}
            ]
        }, {
            'menu': 'Chat Interno',
            'tag': 'chat-interno',
            'icone': 'fas fa-angle-double-right',
            'submenu': [
                {'menu': 'Mensagens', 'url': route('supervisor.chat-interno.index'), 'tag': 'mensagens'},
            ]
        }, {
            'menu': 'Leads',
            'icone': 'fas fa-angle-double-right',
            'submenu': [
                {'menu': 'Leads Cadastrados', 'url': route('supervisor.clientes.leads.leads-cadastrados')},
                {'menu': 'Cadastrar Leads', 'url': route('supervisor.clientes.leads.leads-main.create')},
                {'menu': 'Encaminhar Leads', 'url': route('supervisor.clientes.leads.leads-main.index')},
                {'menu': 'Alterar Consultor', 'url': route('supervisor.clientes.leads.alterar-consultor')},
            ]
        // }, {
        //     'menu': 'Contas de Usuários',
        //     'icone': 'fas fa-angle-double-right',
        //     'submenu': [
        //         {'menu': 'Usuários', 'url': route('supervisor.usuarios.usuario.index')},
        //     ]
        }, {
            'menu': 'SAC',
            'icone': 'fas fa-angle-double-right',
            'submenu': [
                {'menu': 'Chamados', 'url': route('supervisor.chamados.index')},
            ]
        }, {
            'menu': 'Fornecedores',
            'icone': 'fas fa-angle-double-right',
            'submenu': [
                {'menu': 'Forncedeores', 'url': route('supervisor.fornecedores.index')},
            ]
        },
    ];

    function pageCurrent(url) {
        const urlAtual = window.location.protocol + '//' + window.location.host + window.location.pathname
        if (url === urlAtual) {
            return {color: 'black', fontWeight: 600};
        }
    }

    return (<>
            <div className="position-absolute w-100" style={{minHeight: 80, "backgroundColor": "#252525"}}></div>
            <aside
                className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-radius-xl my-3 fixed-start ms-4"
                id="sidenav-main">
                <div style={{"backgroundColor": "#252525"}}>
                    <a href="/">
                        <div className="text-center py-3">
                            <img src={logo} className="" width={100} alt="main_logo"/>
                        </div>
                    </a>
                </div>
                <div className="horizontal pe-3 ps-2 mt-3">
                    <div className="acco rdion accord ion-flush w-auto mb-6" id="accordionFlushSidebar">

                        {/*ITEMS*/}
                        {pages.map(({menu, icone, submenu}, index) => (
                            <div key={index} className="accordio n-item text-dark navbar-nav border-bottom">
                                <div className="accordion-hea der nav-item" id={"flush-heading-" + index}>
                                    <div className="accord ion-button collap sed nav-link p-1"
                                         data-bs-toggle="colla pse"
                                         data-bs-target={"#flush-coll apse-" + index} aria-expanded="false"
                                         aria-controls={"flush-coll apse-" + index}>
                                        <div
                                            className="icon icon-shape icon-sm border-radius-md text-center d-flex align-items-center justify-content-center">
                                            <i className={icone + " text-primary text-sm opacity-10"}></i>
                                        </div>
                                        <span className="ms-2 p">{menu}</span>
                                    </div>
                                </div>
                                <div id={"flush-collapse-" + index} className="accordion-collapse  nav-item"
                                     aria-labelledby={"flush-headi ng-" + index}
                                     data-bs-parent="#accordionFlushSidebar">

                                    {submenu.map(({menu, url}, i) => (
                                        <a href={url} key={i} className="text-sm text-muted">
                                            <div className="accordion-body p-0 ms-5 mb-2">
                                                <span className="nav-link-text" style={pageCurrent(url)}>{menu}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {/*ITEMS - FIM*/}
                    </div>
                </div>
            </aside>
        </>
    )
}
