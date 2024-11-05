import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import { Truck } from 'react-bootstrap-icons';
import Link from '@/Components/Link.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import DistribuidorasGrafico from '@/Pages/Admin/Dashboard/Vendas/Graficos/DistribuidorasGrafico.jsx';

const TopDistribuidoras = ({vendasData, filters}) => {
    return (
        <CardContainer>
            <CardTitle title="Top Distribuidoras" icon={<Truck size="22" />}>
                <Link label="Ver Todos"
                      href={route('admin.dashboard.vendas.fornecedores', {
                          ano: filters.anoSelecionado, mes: filters.mesesSelecionado, setor: filters.setorSelecionado,
                      })}
                >
                    Ver Todos
                </Link>
            </CardTitle>
            <CardBody>
                <DistribuidorasGrafico
                    dados={vendasData.fornecedores_vendas}
                    leads={vendasData.leads}
                    vendasLeadsComp={vendasData.vendasLeadsComp}
                />
            </CardBody>
        </CardContainer>
    )
}
export default TopDistribuidoras
