import DoubleArrowIcon from '@mui/icons-material/DoubleArrowRounded';
import React from "react";

export default function BtnAvancaStatus({dados}) {
    return (
        <a href={route('supervisor.pedidos.acompanhamento.show', dados.id)}>
            <DoubleArrowIcon
                className='shadow border-2 p-0 rounded-circle'
                color='success'
                sx={{fontSize: 32}}/>
        </a>
    )
}
