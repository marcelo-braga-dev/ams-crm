import chaves from "@/Layouts/VendedorLayout/menu-items/chaves";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'config',
            title: 'Configurações',
            type: 'collapse',
            url: undefined,
            icon: SettingsSuggestOutlinedIcon,
            admin: true,
            submenu: [
                {
                    id: 'config-franquias',
                    chave: chaves.config.franquias,
                    title: 'Franquias',
                    type: 'item',
                    url: route('admin.franquias.index'),
                }, {
                    id: 'config-fornecedores',
                    chave: chaves.config.fornecedores,
                    title: 'Fornecedores',
                    type: 'item',
                    url: route('admin.fornecedores.index'),
                }, {
                    id: 'config-setores',
                    chave: chaves.config.setores,
                    title: 'Setores',
                    type: 'item',
                    url: route('admin.config.categorias.index'),
                }, {
                    id: 'config-leads',
                    chave: chaves.config.leads,
                    title: 'Leads',
                    type: 'item',
                    admin: true,
                    url: route('admin.clientes.leads.status.index'),
                },
            ]
        }
    ]
};

export default dashboard;
