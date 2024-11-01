import * as React from 'react';
import OpenIflameChatWhatsapp from '@/Components/Chats/Whatsapp/ChatWhatsapp/OpenIflameChatWhatsapp.jsx';

const ItemsMenuSuspense = ({value}) => {
    const {id, status_whatsapp, telefone, numero, lead_id} = value;

    return (
        <OpenIflameChatWhatsapp
            key={id}
            numero={numero}
            status={status_whatsapp}
            telefone={telefone}
            leadId={lead_id}
            telefoneId={id}
        />
    );
};
export default ItemsMenuSuspense;
