import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';

export const FunilVendasContext = createContext();

export const FunilVendasProvider = ({ children }) => {

    const [filtros, setFiltros] = useState({ usuarios: [], setores: [] });
    const [filtrar, setFiltrar] = useState({ setor: null, usuario: null });
    const [colunas, setColunas] = useState([]);
    const [cards, setCards] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [atualizar, setAtualizar] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(route('auth.leads.funil-vendas-kanban.index-registros'), {
                params: { ...filtrar },
            });
            const data = response.data;
            setCards(data.cards);
            setFiltros({ usuarios: data.usuarios, setores: data.setores });
            setColunas(data.colunas);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        } finally {
            setCarregando(false);
        }
    }, [filtrar]);

    useEffect(() => {
        fetchData();
    }, [filtrar, atualizar]);

    const handleFiltrar = (value) => {
        setFiltrar((prev) => ({ ...prev, ...value }));
    };

    const handleAtualizar = () => {
        setAtualizar(prev => !prev);
    };

    return (
        <FunilVendasContext.Provider
            value={{ filtros, filtrar, colunas, cards, carregando, handleAtualizar, handleFiltrar }}
        >
            {children}
        </FunilVendasContext.Provider>
    );
};

export const useFunilVendas = () => {
    const context = useContext(FunilVendasContext);

    if (!context) {
        throw new Error('useFunilVendas deve ser usado dentro de um FunilVendasProvider');
    }

    return context;
};
