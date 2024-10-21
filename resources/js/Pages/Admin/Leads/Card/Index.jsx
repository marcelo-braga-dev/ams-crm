import Layout from "@/Layouts/Layout";
import * as React from "react";
import {router} from "@inertiajs/react";
import Avatar from "@mui/material/Avatar";
import {Stack} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import Link from "@/Components/Link.jsx";


export default function ({statusLeads}) {

    let totalLeads = 0,
        totalNovo = 0,
        totalPreAtendimento = 0,
        totalAberto = 0,
        totalAtendimento = 0,
        totalAtivo = 0,
        totalFinalizado = 0

    return (
        <Layout empty titlePage="Tabelas de Leads" menu="leads" submenu="leads-cards">
            <CardContainer>
                <div className="table-responsive">
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>NOME</th>
                            <th>OPORTUNIDADES</th>
                            <th>CONEXÃO PROATIVA</th>
                            <th>CONTATO DIRETO 360º</th>
                            <th>COTAÇÃO ENVIADA</th>
                            <th>ATIVO</th>
                            <th>TOTAL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {statusLeads.map((dado, index) => {
                            const total =
                                (dado.status.novo ?? 0) +
                                (dado.status.fazer ?? 0) +
                                (dado.status.progresso ?? 0) +
                                (dado.status.revisao ?? 0) +
                                (dado.status.concluido ?? 0)

                            totalLeads += total
                            totalNovo += dado.status.novo ?? 0
                            totalPreAtendimento += dado.status.fazer ?? 0
                            totalAberto += dado.status.progresso ?? 0
                            totalAtendimento += dado.status.revisao ?? 0
                            totalAtivo += dado.status.concluido ?? 0

                            return (
                                <tr key={index}>
                                    <td className="text-wrap text-start">
                                        <Stack direction="row">
                                            <span className="me-2"><Avatar src={dado.nome.foto} sx={{width: 25, height: 25}}/></span>
                                            <span><b>{dado.nome.nome}</b></span>
                                        </Stack>
                                    </td>
                                    <td>{dado.status.novo ?? 0}</td>
                                    <td>{dado.status.fazer ?? 0}</td>
                                    <td>{dado.status.progresso ?? 0}</td>
                                    <td>{dado.status.revisao ?? 0}</td>
                                    <td>{dado.status.concluido ?? 0}</td>
                                    <td className="bg-light">{total}</td>
                                </tr>
                            )
                        })}
                        <tr className="bg-light">
                            <td><b>TOTAL</b></td>
                            <td>{totalNovo}</td>
                            <td>{totalPreAtendimento}</td>
                            <td>{totalAberto}</td>
                            <td>{totalAtendimento}</td>
                            <td>{totalAtivo}</td>
                            <td>{totalLeads}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </CardContainer>
        </Layout>
    )
}
