import DoubleArrowIcon from '@mui/icons-material/DoubleArrowRounded';

export default function BtnAvancaStatus({id}) {
    return (
        <a href={route('admin.modelo-2.pedidos.lancado.show', id)}>
            <DoubleArrowIcon
                className='shadow border-2 p-0 rounded-circle'
                color='dark'
                sx={{fontSize: 32}}/>
        </a>
    )
}
