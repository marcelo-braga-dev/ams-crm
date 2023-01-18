import DoubleArrowIcon from '@mui/icons-material/DoubleArrowRounded';
import React from "react";
import DownloadIcon from "@mui/icons-material/DownloadRounded";

export default function BtnAvancaStatus({dados}) {
    return (
        <a href={route('admin.aguardando-faturamento.show', dados.id)}>
            {dados.infos.situacao === 'novo' &&
                <button className="btn btn-danger btn-sm p-1">
                    <DownloadIcon></DownloadIcon>
                </button>
            }
            {dados.infos.situacao === 'visualizado' &&
                <DoubleArrowIcon
                    className='shadow border-2 p-0 rounded-circle'
                    color='success'
                    sx={{fontSize: 32}}/>
            }
        </a>
    )
}
