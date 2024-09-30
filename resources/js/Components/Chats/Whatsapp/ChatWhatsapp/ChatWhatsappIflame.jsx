import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useWhatsapp } from '@/Hooks/useWhatsapp.jsx';

const ChatWhatsappIflame = () => {
    const { urlFrontend } = useWhatsapp();

    return (
        <Dialog
            open={}
            onClose={}
            fullWidth
            maxWidth="md"
        >
            <iframe
                src={urlFrontend}
                style={{ width: '100%', minHeight: '700px', border: 'none' }}
                title="WhatsApp"
            />
        </Dialog>
    );
};
export default ChatWhatsappIflame;
