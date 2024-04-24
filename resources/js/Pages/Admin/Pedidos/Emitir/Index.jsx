import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import React from "react";

export default function ({ consultores, idUsuarioAtual }) {
    return (
        <Layout titlePage="Emitir Pedidos" menu="pedidos" submenu="pedidos-novo">
            <div className="mb-4 card card-body">
                <div className="col">
                    <a className="btn btn-warning"
                        href={route('admin.leads.consultores-cards.index', { id: idUsuarioAtual })}>Emitir seu Pedido</a>
                </div>
            </div>


            <div className="card card-body">
                <h6>Emitir Pedidos para Consultores(as)</h6>
                <div className="table table-responsive">
                    <table className="table text-sm text-center cursor-pointer table-hover">
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
                            {consultores.map((dado, index) => {
                                return (
                                    <tr key={index}
                                        onClick={() => window.location.href = route('admin.leads.consultores-cards.index', { id: dado.id })}>
                                        <td>#{dado.id}</td>
                                        <td className="text-wrap text-start"><b>{dado.nome}</b></td>
                                        <td>{dado.novo ?? 0}</td>
                                        <td>{dado.atendimento ?? 0}</td>
                                        <td>{dado.ativo ?? 0}</td>
                                        <td>{dado.finalizado ?? 0}</td>
                                        <td>
                                            <a className="px-3 py-1 mb-0 btn btn-primary btn-sm"
                                                href={route('admin.leads.consultores-cards.index', { id: dado.id })}>
                                                Ver
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}
