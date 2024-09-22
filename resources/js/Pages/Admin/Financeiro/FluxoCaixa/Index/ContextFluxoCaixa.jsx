import React, { createContext, useState } from 'react';

export const ContextFluxoCaixa = createContext();

export const ProviderFluxoCaixa = ({ children }) => {
    const [atualizarRegistros, setAtualizarRegistros] = useState(false);

    return (
        <ContextFluxoCaixa.Provider value={{ atualizarRegistros, setAtualizarRegistros }}>
            {children}
        </ContextFluxoCaixa.Provider>
    );
};
