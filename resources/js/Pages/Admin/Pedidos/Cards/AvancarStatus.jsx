import DoubleArrowIcon from "@mui/icons-material/DoubleArrowRounded";

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

const avancarStatus = (id, status) => {

    switch (status) {
        case 'reprovado':
            return null
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
            return btnStatusPadrao(route('admin.aguardando-faturamento.show', id))
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
