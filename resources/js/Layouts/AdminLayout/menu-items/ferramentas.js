import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';

const dashboard = {
    id: 'ferramentas',
    title: '',
    type: 'group',
    children: [
        {
            id: 'ferramentas',
            title: 'Ferramentas',
            type: 'collapse',
            url: undefined,
            icon: HandymanOutlinedIcon,
            submenu: [
                {
                    id: 'ferramentas-agenda',
                    title: 'Agenda',
                    type: 'item',
                    url: route('admin.agenda.calendario.index'),
                }, {
                    id: 'ferramentas-email',
                    title: 'E-mail',
                    type: 'item',
                    url: route('admin.emails.index'),
                }
            ]
        }
    ]
};

export default dashboard;
