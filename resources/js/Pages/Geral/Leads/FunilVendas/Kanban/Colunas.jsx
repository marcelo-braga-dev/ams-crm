import React, { useMemo } from 'react';
import { Typography } from '@mui/material';
import { useFunilVendas } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';

const Colunas = () => {

    const { colunas } = useFunilVendas();

    return useMemo(() => (
        Object.values(colunas).map((item) => (
            <th key={item.status}
                style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <div className="mx-1 row justify-content-between"
                     style={{
                         backgroundColor: item.cor ?? 'black',
                         width: 370,
                         paddingBlock: 10,
                         paddingInline: 15,
                         borderTopLeftRadius: 15,
                         borderTopRightRadius: 15,
                     }}
                >
                    <div className="col-auto">
                        <Typography fontWeight="bold" color="white">{item.nome}</Typography>
                    </div>
                    <div className="col-auto">
                        <Typography fontWeight="bold" color="white">Qdt: {item?.items?.length ?? 0}</Typography>
                    </div>
                </div>
            </th>
        ))
    ), [colunas])

}
export default Colunas
