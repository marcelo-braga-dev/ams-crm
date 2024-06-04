import chaves from "@/Layouts/VendedorLayout/menu-items/chaves";
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined";

const dashboard = {
    id: '',
    title: '',
    type: 'group',
    children: [
        {
            id: 'sac',
            title: 'SAC',
            type: 'collapse',
            url: undefined,
            icon: SpeakerNotesOutlinedIcon,
            submenu: [
                {
                    id: 'sac-chamados',
                    chave: chaves.sac.chamados,
                    title: 'Chamados',
                    type: 'item',
                    url: route('admin.chamados.index'),
                }
            ]
        }
    ]
};

export default dashboard;
