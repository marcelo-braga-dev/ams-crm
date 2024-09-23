import React, { createContext, useEffect, useState } from 'react';

export const ContextFluxoCaixa = createContext();

export const ProviderFluxoCaixa = ({ children }) => {
    const [atualizarRegistros, setAtualizarRegistros] = useState(false);
    const [variaveis, setVariaveis] = useState([]);

    useEffect(async () => {
        const response = await axios.get(route('admin.financeiro.fluxo-caixa.variaveis'));
        setVariaveis(response.data);
    }, []);

    return (<ContextFluxoCaixa.Provider value={{ atualizarRegistros, setAtualizarRegistros, variaveis }}>
            {children}
        </ContextFluxoCaixa.Provider>);
};
