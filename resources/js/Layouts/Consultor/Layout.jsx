import {Head} from '@inertiajs/react';

import ModalsAllerts from "@/Components/Modals/AlertsModals";
import Sidebar from "./Templates/Sidebar";
import Navbar from "./Templates/Navbar";
import setUltimoLoginUsuario from "@/Helpers/setUltimoLoginUsuario";

export default function Layout({children, titlePage, container, voltar, menu, submenu}) {
    setUltimoLoginUsuario()
    return (
        <>
            <Head><title>{titlePage}</title></Head>
            <ModalsAllerts/>
            <Sidebar menuSidebar={menu} submenuSidebar={submenu}/>

            <main className="main-content">
                <Navbar titlePage={titlePage}/>
                <div className="container-fluid pt-3">
                    {container ?
                        voltar ?
                            <div className="card">
                                <div className="card-body py-1 pb-6">
                                    <div className="row justify-content-end">
                                        <div className="col-auto">
                                            {
                                                voltar === "back" ?
                                                    <button className="btn btn-link text-dark btn-sm m-0 p-0"
                                                            onClick={() => history.back()}>
                                                        <i className="fas fa-arrow-left me-1"></i> Voltar
                                                    </button> :
                                                    <a className="btn btn-link text-dark btn-sm m-0 p-0"
                                                       href={voltar === "back" ? () => history.back() : voltar}>
                                                        <i className="fas fa-arrow-left me-1"></i> Voltar
                                                    </a>
                                            }
                                        </div>
                                    </div>

                                    {children}
                                </div>
                            </div>
                            :
                            <div className="card">
                                <div className="card-body p-4 py-3">
                                    {children}
                                </div>
                            </div>
                        :
                        <div>
                            {children}
                        </div>
                    }
                </div>
            </main>
        </>
    );
}
