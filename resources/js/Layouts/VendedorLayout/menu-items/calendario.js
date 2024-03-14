import * as React from "react";

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const dashboard = {
    id: 'calendario',
    title: 'Calendário',
    type: 'group',
    children: [{
        id: 'calendario-agenda',
        title: 'Agenda',
        type: 'item',
        url: route('consultor.agenda.index'),
        icon: CalendarMonthOutlinedIcon,
        breadcrumbs: false
    }]
};

export default dashboard;
