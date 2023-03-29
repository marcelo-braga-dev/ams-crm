import React from "react";
import Layout from '@/Layouts/Admin/Layout';
import {Td, Th} from "@/Components/Kanban/styles";

// CARDS
import NovoCard from "./Cards/NovoCard";
import AndamentoCard from "./Cards/AndamentoCard";
import AprovandoCard from "./Cards/AprovandoCard";
import FinalizadosCard from "./Cards/FinalizadosCard";
// CARDS - fim

import DoubleScrollbar from 'react-double-scrollbar/dist/DoubleScrollbar';

export default function Pedidos({dados}) {

    return (
        <Layout titlePage="Desenvolvimento"
                menu="dev" submenu="registros">
            <div className="container">
                <DoubleScrollbar>
                    <table className="my-2">
                        <thead>
                        <tr className="text-center text-white">
                            <Th color="bg-success">Em Aberto</Th>
                            <Th color="bg-warning">Em Andamento</Th>
                            <Th color="bg-info">Aguard. Aprovação</Th>
                            <Th color="bg-dark">Finalizados</Th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="align-top">
                            <Td color="bg-green-400">
                                {dados.novo.map((dados) => {
                                    return <NovoCard key={dados.id} dados={dados} />
                                })}
                            </Td>
                            <Td color="bg-orange-400">
                                {dados.andamento.map((dados) => {
                                    return <AndamentoCard key={dados.id} dados={dados} />
                                })}
                            </Td>
                            <Td color="bg-black">
                                {dados.aprovando.map((dados) => {
                                    return <AprovandoCard key={dados.id} dados={dados} />
                                })}
                            </Td>
                            <Td color="bg-black">
                                {dados.finalizado.map((dados) => {
                                    return <FinalizadosCard key={dados.id} dados={dados} />
                                })}
                            </Td>
                        </tr>
                        </tbody>
                    </table>
                </DoubleScrollbar>
            </div>

        </Layout>
    );
}
