import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import chaves from "./chaves";

const relatorios = {
    id: 'relatorios',
    title: 'Dashboards',
    type: 'group',
    children: [{
        id: 'relatorios-metas',
        chave: chaves.dashboards.vendas,
        title: 'Indicadores de Vendas',
        type: 'item',
        url: route('consultor.relatorios.metas.index'),
        icon: TrendingUpOutlinedIcon,
        breadcrumbs: false
    },
    ]
};

export default relatorios;
