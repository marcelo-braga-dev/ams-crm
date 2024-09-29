import { useContext } from 'react';
import { WhatsappContext } from '@/Contexts/WhatsappContext.jsx';


export const useWhatsapp = () => {
    const context = useContext(WhatsappContext);

    if (!context) {
        throw new Error('useWhatsapp deve ser usado dentro de um WhatsappProvider');
    }

    return context;
};
