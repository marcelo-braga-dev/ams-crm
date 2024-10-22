import { Stack } from '@mui/material';
import * as React from 'react';
import OpenIflame from '@/Components/Chats/Whatsapp/ChatWhatsapp/OpenIflame.jsx';

const ItemsMenuSuspense = ({ value }) => {
    const { id, status_whatsapp, telefone, numero } = value;

    return (
            <OpenIflame key={id} numero={numero} status={status_whatsapp} telefone={telefone} leadId={value.lead_id} telefoneId={value.id}/>
    );
};
export default ItemsMenuSuspense;
