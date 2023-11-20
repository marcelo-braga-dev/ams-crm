import * as React from "react";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";

const dashboard = {
    id: 'chat',
    title: '',
    type: 'group',
    children: [
        {
            id: 'chats',
            title: 'Chats',
            type: 'collapse',
            url: undefined,
            icon: QuestionAnswerOutlinedIcon,
            submenu: [
                {
                    id: 'chat-interno',
                    title: 'Chat Interno',
                    type: 'item',
                    url: route('admin.chat-interno.index'),
                }
            ]
        }
    ]
};

export default dashboard;
