import chaves from "@/Layouts/VendedorLayout/menu-items/chaves";
import LaptopMacOutlinedIcon from "@mui/icons-material/LaptopMacOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'dev',
            title: 'Desenvolvimento',
            type: 'collapse',
            url: undefined,
            icon: LaptopMacOutlinedIcon,
            admin: true,
            submenu: [
                {
                    id: 'dev-registros',
                    chave: chaves.dev.chamados,
                    title: 'Registros',
                    type: 'item',
                    url: route('admin.dev.index'),
                },
                {
                    id: 'dev-cadastrar',
                    chave: chaves.dev.chamados,
                    title: 'Cadastrar',
                    type: 'item',
                    url: route('admin.dev.create'),
                },
            ]
        }
    ]
};

export default dashboard;
