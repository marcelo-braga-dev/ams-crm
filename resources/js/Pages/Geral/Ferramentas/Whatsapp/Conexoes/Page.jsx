import Layout from "@/Layouts/Layout.jsx";
import {useWhatsapp} from "@/Hooks/useWhatsapp.jsx";

const Page = () => {
    const { urlFrontend } = useWhatsapp();
    const url = `${urlFrontend}/connections`

    return (
        <Layout titlePage="Conexões do Whatsapp" menu="whatsapp" submenu="whatsapp-conexoes">
            <iframe
                src={url}
                allow="microphone"
                style={{width: '100%', height: 'calc(100vh - 8em)'}}
                title="Whaticket"
            />
        </Layout>
    );
};

export default Page;
