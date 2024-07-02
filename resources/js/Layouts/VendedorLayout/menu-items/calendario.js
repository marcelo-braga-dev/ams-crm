import * as React from "react";

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import chaves from "@/Layouts/Menus/chaves";

const dashboard = {
    id: 'calendario',
    title: 'Calendário',
    type: 'group',
    children: [{
        id: 'calendario-agenda',
        chave: chaves.ferramentas.agenda,
        title: 'Agenda',
        type: 'item',
        url: route('consultor.calendario.agenda.index'),
        icon: CalendarMonthOutlinedIcon,
        breadcrumbs: false
    }]
};

export default dashboard;
