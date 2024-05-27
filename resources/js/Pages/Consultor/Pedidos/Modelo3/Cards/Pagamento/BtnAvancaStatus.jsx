import DoubleArrowIcon from '@mui/icons-material/DoubleArrowRounded';
import DownloadIcon from '@mui/icons-material/DownloadRounded';

export default function BtnAvancaStatus({id, situacao}) {
    return (
        <a href={route('consultor.aguardando-pagamento.show', id)}>
            {situacao === 'novo' &&
                <button className='btn btn-danger btn-sm text-white p-2'>
                    <DownloadIcon sx={{ fontSize: 17 }}/>
                </button>
            }
            {situacao === 'visualizado' &&
                    <DoubleArrowIcon
                    className='shadow border-2 p-0 rounded-circle'
                    color='success'
                    sx={{ fontSize: 32 }} />
            }
        </a>
    )
}
