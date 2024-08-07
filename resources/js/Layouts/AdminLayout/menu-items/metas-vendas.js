import chaves from "@/Layouts/Menus/chaves";
import {ClipboardData} from "react-bootstrap-icons";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'menu-meta-vendas',
            title: 'Metas de Vendas',
            type: 'collapse',
            url: undefined,
            icon: ClipboardData,
            submenu: [
                {
                    id: 'meta-vendas',
                    chave: chaves.metas_vendas.editar,
                    title: 'Meta de Vendas',
                    type: 'item',
                    url: route('admin.metas-vendas.consultores.index'),
                },{
                    id: 'meta-vendas-empresa',
                    chave: chaves.metas_vendas.empresa,
                    title: 'Meta de Vendas da Empresa',
                    type: 'item',
                    url: route('admin.metas-vendas.empresa.index'),
                }
            ]
        }
    ]
};

export default dashboard;
