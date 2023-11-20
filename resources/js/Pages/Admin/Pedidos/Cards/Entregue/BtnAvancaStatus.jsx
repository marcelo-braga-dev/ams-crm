import React from "react";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrowRounded';

export default function BtnAvancaStatus({dados}) {
    return (
        <a href={route('admin.acompanhamento.show', dados.id)}>
            <DoubleArrowIcon
                className='shadow border-2 p-0 rounded-circle'
                color='success'
                sx={{fontSize: 32}}/>
        </a>
    )
}
