import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import React from "react";

export default function ({qtdLeads}) {
    return (
        <Layout menu="pedidos" submenu="pedidos-novo">
            <h6>Consultores (as)</h6>
            <div className="table table-responsive">
                <table className="table text-center text-sm table-hover cursor-pointer">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Novo</th>
                        <th>Atendimento</th>
                        <th>Ativo</th>
                        <th>Finalizado</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    {qtdLeads.map((dado, index) => {
                        return (
                            <tr key={index}
                                onClick={() => window.location.href = route('admin.leads.consultores-cards.index', {id: dado.id})}>
                                <td>#{dado.id}</td>
                                <td className="text-wrap text-start"><b>{dado.nome}</b></td>
                                <td>{dado.novo ?? 0}</td>
                                <td>{dado.atendimento ?? 0}</td>
                                <td>{dado.ativo ?? 0}</td>
                                <td>{dado.finalizado ?? 0}</td>
                                <td>
                                    <a className="btn btn-primary btn-sm mb-0 px-3 py-1"
                                       href={route('admin.leads.consultores-cards.index', {id: dado.id})}>
                                        Ver
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
