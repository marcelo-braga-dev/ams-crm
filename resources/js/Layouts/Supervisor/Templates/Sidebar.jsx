import * as React from "react";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

export default function Sidebar({menuSidebar, submenuSidebar}) {
    const logo = "/storage/crm/imagens/logo_ams.png";

    const pages = [
        {
            'menu': 'Pedidos',
            'icone': <RequestPageOutlinedIcon/>,
            'tag': 'pedidos',
            'submenu': [
                {'menu': 'Lista de Pedidos', 'url': route('supervisor.pedidos.index'), 'tag': 'cards'},
                {'menu': 'Históricos', 'url': route('supervisor.pedidos.historicos.index'), 'tag': ''},
                {'menu': 'Configurações', 'url': route('supervisor.pedidos.config.index'), 'tag': 'config'}
            ]
        }, {
            'menu': 'Chat Interno',
            'tag': 'chat-interno',
            'icone': <QuestionAnswerOutlinedIcon/>,
            'submenu': [
                {'menu': 'Mensagens', 'url': route('supervisor.chat-interno.index'), 'tag': 'mensagens'},
            ]
        }, {
            'menu': 'Leads',
            'icone': <PeopleAltOutlinedIcon/>,
            'tag': 'leads',
            'submenu': [
                {'menu': 'Leads Cadastrados', 'url': route('supervisor.clientes.leads.leads-cadastrados'), tag: 'cadastrados'},
                {'menu': 'Cadastrar Leads', 'url': route('supervisor.clientes.leads.leads-main.create'), tag: 'cadastrar'},
                {'menu': 'Encaminhar Leads', 'url': route('supervisor.clientes.leads.leads-main.index'), tag: 'encaminhar'},
                {'menu': 'Alterar Consultor', 'url': route('supervisor.clientes.leads.alterar-consultor'), tag: 'alterar'},
            ]
        }, {
            'menu': 'SAC',
            'icone': <SpeakerNotesOutlinedIcon/>,
            'tag': 'sac',
            'submenu': [
                {'menu': 'Chamados', 'url': route('supervisor.chamados.index'), 'tag': 'chamados'},
            ]
        }, {
            'menu': 'Fornecedores',
            'icone': <LocalShippingOutlinedIcon/>,
            'tag': 'fornecedores',
            'submenu': [
                {'menu': 'Forncedeores', 'url': route('supervisor.fornecedores.index'), tag: "fornecedores"},
            ]
        },
    ];

    function pageCurrent() {
        return {color: 'black', fontWeight: 600};
    }

    return (
        <aside id="sidenav-main" style={{zIndex: 100}}
                   className="sidenav bg-white navbar navbar-vertical navbar-expand-xs fixed-start">
            <div style={{"backgroundColor": "#252525"}}>
                <a href="/">
                    <div className="text-center py-2">
                        <img src={logo} width="130" alt="main_logo"/>
                    </div>
                </a>
            </div>
            <div className="accordion accordion-flush w-auto mb-6" id="accordionFlushSidebar">
                {pages.map(({menu, icone, submenu, tag}, index) => (
                    <div key={index} className="accordion-item text-dark navbar-nav py-1 px-2">
                        <div className="accordion-header nav-item" id={"flush-heading-" + index}>
                            <div
                                className={(tag === menuSidebar ? '' : 'collapsed ') + "accordion-button nav-link p-1 ms-0"}
                                data-bs-toggle="collapse" data-bs-target={"#flush-collapse-" + index}
                                aria-controls={"flush-collapse-" + index}>
                                <div className="icon icon-sm d-flex align-items-center me-2">
                                    {icone}
                                </div>
                                <span className="text-wrap pt-1 text-primary">{menu}</span>
                            </div>
                        </div>

                        <div id={"flush-collapse-" + index}
                             className={(tag === menuSidebar ? 'show ' : '') + "accordion-collapse nav-item collapse"}
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
        </aside>
    )
}
