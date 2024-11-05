import Layout from "@/Layouts/Layout.jsx";
import {Stack} from "@mui/material";
import {List, ListCheck, PencilSquare, People, Trash} from "react-bootstrap-icons";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import TarefasDados from "@/Components/Tarefas/TarefasDados.jsx";
import {router} from "@inertiajs/react";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import React from "react";
import TarefasParticipantes from "@/Components/Tarefas/TarefasParticipantes.jsx";
import Link from "@/Components/Link.jsx";
import TarefasItems from "@/Components/Tarefas/TarefasItems.jsx";

const Page = ({dados, tarefas}) => {
    const avancarStatus = () => {
        router.post(route('admin.ferramentas.tarefas.aberto.update', dados.id), {_method: 'PUT'})
    }

    const excluirTarefa = () => {
        router.post(route('admin.ferramentas.tarefas.destroy', dados.id), {_method: 'DELETE'})
    }

    return (
        <Layout titlePage="Tarefa - Aberto" menu="ferramentas" submenu="ferramentas-tarefas"
                voltar={route('admin.ferramentas.tarefas.index')}>

            <CardContainer>
                <CardTitle title="Informações" icon={<List size={22}/>}/>
                <CardBody>
                    <TarefasDados dados={dados}/>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <div className="row justify-content-between">
                        <div className="col">
                            <button className="btn btn-success mb-0"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal">Iniciar Atendimento
                            </button>
                        </div>
                        <div className="col-auto">
                            <Stack direction="row" spacing={3}>
                                <Link href={route('admin.ferramentas.tarefas.edit', dados.id)} icon={<PencilSquare size={22} color="green"/>}/>
                                <Trash size={22} color="red" cursor="pointer" data-bs-toggle="modal" data-bs-target="#excluirModal"/>
                            </Stack>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Participantes" icon={<People size={22}/>}/>
                <CardBody>
                    <TarefasParticipantes dados={dados}/>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Tarefas" icon={<ListCheck size={22}/>}/>
                <CardBody>
                    <TarefasItems dados={tarefas}/>
                </CardBody>
            </CardContainer>

            {/*Excluir*/}
            <div className="modal fade mt-6" id="excluirModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Tarefa</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja realmente excluir esta tarefa?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={excluirTarefa}>Sim</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Avancar Status*/}
            <div className="modal fade mt-6" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Iniciar Atendimento</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Iniciar Atendimento da Tarefa?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={avancarStatus}>Sim</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Page
