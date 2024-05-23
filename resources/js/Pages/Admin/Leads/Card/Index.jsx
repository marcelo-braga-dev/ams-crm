import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import { ListItemButton, TextField } from "@mui/material";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import { router } from "@inertiajs/react";


export default function ({ setores, setor, statusLeads }) {
    function alterarSetor(e) {
        router.get(route('admin.leads.cards-leads.index', { setor: e }))
    }

    let totalLeads = 0
    let totalNovo = 0
    let totalPreAtendimento = 0
    let totalAberto = 0
    let totalAtendimento = 0
    let totalAtivo = 0
    let totalFinalizado = 0

    return (
        <Layout titlePage="Cards do Usuário" menu="leads" submenu="leads-cards">
            <div className="mt-4 card">
                <div className="card-body">
                    <div className="table table-responsive">
                        <table className="table text-sm text-center cursor-pointer table-hover">
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
                                    <tr key={index} className=""
                                        onClick={() => router.get(route('admin.leads.consultores-cards.index', {id: dado.id})) }>
                                        <td className="text-wrap text-start"><b>{dado.nome}</b></td>
                                        <td>{dado.status.novo ?? 0}</td>
                                        <td>{dado.status.pre_atendimento ?? 0}</td>
                                        <td>{dado.status.aberto ?? 0}</td>
                                        <td>{dado.status.atendimento ?? 0}</td>
                                        <td>{dado.status.ativo ?? 0}</td>
                                        <td>{dado.status.finalizado ?? 0}</td>
                                        <td>{total}</td>
                                        <td>
                                            <a className="px-3 py-1 mb-0 btn btn-primary btn-sm"
                                                href='#'>
                                                Ver Kanban
                                            </a>
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
                </div>
            </div>
        </Layout>
    )
}
