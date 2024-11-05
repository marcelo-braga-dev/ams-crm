import DoubleArrowIcon from '@mui/icons-material/DoubleArrowRounded';

export default function BtnAvancaStatus({dados}) {
    return (
        <a href='/'>
            <DoubleArrowIcon
                className='shadow border-2 p-0 rounded-circle'
                color='success'
                sx={{ fontSize: 32 }} />
        </a>
    )
}
