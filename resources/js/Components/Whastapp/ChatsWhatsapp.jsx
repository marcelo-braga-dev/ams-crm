import { useWhatsapp } from '@/Hooks/useWhatsapp.jsx';

export const ChatsWhatsapp = () => {

    const { urlFrontend } = useWhatsapp();

    return (
        <iframe
            src={urlFrontend}
            width="100%"
            style={{ height: 'calc(100vh - 8em)' }}
            title="Whaticket"
        />
    );
};
