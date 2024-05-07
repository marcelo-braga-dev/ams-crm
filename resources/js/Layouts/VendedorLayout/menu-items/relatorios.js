import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import chaves from "./chaves";

const relatorios = {
    id: 'relatorios',
    title: 'Relatórios',
    type: 'group',
    children: [{
        id: 'relatorios-metas',
        chave: chaves.relatorio,
        title: 'Metas de Vendas',
        type: 'item',
        url: route('consultor.relatorios.metas.index'),
        icon: TrendingUpOutlinedIcon,
        breadcrumbs: false
    },
    ]
};

export default relatorios;
