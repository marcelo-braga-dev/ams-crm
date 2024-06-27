import chaves from "@/Layouts/VendedorLayout/menu-items/chaves";
import {BoxSeam} from "react-bootstrap-icons";

const dashboard = {
    id: 'produtos',
    title: 'Produtos',
    type: 'group',
    children: [
        {
            id: 'produtos',
            title: 'Produtos',
            type: 'collapse',
            url: undefined,
            icon: BoxSeam,
            submenu: [
                {
                    id: 'produtos-cadastrados',
                    chave: chaves.produtos.cadastrados,
                    title: 'Produtos',
                    type: 'item',
                    url: route('admin.produtos.index'),
                },{
                    id: 'produtos-fornecedores',
                    chave: chaves.produtos.fornecedores,
                    title: 'Fornecedores',
                    type: 'item',
                    url: route('admin.produtos.fornecedores.index'),
                }, {
                    id: 'produtos-integracoes',
                    chave: chaves.produtos.integracoes,
                    title: 'Integrações',
                    type: 'item',
                    url: route('admin.produtos.integracoes.index'),
                },
                {
                    id: 'produtos-categorias',
                    chave: chaves.produtos.categorias,
                    title: 'Categorias',
                    type: 'item',
                    url: route('admin.produtos-categorias.index'),
                },  {
                    id: 'produtos-unidades',
                    chave: chaves.produtos.unidades,
                    title: 'Configurações',
                    type: 'item',
                    url: route('admin.produtos-unidades.index'),
                },
            ]
        }
    ]
};

export default dashboard;
