import DoubleArrowIcon from "@mui/icons-material/DoubleArrowRounded";
import DownloadIcon from "@mui/icons-material/DownloadRounded";
import React from "react";

function btnStatusPadrao(link) {
    return (
        <a href={link}>
            <DoubleArrowIcon
                className='shadow border-2 p-0 rounded-circle'
                color='success'
                sx={{fontSize: 32}}/>
        </a>
    )
}

function btnStatusFaturando(link, situacao) {
    return (
        <a href={link}>
            {situacao === 'novo' &&
                <button className="btn btn-danger btn-sm p-1">
                    <DownloadIcon></DownloadIcon>
                </button>}
            {situacao === 'visualizado' &&
                <DoubleArrowIcon
                    className='shadow border-2 p-0 rounded-circle'
                    color='success'
                    sx={{fontSize: 32}}/>
            }
        </a>
    )
}

const avancarStatus = (id, status, situacao) => {

    switch (status) {
        case 'reprovado':
            return btnStatusPadrao(route('admin.reprovado.show', id))
        case 'encomenda':
            return btnStatusPadrao(route('admin.conferencia.show', id))
        case 'conferencia':
            return btnStatusPadrao(route('admin.conferencia.show', id))
        case 'lancado':
            return btnStatusPadrao(route('admin.lancado.show', id))
        case 'nota':
            return btnStatusPadrao(route('admin.aguardando-nota.show', id))
        case 'pagamento':
            return btnStatusPadrao(route('admin.aguardando-pagamento.show', id))
        case 'faturamento':
            return btnStatusFaturando(route('admin.aguardando-faturamento.show', id), situacao)
        case 'faturado':
            return btnStatusPadrao(route('admin.faturado.show', id))
        case 'faturado_vista':
            return btnStatusPadrao(route('admin.faturado.show', id))
        case 'faturado_prazo':
            return btnStatusPadrao(route('admin.faturado.show', id))
        case 'acompanhamento':
            return btnStatusPadrao(route('admin.acompanhamento.show', id))
        case 'entregue':
            return null
        case 'cancelado':
            return null
    }
}
export default avancarStatus
