import React, { useMemo, useState } from 'react';
import { useFunilVendas } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import CardFunilVendas from '../Cards/Card.jsx';
import { Button } from '@mui/material';

const Cards = () => {
    const { colunas, cards, pesquisar } = useFunilVendas();

    // Estado para armazenar a quantidade de cartões por coluna (por status)
    const [qutCardsByStatus, setQutCardsByStatus] = useState(() => {
        const initialCounts = {};
        Object.keys(colunas).forEach((status) => {
            initialCounts[status] = 5; // Contagem inicial definida para 5
        });
        return initialCounts;
    });

    // Função para verificar se qualquer valor do objeto card contém o valor do filtro
    const cardMatchesFilter = (card, filterValue) => {

        const dadosCards2 = [
            `#${card.id}`,
            card.nome,
            card.cnpj,
            card.razao_social,
            card?.cidade_estado?.cidade,
            card?.cidade_estado?.estado,
            ...card?.telefones.map(telefone => telefone?.telefone),
        ];

        if (!filterValue) return true; // Se o filtro for nulo, exibe todos os cards
        const lowerCaseFilter = filterValue.toLowerCase();

        // Itera por todas as chaves do objeto card para verificar se algum valor contém o filtro
        return Object.values(dadosCards2).some(value =>
            String(value).toLowerCase().includes(lowerCaseFilter),
        );
    };

    // Função para atualizar a quantidade de cartões em uma coluna específica
    const handleVerMais = (status) => {
        setQutCardsByStatus((prev) => ({
            ...prev,
            [status]: prev[status] + 10, // Incrementa a quantidade de cartões para o status específico
        }));
    };

    return useMemo(() => (
        Object.values(colunas).map(({ status, cor, url_avancar_status, prazo_dias }) => {
            const statusGroup = cards[status] || [];

            // Filtra os cards com base no valor de `pesquisar`
            const filteredStatusGroup = statusGroup.filter(card => cardMatchesFilter(card, pesquisar));

            return (
                <td key={status} style={{ padding: 10 }}>
                    {/* Renderiza os cartões filtrados ou todos se `pesquisar` for nulo */}
                    {filteredStatusGroup?.slice(0, qutCardsByStatus[status]).map((item) => (
                        <CardFunilVendas
                            key={item.id}
                            card={item}
                            cor={cor}
                            prazoDias={prazo_dias}
                            urlAvancarStatus={url_avancar_status}
                            emitePedidos={filteredStatusGroup?.status_dados?.emite_pedidos}
                        />
                    ))}

                    {/* Exibe o botão apenas se houver mais cartões para carregar e não estiver filtrando */}
                    {!pesquisar && filteredStatusGroup.length > qutCardsByStatus[status] && (
                        <Button
                            sx={{ width: '100%', marginBottom: 10 }}
                            onClick={() => handleVerMais(status)}>
                            Ver Mais
                        </Button>
                    )}
                </td>
            );
        })
    ), [colunas, cards, pesquisar, qutCardsByStatus]);
};

export default Cards;
