// https://egghead.io/lessons/react-move-items-between-columns-with-react-beautiful-dnd-using-ondragend
//https://www.freecodecamp.org/portuguese/news/como-adicionar-a-funcionalidade-de-arrastar-e-soltar-em-react-com-a-biblioteca-react-beautiful-dnd/
import IntegradorLayout from '@/Layouts/Consultor/Layout';

//import {Table} from './Styles';
import React, {useState} from 'react';
import {Container, NavLink, Row} from 'reactstrap';
import NovoCard from './Cards/NovoCard';
import Atendendo from './Cards/Atendendo';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Typography} from "@mui/material";

export default function Dashboard({auth, errors, naoAtendidos, emAndamento, offset}) {

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(naoAtendidoList);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateNaoAtendidoList(items);
    }

    const [naoAtendidoList, updateNaoAtendidoList] = useState(naoAtendidos);

    return (
        <IntegradorLayout
            auth={auth}
            errors={errors}
            titlePage="Clientes"
            button={true}
            url={route('consultor.clientes.create')} textButton={'Cadastrar Cliente'}>

            <Container fluid>
                <div className="overflow-x-auto pb-6">
                    <table>
                        <thead>
                        <tr className={"text-center text-white"}>
                            <th className="p-3 bg-yellow-500">Não Atendidos</th>
                            <th className="bg-blue-700">Em Atendimentos</th>
                            <th className="bg-green-700">Finalizado</th>
                            <th className="bg-gray-500">Cancelado</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="align-top">
                            <td className="bg-yellow-300" style={{minWidth: 280}}>
                                <DragDropContext onDragEnd={handleOnDragEnd}>
                                    <Droppable droppableId="characters">
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps}>
                                                {naoAtendidoList.map(({id, empresa, data, obs, telefone, email}, index) => {
                                                    return (
                                                        <Draggable key={id} draggableId={id} index={index}>
                                                            {(provided) => (
                                                                <div
                                                                    ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                                    <NovoCard
                                                                        nome={empresa} data={data} obs={obs}
                                                                        id={id} telefone={telefone}
                                                                        email={email}></NovoCard>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    );
                                                })}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </td>
                            <td className="bg-blue-400" style={{minWidth: 280}}>
                                {
                                    emAndamento.map((data, index) => (
                                        <Atendendo nome={data.empresa} data={data.status_data}
                                                   obs={data.status_anotacoes}
                                                   id={data.id}></Atendendo>
                                    ))
                                }
                            </td>
                            <td className="bg-green-400" style={{minWidth: 280}}>
                            </td>
                            <td className="bg-gray-300" style={{minWidth: 280}}>

                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} className={"p-2"}>

                            </td>
                        </tr>
                        <tr>
                            <td colSpan={4} className={"text-center"}>
                                <Row className={"bg-blue-400 rounded m-2 p-2"}>
                                    <Typography component={"a"} href={route("consultor.clientes.index", {"page": offset})}>
                                        <ExpandMoreIcon className={"text-white font-medium"}></ExpandMoreIcon>
                                    </Typography>
                                </Row>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </Container>
        </IntegradorLayout>
    );
}



