import { useContext } from 'react';
import {AtualizarDadosContext} from "@/Contexts/AtualizarDadosContext.jsx";

export const useAtualizarDados = () => {

    const context = useContext(AtualizarDadosContext);

    if (!context) {
        throw new Error('useAlert deve ser usado dentro de um AlertProvider');
    }

    return context;
};
