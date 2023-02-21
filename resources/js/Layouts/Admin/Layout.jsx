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
                            <div className="bg-white px-lg-4 pt-2 mb-4 rounded">
                                <div className="row justify-content-between border-bottom mb-3 p-2">
                                    <div className="col">
                                        <h5>{titlePage}</h5>
                                    </div>
                                    <div className="col-auto">
                                        <a className="btn btn-link btn-sm m-0" href={voltar}>
                                            <i className="fas fa-arrow-left me-1"></i> Voltar
                                        </a>
                                    </div>
                                </div>
                                {errors[0] && <div className="alert alert-danger text-white">{errors[0]}</div>}
                                {children}
                            </div> :
                            <div className="bg-white px-lg-4 pt-2 rounded">
                                <div className="row  border-bottom mb-4 p-1">
                                    <div className="col">
                                        <h5>{titlePage}</h5>
                                    </div>
                                </div>
                                {errors[0] && <div className="alert alert-danger text-white">{errors[0]}</div>}
                                {children}
                            </div>
                        : <div className="row">
                            <div className="row border-bot tom mb-3">
                                <h5 className="">{titlePage}</h5>
                            </div>
                            {children}
                        </div>
                    }
                </div>
            </main>
        </>
    );
}
