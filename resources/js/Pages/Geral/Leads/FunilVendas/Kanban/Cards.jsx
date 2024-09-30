import React, { useMemo } from 'react';
import { useFunilVendas } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import CardFunilVendas from '../Cards/Card.jsx';

const Cards = () => {
    const { colunas, cards } = useFunilVendas();

    return useMemo(() => (
        Object.values(colunas).map(({ status, cor, url_avancar_status, prazo_dias }) => {
            const statusGroup = cards[status];

            return (
                <td key={status} style={{ padding: 10 }}>

                    {statusGroup?.map((item, index) => (
                        index < 20 ? <CardFunilVendas
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
