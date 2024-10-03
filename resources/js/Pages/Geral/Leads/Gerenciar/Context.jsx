import React, { createContext, useContext, useEffect, useState } from 'react';

const GerenciarContext = createContext();

export const GerenciarProvider = ({ children }) => {

    const [leads, setLeads] = useState([]);
    const [paginate, setPaginate] = useState(1);

    const filtros = { setores: [], datasImportacao: [] };
    const filtrar = {};

    const fetchLeads = async () => {
        console.log('INIT')
        const response = await axios.get(route('auth.leads.gerenciar.get-gerenciar'), {
            // paginate,
        });
        setLeads(response.data.leads.dados ?? []);
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    return (
        <GerenciarContext.Provider value={{ leads, filtros, filtrar }}>
            {children}
        </GerenciarContext.Provider>
    );
};

export const useGerenciarLeads = () => {
    const context = useContext(GerenciarContext);

    if (!context) {
        throw new Error('useGerenciarLeads deve ser usado dentro de um GerenciarProvider');
    }

    return context;
};
