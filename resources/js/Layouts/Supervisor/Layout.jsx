import {Head} from '@inertiajs/inertia-react';

import ModalsAllerts from "@/Components/Modals/AlertsModals";
import Sidebar from "./Templates/Sidebar";
import Navbar from "./Templates/Navbar";
export default function Layout({children, titlePage}) {

    return (
        <>
            <Head><title>{titlePage}</title></Head>
            <ModalsAllerts/>
            <Sidebar/>

            <main className="main-content position-relative border-radius-lg ">
                <Navbar titlePage={titlePage}/>
                <div className="container-fluid py-4 mt-3">
                    {children}
                </div>
            </main>
        </>
    );
}
