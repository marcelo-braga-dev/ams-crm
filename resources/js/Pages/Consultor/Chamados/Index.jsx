import React from "react";
// import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";

import {Table, Td, Th} from "@/Components/Kanban/styles";

// CARDS
import NovoCard from "./Cards/Novo/NovoCard";
import FinalizadosCard from "./Cards/Finalizado/FinalizadosCard";
import AndamentoCard from "./Cards/Andamento/AndamentoCard";
// CARDS - fim


export default function Pedidos({chamados}) {

    return (
        <Layout titlePage="SAC" menu="sac-chamados">
            <Table className={"my-2"}>
                <thead>
                <tr className={"text-center text-white"}>
                    <Th color="bg-success">Em Aberto</Th>
                    <Th color="bg-warning">Respondidos</Th>
                    <Th color="bg-dark">Finalizados</Th>
                </tr>
                </thead>
                <tbody>
                <tr className="align-top">
                    <Td color="bg-success">
                        {chamados.novo.map((dados) => {
                            return <NovoCard key={dados.id} dados={dados}/>
                        })}
                    </Td>
                    <Td color="bg-warning">
                        {chamados.respondido.map((dados) => {
                            return <AndamentoCard key={dados.id} dados={dados}/>
                        })}
                    </Td>
                    <Td color="bg-dark">
                        {chamados.finalizado.map((dados) => {
                            return <FinalizadosCard key={dados.id} dados={dados}/>
                        })}
                    </Td>
                </tr>
                </tbody>
            </Table>
        </Layout>
    );
}
