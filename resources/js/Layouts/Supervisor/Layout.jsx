import {Head} from '@inertiajs/react';

import ModalsAllerts from "@/Components/Modals/AlertsModals";
import Sidebar from "./Templates/Sidebar";
import Navbar from "./Templates/Navbar";
export default function Layout({children, titlePage, container, voltar, errors = []}) {

    return (
        <>
            <Head><title>{titlePage}</title></Head>
            <ModalsAllerts/>
            <Sidebar/>

            <main className="main-content position-relative border-radius-lg ">
                <Navbar titlePage={titlePage}/>
                <div className="container-fluid py-4 mt-3">
                    {container ?
                        voltar ?
                            <div className="bg-white px-lg-4 pt-2 pb-4 mb-4 rounded">
                                <div className="row justify-content-end">
                                    <div className="col-auto">
                                        <a className="btn btn-link btn-sm"
                                           href={voltar}>
                                            <i className="fas fa-arrow-left me-1"></i>
                                            Voltar
                                        </a>
                                    </div>
                                </div>
                                {errors[0] && <div className="alert alert-danger text-white">{errors[0]}</div>}
                                {children}
                            </div> :
                            <>
                                <div className="bg-white px-lg-4 py-lg-5 mb-4 rounded">
                                    {errors[0] && <div className="alert alert-danger text-white">{errors[0]}</div>}
                                    {children}
                                </div>
                            </>
                        :
                        children}
                </div>
            </main>
        </>
    );
}
