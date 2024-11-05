import Layout from "@/Layouts/Layout.jsx";
import React from "react";
import Card from "./Components/Card.jsx";
import Link from "@/Components/Link.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";

const Page = ({registros}) => {
    return (
        <Layout titlePage="Tarefas" menu="ferramentas" submenu="ferramentas-tarefas">
            <CardContainer>
                <CardBody>
                    <Link label="Cadasrar Tarefa" href={route('admin.ferramentas.tarefas.create')}/>
                </CardBody>
            </CardContainer>
            <div className='row justify-content-center'>
                <div className='col-auto'>
                    <table>
                        <thead>
                        <tr className="text-center text-white">
                            <th id="th-1" style={{minWidth: 300}} className="sticky-top">
                                <div style={{backgroundColor: 'green'}} className='row justify-content-between rounded-top p-2 mx-2'>
                                    <div className='col-auto'>Em Aberto</div>
                                </div>
                            </th>
                            <th id="th-1" style={{minWidth: 300}} className="sticky-top">
                                <div style={{backgroundColor: 'orange'}} className='row justify-content-between rounded-top p-2 mx-2'>
                                    <div className='col-auto'>Em Andamento</div>
                                </div>
                            </th>
                            <th id="th-1" style={{minWidth: 300}} className="sticky-top">
                                <div style={{backgroundColor: 'blue'}} className='row justify-content-between rounded-top p-2 mx-2'>
                                    <div className='col-auto'>Aguard. Aprovação</div>
                                </div>
                            </th>
                            <th id="th-1" style={{minWidth: 300}} className="sticky-top">
                                <div style={{backgroundColor: 'black'}} className='row justify-content-between rounded-top p-2 mx-2'>
                                    <div className='col-auto'>Finalizados</div>
                                </div>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="align-top">
                            <td style={{minWidth: 300}}>
                                {registros?.aberto?.map((dados) => <Card key={dados.id} dados={dados}
                                                                         btn={route('admin.ferramentas.tarefas.aberto.show', dados.id)}/>)}                            </td>
                            <td style={{minWidth: 300}}>
                                {registros?.atendimento?.map((dados) => <Card key={dados.id} dados={dados}
                                                                              btn={route('admin.ferramentas.tarefas.atendimento.show', dados.id)}/>)}
                            </td>
                            <td style={{minWidth: 300}}>
                                {registros?.aprovacao?.map((dados) => <Card key={dados.id} dados={dados}
                                                                            btn={route('admin.ferramentas.tarefas.aprovacao.show', dados.id)}/>)}
                            </td>
                            <td style={{minWidth: 300}}>
                                {registros?.finalizado?.map((dados) => <Card key={dados.id} dados={dados}
                                                                             btn={route('admin.ferramentas.tarefas.finalizado.show', dados.id)}/>)}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default Page
