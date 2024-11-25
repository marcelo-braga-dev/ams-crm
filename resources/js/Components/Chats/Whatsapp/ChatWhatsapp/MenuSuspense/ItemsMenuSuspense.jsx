import * as React from 'react';
import OpenIflameChatWhatsapp from '@/Components/Chats/Whatsapp/ChatWhatsapp/OpenIflameChatWhatsapp.jsx';

const ItemsMenuSuspense = ({value}) => {

    return (
        <OpenIflameChatWhatsapp
            dados={value}
        />
    );
};
export default ItemsMenuSuspense;
