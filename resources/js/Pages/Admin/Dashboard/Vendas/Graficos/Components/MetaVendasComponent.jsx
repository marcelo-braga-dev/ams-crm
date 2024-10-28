import { isAdmin } from '@/Helpers/helper.js';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import { GraphUp } from 'react-bootstrap-icons';
import Link from '@/Components/Link.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import MetasVendas from '@/Pages/Admin/Dashboard/Vendas/Partials/MetasVendas.jsx';
import MetaVendas from '@/Pages/Admin/Dashboard/Vendas/Graficos/MetaVendas.jsx';
import CardContainer from '@/Components/Cards/CardContainer.jsx';

const MetaVendasComponent = ({vendasData, filters}) => {
    const admin = isAdmin();

    return (
        <CardContainer>
            <CardTitle title="Meta x Vendas" icon={<GraphUp size="22" />}>
                <Link className="btn btn-primary btn-sm mb-0" href={route('admin.metas-vendas.vendas-faturadas.index')}>
                    Ver Pedidos
                </Link>
            </CardTitle>
            <CardBody>
                <MetasVendas
                    metasUsuarios={vendasData.metasUsuarios}
                    vendasMetasComp={vendasData.vendasMetasComp}
                    vendasUsuariosComp={vendasData.vendasUsuariosComp}
                    vendasTotal={vendasData.vendasTotal}
                    vendasMetas={vendasData.vendasMetas}
                    vendasUsuarios={vendasData.vendasUsuarios}
                    metasUsuariosComp={vendasData.metasUsuariosComp}
                    admin={admin}
                    mes={filters.mesesSelecionado?.[0]}
                    ano={filters.anoSelecionado}
                />
                <MetaVendas
                    vendasUsuarios={vendasData.vendasUsuarios}
                    metasUsuarios={vendasData.metasUsuarios}
                    vendasUsuariosComp={vendasData.vendasUsuariosComp}
                    metasUsuariosComp={vendasData.metasUsuariosComp}
                />
            </CardBody>
        </CardContainer>
    )
}
export default MetaVendasComponent
