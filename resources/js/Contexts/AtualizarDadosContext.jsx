import React, {createContext, useState} from 'react';

export const AtualizarDadosContext = createContext();

export const AtualizarDadosProvider = ({children}) => {
    const [atualizarDados, setAtualizarDados] = useState(false)

    const handle = () => {
        setAtualizarDados(e => !e)
    }

    return (
        <AtualizarDadosContext.Provider value={{handle, atualizarDados}}>
            {children}
        </AtualizarDadosContext.Provider>
    );
};
