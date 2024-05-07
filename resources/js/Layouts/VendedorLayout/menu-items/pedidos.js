import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import chaves from "./chaves";

const dashboard = {
    id: 'pedidos',
    title: 'Pedidos',
    type: 'group',
    children: [{
        id: 'pedidos-lista',
        chave: chaves.pedidos.emitir,
        title: 'Lista de Pedidos',
        type: 'item',
        url: route('consultor.pedidos.index'),
        icon: RequestPageOutlinedIcon,
        breadcrumbs: false
    }, {
        id: 'pedidos-historico',
        chave: chaves.pedidos.emitir,
        title: 'Histórico de Pedidos',
        type: 'item',
        url: route('consultor.historicos.index'),
        icon: HistoryOutlinedIcon,
        breadcrumbs: false
    }
    ]
};

export default dashboard;
