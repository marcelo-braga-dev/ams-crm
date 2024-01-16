import React from "react";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrowRounded';

export default function BtnAvancaStatus({id}) {
    return (
        <a href={route('admin.acompanhamento.show', id)}>
            <DoubleArrowIcon
                className='shadow border-2 p-0 rounded-circle'
                color='success'
                sx={{fontSize: 32}}/>
        </a>
    )
}
