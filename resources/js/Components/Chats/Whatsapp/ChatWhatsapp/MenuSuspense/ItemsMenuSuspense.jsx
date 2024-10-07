import { Stack } from '@mui/material';
import * as React from 'react';
import OpenIflame from '@/Components/Chats/Whatsapp/ChatWhatsapp/OpenIflame.jsx';

const ItemsMenuSuspense = ({ value }) => {
    const { id, status_telefone, telefone, numero } = value;
console.log(value.lead_id)
    return (
        <Stack key={id} direction="row" spacing={0} alignItems="center" marginInlineStart={1}>
            <OpenIflame numero={numero} status={status_telefone} telefone={telefone} leadId={value.lead_id} telefoneId={value.id}/>
        </Stack>
    );
};
export default ItemsMenuSuspense;
