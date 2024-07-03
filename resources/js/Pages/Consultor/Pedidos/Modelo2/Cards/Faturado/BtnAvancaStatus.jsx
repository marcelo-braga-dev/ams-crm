import DoubleArrowIcon from '@mui/icons-material/DoubleArrowRounded';
import DownloadIcon from '@mui/icons-material/DownloadRounded';
import {Link} from "@inertiajs/react";

export default function BtnAvancaStatus({id, situacao }) {
    return (
            <Link className='btn btn-danger btn-sm text-white'
                href={route('consultor.pedidos.modelo-2.faturado.show', id)}>
                    <DownloadIcon sx={{ fontSize: 17 }}/>
            </Link>
    )
}
