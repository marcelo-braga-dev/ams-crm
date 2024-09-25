import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import LeadCard from './LeadCard';

const KanbanColumn = ({ columnId, column }) => {
    // Usando o hook useDroppable para permitir que leads sejam soltos na célula da coluna
    const { setNodeRef } = useDroppable({
        id: columnId,
    });

    return (
        <div ref={setNodeRef} className="kanban-column">
            {column.leads.map((lead, index) => (
                <LeadCard key={lead.id} lead={lead} index={index} />
            ))}
        </div>
    );
};

export default KanbanColumn;
