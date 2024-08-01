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
                            <th>Nome</th>
                            <th>Iniciar Atendimento</th>
                            <th>Pré Atendimento</th>
                            <th>Em Aberto</th>
                            <th>Atendimento</th>
                            <th>Ativo</th>
                            <th>Finalizado</th>
                            <th>Total</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {statusLeads.map((dado, index) => {
                            const total = (dado.status.novo ?? 0) + (dado.status.pre_atendimento ?? 0) + (dado.status.aberto ?? 0) + (dado.status.atendimento ?? 0) + (dado.status.ativo ?? 0) + (dado.status.finalizado ?? 0)
                            totalLeads += total
                            totalNovo += dado.status.novo ?? 0
                            totalPreAtendimento += dado.status.pre_atendimento ?? 0
                            totalAberto += dado.status.aberto ?? 0
                            totalAtendimento += dado.status.atendimento ?? 0
                            totalAtivo += dado.status.ativo ?? 0
                            totalFinalizado += dado.status.finalizado ?? 0

                            return (
                                <tr key={index}>
                                    <td className="text-wrap text-start">
                                        <Stack direction="row">
                                            <span className="me-2"><Avatar src={dado.nome.foto} sx={{width: 25, height: 25}}/></span>
                                            <span><b>{dado.nome.nome}</b></span>
                                        </Stack>
                                    </td>
                                    <td>{dado.status.novo ?? 0}</td>
                                    <td>{dado.status.pre_atendimento ?? 0}</td>
                                    <td>{dado.status.aberto ?? 0}</td>
                                    <td>{dado.status.atendimento ?? 0}</td>
                                    <td>{dado.status.ativo ?? 0}</td>
                                    <td>{dado.status.finalizado ?? 0}</td>
                                    <td>{total}</td>
                                    <td>
                                        <Link label="Ver Kanban" href={route('admin.leads.consultores-cards.index', {id: dado.id})}/>
                                    </td>
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
                            <td>{totalFinalizado}</td>
                            <td>{totalLeads}</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </CardContainer>
        </Layout>
    )
}
