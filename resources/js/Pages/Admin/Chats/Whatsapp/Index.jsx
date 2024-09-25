import Layout from '@/Layouts/Layout.jsx';
import { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

const Page = () => {
    const [keys, setKeys] = useState({ urlFrontend: '' });

    const fetchKeys = async () => {
        const urlFrontend = await axios.get(route('auth.chats.whatsapp.chaves'));
        setKeys(urlFrontend.data);
    };
    useEffect(() => {
        fetchKeys();
    }, []);

    return (
        <Layout titlePage="Whatsapp" menu="chats" submenu="chats-whatsapp">
            <iframe
                src={keys.urlFrontend}
                width="100%"
                style={{ height: 'calc(100vh - 8em)' }}
                title="Whaticket"
            />
        </Layout>
    );
};

export default Page;
