import Layout from "@/Layouts/Layout";
import * as React from "react";
import TabelaStatus from "@/Pages/Admin/Leads/Gerenciar/TabelaStatus.jsx";


export default function () {
    return (
        <Layout empty titlePage="Gerenciar Leads" menu="leads" submenu="leads-cards">
            <TabelaStatus/>
        </Layout>
    )
}
