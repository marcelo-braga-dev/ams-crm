import React, { createContext, useEffect, useState } from 'react';

export const LeadContext = createContext();

export const LeadProvider = ({ leadId, children }) => {
    const [atualizarDados, setAtualizarDados] = useState(false);
    const [lead, setLead] = useState([]);
    const [filtros, setFiltros] = useState({ usuarios: [] });
    const [permissoes, setPermissoes] = useState({ encaminhar: false, limpar: false, editar: false, excluir: false, inativar: false });

    const [historicos, setHistoricos] = useState({ status: [], pedidos: [], atendimento: [] });

    const fetchLeadDados = async () => {
        const response = await axios.get(route('auth.lead.get-lead', leadId));

        setLead(response.data.lead);
        setFiltros({ usuarios: response.data.usuarios });
        setPermissoes(response.data.permissoes);
        setHistoricos(response.data.historicos);
    };

    useEffect(() => {
        fetchLeadDados();
    }, [atualizarDados]);

    return (
        <LeadContext.Provider value={{ lead, filtros, permissoes, historicos, atualizarDados, setAtualizarDados }}>
            {children}
        </LeadContext.Provider>
    );
};
