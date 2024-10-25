import Layout from "@/Layouts/Layout";
import * as React from "react";
import {router} from "@inertiajs/react";
import Avatar from "@mui/material/Avatar";
import {Stack} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import Link from "@/Components/Link.jsx";


export default function ({statusLeads}) {

    let totalLeads = 0,
        totalOporunidades = 0,
        totalConexaoProativo = 0,
        totalContatoDireto = 0,
        totalCotacaoEnviado = 0,
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
                                (dado.status.oportunidade ?? 0) +
                                (dado.status.conexao_proativo ?? 0) +
                                (dado.status.contato_direto ?? 0) +
                                (dado.status.cotacao_enviado ?? 0) +
                                (dado.status.ativo ?? 0)

                            totalLeads += total
                            totalOporunidades += dado.status.oportunidade ?? 0
                            totalConexaoProativo += dado.status.conexao_proativo ?? 0
                            totalContatoDireto += dado.status.contato_direto ?? 0
                            totalCotacaoEnviado += dado.status.cotacao_enviado ?? 0
                            totalAtivo += dado.status.ativo ?? 0

                            return (
                                <tr key={index}>
                                    <td className="text-wrap text-start">
                                        <Stack direction="row">
                                            <span className="me-2"><Avatar src={dado.nome.foto} sx={{width: 25, height: 25}}/></span>
                                            <span><b>{dado.nome.nome}</b></span>
                                        </Stack>
                                    </td>
                                    <td>{dado.status.oportunidade ?? 0}</td>
                                    <td>{dado.status.conexao_proativo ?? 0}</td>
                                    <td>{dado.status.contato_direto ?? 0}</td>
                                    <td>{dado.status.cotacao_enviado ?? 0}</td>
                                    <td>{dado.status.ativo ?? 0}</td>
                                    <td className="bg-light">{total}</td>
                                </tr>
                            )
                        })}
                        <tr className="bg-light">
                            <td><b>TOTAL</b></td>
                            <td>{totalOporunidades}</td>
                            <td>{totalConexaoProativo}</td>
                            <td>{totalContatoDireto}</td>
                            <td>{totalCotacaoEnviado}</td>
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
