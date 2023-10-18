import Layout from "@/Layouts/Consultor/Layout";
import React from "react";

export default function ({produtos}) {
    return (
        <Layout container titlePage="Produtos"
                voltar={route('consultor.pedidos.produtos.index')}>
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr className="text-sm">
                        <th>Imagem</th>
                        <th>Nome</th>
                        <th>Preço Venda</th>
                        <th>Unidade</th>
                        <th>Categoria</th>
                        <th>Estoque</th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtos.map((dado, index) => {
                        return (
                            <tr key={index}>
                                <td className="col-1">
                                    {dado.foto && <img src={dado.foto} width="80" alt="foto"/>}
                                </td>
                                <td className="text-wrap">
                                    {dado.nome}<br/>
                                    <small>ID: #{dado.id}</small>
                                </td>
                                <td className="text- center">R$ {dado.preco_venda}</td>
                                <td className="col-1">{dado.unidade}</td>
                                <td className="text-wrap col-2">{dado.categoria}</td>
                                <td>
                                    Seu Est.: {dado.estoque_consultor} und.<br/>
                                    Est. Loja: {dado.estoque} und.
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
