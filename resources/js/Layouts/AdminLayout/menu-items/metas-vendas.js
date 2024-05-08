import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import chaves from "@/Layouts/VendedorLayout/menu-items/chaves";

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
            icon: TrendingUpOutlinedIcon,
            admin: true,
            submenu: [
                {
                    id: 'meta-vendas',
                    chave: chaves.metas_vendas.editar,
                    title: 'Meta de Vendas',
                    type: 'item',
                    url: route('admin.metas-vendas.consultores.index'),
                }
            ]
        }
    ]
};

export default dashboard;
