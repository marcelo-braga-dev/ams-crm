import CardTitle from '@/Components/Cards/CardTitle.jsx';
import { BarChartLine } from 'react-bootstrap-icons';
import Link from '@/Components/Link.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import TopLeadsGrafico from '@/Pages/Admin/Dashboard/Vendas/Graficos/TopLeadsGrafico.jsx';
import CardContainer from '@/Components/Cards/CardContainer.jsx';

const TopCompradores = ({vendasData, filters}) => {
    return (
        <CardContainer>
            <CardTitle title="Top Compradores (Leads)" icon={<BarChartLine size="22" />}>
                <Link label="Ver Todos"
                      href={route('admin.dashboard.vendas.leads', {
                          ano: filters.anoSelecionado, mes: filters.mesesSelecionado, setor: filters.setorSelecionado,
                      })}
                >
                    Ver Todos
                </Link>
            </CardTitle>
            <CardBody>
                <TopLeadsGrafico
                    dados={vendasData.vendasLeads}
                    leads={vendasData.leads}
                    vendasLeadsComp={vendasData.vendasLeadsComp}
                />
            </CardBody>
        </CardContainer>
    )
}
export default TopCompradores
