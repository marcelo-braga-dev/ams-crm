import chaves from "@/Layouts/Menus/chaves";
import {BarChart, CardText} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dashboards',
            title: 'Dashboards',
            type: 'collapse',
            url: undefined,
            icon: BarChart,
            submenu: [
                {
                    id: 'dashboards-vendas',
                    chave: chaves.dashboards.vendas,
                    title: 'Indicadores de Vendas',
                    type: 'item',
                    url: route('consultor.relatorios.metas.index'),
                },
            ]
        }
    ]
};

export default dashboard;
