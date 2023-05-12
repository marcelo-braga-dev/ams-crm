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
                <div className="container-fluid mb-8">
                    {container ?
                        voltar ?
                            <div className="bg-white px-lg-4 pt-2 pb-4 mb-4 rounded">
                                <div className="row justify-content-between border-bottom mb-3 p-2">
                                    <div className="col">
                                        <h5>{titlePage}</h5>
                                    </div>
                                    <div className="col-auto">
                                        <a className="btn btn-link text-dark btn-sm m-0" href={voltar}>
                                            <i className="fas fa-arrow-left me-1"></i> Voltar
                                        </a>
                                    </div>
                                </div>
                                {children}
                            </div> :
                            <div className="bg-white px-lg-4 py-2 pb-4 rounded">
                                <div className="row  border-bottom mb-4 p-1">
                                    <div className="col">
                                        <h5>{titlePage}</h5>
                                    </div>
                                </div>
                                {children}
                            </div>
                        : <div className="row">
                            {children}
                        </div>
                    }
                </div>
            </main>
        </>
    );
}
