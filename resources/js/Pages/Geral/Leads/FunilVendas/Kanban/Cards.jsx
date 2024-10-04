import React, { useMemo, useState } from 'react';
import { useFunilVendas } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import CardFunilVendas from '../Cards/Card.jsx';
import { Button } from '@mui/material';

const Cards = () => {
    const { colunas, cards } = useFunilVendas();

    return useMemo(() => (

        Object.values(colunas).map(({ status, cor, url_avancar_status, prazo_dias }) => {

            const statusGroup = cards[status];
            const qtd = status === 'novo' ? 10 : 100;

            return (
                <td key={status} style={{ padding: 10 }}>

                    {statusGroup?.map((item, index) => (
                        index < qtd ? <CardFunilVendas
                            key={item.id}
                            card={item}
                            cor={cor}
                            prazoDias={prazo_dias}
                            urlAvancarStatus={url_avancar_status}
                            emitePedidos={statusGroup?.status_dados?.emite_pedidos}
                        /> : ''
                    ))}
                </td>
            );
        })
    ), [colunas, cards]);
};
export default Cards;
