import React, { createContext, useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

export const LeadContext = createContext();

export const LeadProvider = ({ children }) => {

    const [atualizarDados, setAtualizarDados] = useState(false);
    const [lead, setLead] = useState([]);
    const [filtros, setFiltros] = useState({ usuarios: [] });
    const [permissoes, setPermissoes] = useState({ encaminhar: false, limpar: false, editar: false, excluir: false, inativar: false });

    const [historicos, setHistoricos] = useState({ status: [], pedidos: [], atendimento: [] });

    // Fetch lead data based on leadId
    const fetchLead = async (leadId) => {
        try {
            const response = await axios.get(route('auth.lead.get-lead', leadId));

            setLead(response.data.lead);
            setFiltros({ usuarios: response.data.usuarios });
            setPermissoes(response.data.permissoes);
            setHistoricos(response.data.historicos);
        } catch (error) {
            console.error('Error fetching lead data:', error);
        }
    };

    const handleAtualizar = () => {
        setAtualizarDados(e => !e);
    };

    return (
        <LeadContext.Provider value={{ lead, fetchLead, filtros, permissoes, historicos, atualizarDados, setAtualizarDados, handleAtualizar }}>
            {children}
        </LeadContext.Provider>
    );
};
