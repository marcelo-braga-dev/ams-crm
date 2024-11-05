import Layout from "@/Layouts/Layout";
import * as React from "react";
import {router} from "@inertiajs/react";
import Avatar from "@mui/material/Avatar";
import {IconButton, Stack} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import Link from "@/Components/Link.jsx";
import {TbTrash} from "react-icons/tb";
import TabelaStatus from "@/Pages/Admin/Leads/Gerenciar/TabelaStatus.jsx";


export default function () {
    return (
        <Layout empty titlePage="Tabelas de Leads" menu="leads" submenu="leads-cards">
            <TabelaStatus/>
        </Layout>
    )
}
