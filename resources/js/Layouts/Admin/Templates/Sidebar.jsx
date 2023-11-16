import * as React from "react";
import {ItemsMenuSidebar} from "@/Layouts/Admin/Templates/ItemsMenuSidebar";

export default function Sidebar({menuSidebar, submenuSidebar}) {
    const logo = "/storage/crm/imagens/logo_ams.png";

    function pageCurrent(url) {
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
                {ItemsMenuSidebar.map(({menu, icone, submenu, tag}, index) => (
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

                            {submenu.map(({menu, url, tag, submenu}, i) => (
                                <div key={i}>
                                    <a href={url ?? undefined} key={i} className="text-sm text-muted">
                                        <div className="accordion-body p-0 ms-5 mb-2">
                                        <span className="nav-link-text"
                                              style={tag === submenuSidebar ? pageCurrent() : {}}>
                                            {menu}
                                        </span>
                                        </div>
                                    </a>
                                    {submenu?.map(({menu, url, tag}, index) => {
                                        return (
                                            <a href={url} key={index} className="text-sm text-muted">
                                                <div className="accordion-body p-0 ms-5 mb-2">
                                                    <span className="nav-link-text ps-3"
                                                          style={tag === submenuSidebar ? pageCurrent() : {}}>
                                                        {menu}
                                                    </span>
                                                </div>
                                            </a>
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>))}
                {/*ITEMS - FIM*/}
            </div>
        </aside>
    )
}
