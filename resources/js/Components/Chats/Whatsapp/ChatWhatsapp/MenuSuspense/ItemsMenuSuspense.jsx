import * as React from 'react';
import OpenIflameChatWhatsapp from '@/Components/Chats/Whatsapp/ChatWhatsapp/OpenIflameChatWhatsapp.jsx';

const ItemsMenuSuspense = ({numero}) => {

    return (
        <OpenIflameChatWhatsapp
            dados={numero}
        />
    );
};
export default ItemsMenuSuspense;
