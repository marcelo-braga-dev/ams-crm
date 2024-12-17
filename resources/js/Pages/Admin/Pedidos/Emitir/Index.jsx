import Layout from "@/Layouts/Layout";
import React from "react";
import Avatar from "@mui/material/Avatar";
import {Stack, Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import CardTable from "@/Components/Cards/CardTable";

export default function ({consultores, idUsuarioAtual}) {
    return (
        <Layout titlePage="Emitir PedidosX" menu="pedidos" submenu="pedidos-novo">
            <CardContainer>
                <CardBody>
                    <a className="btn btn-warning" href={route('admin.leads.consultores-cards.index', {id: idUsuarioAtual})}>
                        Emitir seu Pedido
                    </a>
                </CardBody>
            </CardContainer>


            <CardContainer>
                <CardTitle title="Emitir Pedidos para Consultores(as)"/>
                <CardTable>
                    <table className="table-1 cursor-pointer">
                        <tbody>
                        {consultores.map((dado, index) => {
                            return (
                                <tr key={index} onClick={() => window.location.href = route('admin.leads.consultores-cards.index', {id: dado.id})}>
                                    <td className="text-wrap text-start">
                                        <Stack direction="row" spacing={2}>
                                            <Avatar src={dado.nome.foto} sx={{width: 25, height: 25}}/>
                                            <Stack direction="column" spacing={0}>
                                                <Typography variant="h6"><b>{dado.nome.nome}</b></Typography>
                                            </Stack>
                                        </Stack>
                                    </td>
                                    <td>
                                        <button className="px-3 py-1 mb-0 btn btn-primary btn-sm">Abrir</button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </CardTable>
            </CardContainer>
        </Layout>
    )
}
