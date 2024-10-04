import { useWhatsapp } from '@/Hooks/useWhatsapp.jsx';

export const ChatWhatsapp = () => {

    const { urlFrontend } = useWhatsapp();

    return (<>
            <iframe
                src={urlFrontend}
                allow="microphone"
                style={{ width: '100%', height: 'calc(100vh - 8em)' }}
                title="Whaticket"
            />
        </>
    );
};
