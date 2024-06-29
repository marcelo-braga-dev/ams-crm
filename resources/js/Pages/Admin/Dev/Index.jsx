import React from "react";
import Layout from '@/Layouts/Layout';
import {Td, Th} from "@/Components/Kanban/styles";

// CARDS
import NovoCard from "./Cards/NovoCard";
import AndamentoCard from "./Cards/AndamentoCard";
import AprovandoCard from "./Cards/AprovandoCard";
import FinalizadosCard from "./Cards/FinalizadosCard";
// CARDS - fim

export default function Pedidos({dados}) {

    return (
        <Layout titlePage="Desenvolvimento" menu="dev" submenu="dev-registros">
            <table>
                <thead>
                <tr className="text-center text-white">
                    <th className="bg-success mx-2 p-2 rounded"  style={{minWidth: 300}}>Em Aberto</th>
                    <th className="bg-warning mx-2 p-2 rounded" style={{minWidth: 300}}>Em Andamento</th>
                    <th className="bg-info mx-2 py-2 rounded" style={{minWidth: 300}}>Aguard. Aprovação</th>
                    <th className="bg-dark mx-2 py-2 rounded" style={{minWidth: 300}}>Finalizados</th>
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
        </Layout>
    );
}
