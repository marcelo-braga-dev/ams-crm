import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import { Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import convertFloatToMoney from '@/Helpers/converterDataHorario.jsx';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import TimelineIcon from '@mui/icons-material/Timeline';

const CardsComponent = ({vendasData, filters}) => {
    return (
        <div className="row row-cols-4">
            <DataCard
                color="red"
                icon={<AttachMoneyIcon />}
                title="Vendas"
                value={vendasData.vendasTotal.vendas}
                compValue={vendasData.vendasMetasComp?.totalVendas}
            />
            <DataCard
                color="orange"
                icon={<TrendingUpIcon />}
                title="Meta de Vendas"
                value={vendasData.vendasMetas?.totalMetas}
                compValue={vendasData.vendasMetasComp?.totalMetas}
            />
            <DataCard
                color="blue"
                icon={<AccountBalanceOutlinedIcon />}
                title="Meta de Vendas da Empresa"
                value={vendasData.metasEmpresas?.[filters.mesesSelecionado[0]]}
                compValue={vendasData.vendasMetasComp?.totalMetas}
            />
            <DataCard
                color="green"
                icon={<TimelineIcon />}
                title="Vendas x Meta"
                value={vendasData.vendasTotal.vendas - vendasData.vendasMetas?.totalMetas}
                compValue={vendasData.vendasMetasComp?.totalVendas - vendasData.vendasMetasComp?.totalMetas}
                additionalText={((vendasData.vendasTotal.vendas - vendasData.vendasMetas?.totalMetas) / vendasData.vendasMetas?.totalMetas * 100) + 100 + '%'}
            />
        </div>
    )
}

const DataCard = ({ color, icon, title, value, compValue, additionalText }) => (<div className="col">
    <CardContainer>
        <CardBody>
            <Stack direction="row" spacing={2}>
                <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
                <div>
                    <Typography variant="body2">{title}</Typography>
                    <Typography fontWeight="bold">R$ {convertFloatToMoney(value)}</Typography>
                    {compValue > 0 && <Typography fontWeight="bold">R$ {convertFloatToMoney(compValue)}</Typography>}
                    {compValue > 0 && <Typography fontWeight="bold">{additionalText}</Typography>}
                </div>
            </Stack>
        </CardBody>
    </CardContainer>
</div>);
export default CardsComponent
