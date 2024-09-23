import React, { createContext, useEffect, useState } from 'react';

export const ContextFluxoCaixa = createContext();

export const ProviderFluxoCaixa = ({ children }) => {
    const [atualizarRegistros, setAtualizarRegistros] = useState(false);
    const [variaveis, setVariaveis] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(route('admin.financeiro.fluxo-caixa.variaveis'));
                setVariaveis(response.data);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
            }
        }

        fetchData();
    }, []);

    return (<ContextFluxoCaixa.Provider value={{ atualizarRegistros, setAtualizarRegistros, variaveis }}>
            {children}
        </ContextFluxoCaixa.Provider>);
};
