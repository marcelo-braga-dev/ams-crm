import * as React from "react";

import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import chaves from "@/Layouts/Menus/chaves";

const dashboard = {
    id: 'chat',
    title: 'Chat',
    type: 'group',
    children: [{
        id: 'chat-interno',
        chave: chaves.chats.interno,
        title: 'Chat Interno',
        type: 'item',
        url: route('consultor.chat-interno.index'),
        icon: QuestionAnswerOutlinedIcon,
        breadcrumbs: false
    }
    ]
};

export default dashboard;
