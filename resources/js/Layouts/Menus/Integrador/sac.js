import {CardText, Tags} from "react-bootstrap-icons";

const dashboard = {
    id: 'sac',
    title: 'SAC',
    type: 'group',
    children: [
        {
            id: 'sac',
            title: 'SAC',
            type: 'collapse',
            url: undefined,
            icon: Tags,
            submenu: [
                {
                    id: 'sac-kanban',
                    chave: true,
                    title: 'Sac',
                    type: 'item',
                    url: route('auth.sac.index'),
                },
            ]
        }
    ]
};

export default dashboard;
