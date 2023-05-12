import React from "react";
import Layout from '@/Layouts/Supervisor/Layout';
import {Table, Td, Th} from "@/Components/Kanban/styles";

// CARDS
import NovoCard from "./Cards/Novo/NovoCard";
import FinalizadosCard from "./Cards/Finalizado/FinalizadosCard";
import AndamentoCard from "./Cards/Andamento/AndamentoCard";
// CARDS - fim

export default function ({dados}) {

    return (
        <Layout titlePage="SAC" menu="sac" submenu="chamados">
            <div className="container">
                <table className={"my-2"}>
                    <thead>
                    <tr className={"text-center text-white"}>
                        <Th color="bg-success">Em Aberto</Th>
                        <Th color="bg-warning">Em Andamento</Th>
                        <Th color="bg-dark">Finalizados</Th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="align-top">
                        <Td color="bg-green-400">
                            {dados.novo.map((dados) => {
                                return <NovoCard key={dados.id} dados={dados}/>
                            })}
                        </Td>
                        <Td color="bg-orange-400">
                            {dados.respondido.map((dados) => {
                                return <AndamentoCard key={dados.id} dados={dados}/>
                            })}
                        </Td>
                        <Td color="bg-black">
                            {dados.finalizado.map((dados) => {
                                return <FinalizadosCard key={dados.id} dados={dados}/>
                            })}
                        </Td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </Layout>
    );
}
