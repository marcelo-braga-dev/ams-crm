// Função que lida com o término do drag-and-drop
export const handleDragEnd = ({
                                  event,
                                  leadsColunas,
                                  setLeadToMove,
                                  setSourceColumnIndex,
                                  setDestinationColumnIndex,
                                  setIsModalOpen,
                              }) => {
    const { active, over } = event;
    if (!over) return;

    const sourceIndex = leadsColunas.findIndex((column) =>
        column.leads.some((lead) => lead.id === active.id)
    );
    const destinationIndex = leadsColunas.findIndex((column) => column.nome === over.id);

    // Permitir mover apenas para a próxima coluna
    if (destinationIndex === sourceIndex + 1) {
        setLeadToMove({
            id: active.id,
            lead: leadsColunas[sourceIndex].leads.find((lead) => lead.id === active.id),
        });
        setSourceColumnIndex(sourceIndex);
        setDestinationColumnIndex(destinationIndex);
        setIsModalOpen(true); // Abrir o modal de confirmação
    } else {
        alert('Você só pode mover o lead para a próxima coluna da direita.');
    }
};

// Função que confirma a movimentação do lead
export const confirmMove = ({
                                leadsColunas,
                                leadToMove,
                                sourceColumnIndex,
                                destinationColumnIndex,
                                setLeadsColunas,
                                setIsModalOpen,
                            }) => {
    const updatedColumns = [...leadsColunas];

    // Remover o lead da coluna de origem
    updatedColumns[sourceColumnIndex].leads = updatedColumns[sourceColumnIndex].leads.filter(
        (lead) => lead.id !== leadToMove.id
    );

    // Adicionar o lead na coluna de destino
    updatedColumns[destinationColumnIndex].leads = [
        ...updatedColumns[destinationColumnIndex].leads,
        leadToMove.lead,
    ];

    // Atualizar as colunas e fechar o modal
    setLeadsColunas(updatedColumns);
    setIsModalOpen(false);
};

// Função que cancela a movimentação
export const cancelMove = ({ setIsModalOpen }) => {
    setIsModalOpen(false);
};
