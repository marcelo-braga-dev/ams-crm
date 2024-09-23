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
                    title: 'SAC',
                    type: 'item',
                    url: route('integrador.sac.index'),
                },
            ]
        }
    ]
};

export default dashboard;
