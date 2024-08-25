import Layout from "@/Layouts/Layout.jsx";
import {useEffect} from "react";

const Page = ({width, height}) => {
    const url = "https://app-wa.ams360crm.com.br/whaticket.js"

    useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <Layout>
        WHATSAPP

        <div>
            <h1>Whaticket</h1>
            <div id="whaticket-root">
                {/* Aqui o conteúdo do Whaticket será carregado */}
            </div>
        </div>

        <h1>IFLAME</h1>
        <iframe
            src={url}
            width="100%"
            height="1000px"
            style={{border: "none"}}
            title="Whaticket"
        />
    </Layout>
}

export default Page
