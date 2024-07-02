import Layout from "@/Layouts/Layout";
import React from "react";

export default function ({produtos}) {
    return (
        <Layout container titlePage="Produtos" menu="produtos-lista"
                voltar={route('consultor.pedidos.produtos.index')}>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-sm">
                        <th></th>
                        <th>Produtos</th>
                        <th>Estoque</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtos.map((dado, index) => {
                        return (
                            <tr key={index}>
                                <td className="col-2">
                                    {dado.foto && <img className="rounded" src={dado.foto} width="150" alt="foto"/>}
                                </td>
                                <td className="text-wrap">
                                    <b>{dado.nome}</b> <br/>
                                    <small>ID: #{dado.id}</small><br/>
                                    <b>R$ {dado.preco_venda}</b> | {dado.unidade}<br/>
                                    {dado.categoria}
                                </td>
                                <td>
                                    Est. Trânsito: {dado.estoque_consultor} und.<br/>
                                    Est. Loja: {dado.estoque} und.
                                </td>
                                <td className="text-center">
                                    <a className="btn btn-primary btn-sm"
                                       href={route('consultor.produtos.show', dado.id)}
                                    >Ver</a>
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
