import Layout from "@/Layouts/Layout";
import React from "react";
import CardContainer from "@/Components/Cards/CardContainer";

export default function ({qtdLeads}) {
    let nomes = [], qtd = [];

    function dadosGrafico(nome, total) {
        nomes.push(nome)
        qtd.push(total)
    }

    return (
        <Layout empty titlePage="Histórico dos Leads" menu="leads" submenu="leads-historico">
            <CardContainer>
                <div className="table-responsive">
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th></th>
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
                            const total = (dado.novo ?? 0) + (dado.atendimento ?? 0) + (dado.ativo ?? 0) + (dado.finalizado ?? 0)
                            dadosGrafico(dado.nome, total)
                            return (
                                <tr key={index} className=""
                                    onClick={() => window.location.href = route('admin.leads.consultores-cards.index', {id: dado.id})}>
                                    <td>
                                        <a className="btn btn-primary btn-sm mb-0 px-3 py-1"
                                           href={route('admin.leads.consultores-cards.index', {id: dado.id})}>
                                            Ver
                                        </a>
                                    </td>
                                    <td>#{dado.id}</td>
                                    <td className="text-wrap text-start"><b>{dado.nome}</b></td>
                                    <td>{dado.novo ?? 0}</td>
                                    <td>{dado.atendimento ?? 0}</td>
                                    <td>{dado.ativo ?? 0}</td>
                                    <td>{dado.finalizado ?? 0}</td>
                                    <td>{total}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </CardContainer>
        </Layout>
    )
}
