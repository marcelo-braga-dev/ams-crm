import * as React from "react";
import {usePage} from "@inertiajs/react";

import {ItemsMenuSidebar} from "@/Layouts/Consultor/Templates/ItemsMenuSidebar";

export default function Sidebar() {
    const {props} = usePage();

    const logo = "/storage/crm/imagens/logo_ams.png";

    function pageCurrent(url) {
        const urlAtual = window.location.protocol + '//' + window.location.host + window.location.pathname
        if (url === urlAtual) {
            return {color: 'black', fontWeight: 600};
        }
    }

    return (<>
            <aside id="sidenav-main" style={{zIndex: 100}}
                   className="sidenav bg-white navbar navbar-vertical navbar-expand-xs fixed-start">
                <div style={{"backgroundColor": "#252525"}}>
                    <a href="/">
                        <div className="text-center py-2">
                            <img src={logo} width="130" alt="main_logo"/>
                        </div>
                    </a>
                </div>
                <div className="horizontal pe-2 ps-2 mt-3">
                    <div className="w-auto mb-6" id="accordionFlushSidebar">

                        {/*ITEMS*/}
                        {ItemsMenuSidebar.map(({menu, icone, submenu}, index) => (
                            <div key={index} className="accordio n-item text-dark navbar-nav">
                                <div className="accordion-hea der nav-item" id={"flush-heading-" + index}>
                                    <div className="nav-link p-1"
                                         data-bs-target={"#flush-coll apse-" + index} aria-expanded="false">
                                        <div className="icon icon-sm d-flex align-items-center me-2">
                                            {icone}
                                        </div>
                                        <span className="text-wrap pt-1 text-primary">{menu}</span>
                                    </div>
                                </div>
                                <div id={"flush-collapse-" + index} className="accordion-collapse  nav-item"
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
                        <div className="row py-2 mt-4">
                            <div className=" text-center sticky-bottom text-white">
                                <small className="" style={{color: props.setorUsuario.cor}}>
                                    Setor: {props.setorUsuario.nome}
                                </small>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    )
}
