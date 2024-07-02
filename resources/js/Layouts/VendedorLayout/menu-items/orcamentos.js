// import chaves from "@/Layouts/Menus/chaves";
import chaves from "@/Layouts/Menus/chaves";
import {Folder} from "react-bootstrap-icons";

const dashboard = {
    id: 'orcamentos',
    title: 'Orçamentos',
    type: 'group',
    children: [{
        id: 'orcamentos-lista',
        chave: chaves.dev.chamados,
        title: 'Orçamentos Solar',
        type: 'item',
        url: route('consultor.orcamentos.index'),
        icon: Folder,
        breadcrumbs: false
    }]
};

export default dashboard;
