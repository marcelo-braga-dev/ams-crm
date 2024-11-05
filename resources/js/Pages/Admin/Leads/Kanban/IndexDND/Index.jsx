import React, { useEffect, useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import ModalConfirm from './ModalConfirm';
import Layout from '@/Layouts/Layout.jsx';
import { handleDragEnd, confirmMove, cancelMove } from './Handlers.jsx';
import { Typography } from '@mui/material';

const KanbanBoard = () => {
    const [leadsColunas, setLeadsColunas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [leadToMove, setLeadToMove] = useState(null);
    const [sourceColumnIndex, setSourceColumnIndex] = useState(null);
    const [destinationColumnIndex, setDestinationColumnIndex] = useState(null);
    const [carregando, setCarregando] = useState(false);

    const fetchLeads = async () => {
        const response = await axios.get(route('auth.lead.get-leads-kanban'))
            .finally(() => setCarregando(false));

        setLeadsColunas(response.data.dados);
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <Layout>
            <div className="kanban-board">
                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={(event) =>
                        handleDragEnd({
                            event,
                            leadsColunas,
                            setLeadToMove,
                            setSourceColumnIndex,
                            setDestinationColumnIndex,
                            setIsModalOpen,
                        })
                    }
                >
                    <table>
                        <thead>
                        <tr>
                            {leadsColunas.map((column, index) => (
                                // <th key={index}>{column.nome}</th>
                                <th
                                    style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                                    <div className="row mx-1 justify-content-between"
                                         style={{
                                             backgroundColor: column.cor ?? 'black',
                                             width: 350,
                                             paddingBlock: 10,
                                             paddingInline: 15,
                                             borderTopLeftRadius: 15,
                                             borderTopRightRadius: 15,
                                         }}
                                    >
                                        <div className="col-auto">
                                            <Typography fontWeight="bold" color="white">{column.nome}</Typography>
                                        </div>
                                        <div className="col-auto">
                                            {/*<Typography fontWeight="bold" color="white">Qdt: {item?.items?.length ?? 0}</Typography>*/}
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            {leadsColunas.map((column, index) => (
                                <td key={index}>
                                    <KanbanColumn column={column} columnId={column.nome} />
                                </td>
                            ))}
                        </tr>
                        </tbody>
                    </table>
                </DndContext>

                <ModalConfirm
                    isOpen={isModalOpen}
                    onRequestClose={() => cancelMove({ setIsModalOpen })}
                    onConfirm={() =>
                        confirmMove({
                            leadsColunas,
                            leadToMove,
                            sourceColumnIndex,
                            destinationColumnIndex,
                            setLeadsColunas,
                            setIsModalOpen,
                        })
                    }
                />
            </div>
        </Layout>
    );
};

export default KanbanBoard;
