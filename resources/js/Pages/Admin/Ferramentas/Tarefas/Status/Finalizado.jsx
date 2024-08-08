import Layout from "@/Layouts/Layout.jsx";
import {Stack, Typography} from "@mui/material";
import {Check2Circle, Hourglass, People} from "react-bootstrap-icons";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import TarefasDados from "@/Components/Tarefas/TarefasDados.jsx";
import {router} from "@inertiajs/react";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import TarefasParticipantes from "@/Components/Tarefas/TarefasParticipantes.jsx";
import React from "react";

const Page = ({dados, tarefas}) => {
    const avancarStatus = () => {
        router.post(route('admin.ferramentas.tarefas.aberto.update', dados.id), {_method: 'PUT'})
    }

    return (
        <Layout titlePage="Tarefa - Finalizado" menu="ferramentas" submenu="ferramentas-tarefas"
                voltar={route('admin.ferramentas.tarefas.index')}>

            <CardContainer>
                <CardBody>
                    <TarefasDados dados={dados}/>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Participantes" icon={<People size={22}/>}/>
                <CardBody>
                    <TarefasParticipantes dados={dados}/>
                </CardBody>
            </CardContainer>

            <Typography>Tarefas:</Typography>
            <ul className="list-group">
                {tarefas.map((dados, index) => {
                    return (
                        <li key={index} className="list-group-item">
                            <Stack direction="row" spacing={2}>
                                {dados.status === 'novo' ? <Hourglass size={20}/> : <Check2Circle size={22} color="green"/>}
                                <Typography>{dados.texto}</Typography>
                            </Stack>
                        </li>
                    )
                })}
            </ul>
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
