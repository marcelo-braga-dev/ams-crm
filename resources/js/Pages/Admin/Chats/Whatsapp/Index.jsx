import Layout from "@/Layouts/Layout.jsx";
import {useEffect} from "react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";

const Page = ({width, height}) => {
    // const url = "https://app-wa.ams360crm.com.br/whaticket.js"
    const url = "http://localhost:3000/tickets"

    return <Layout titlePage="Whatsapp" menu="chats" submenu="chats-whatsapp">
        <CardContainer>
                <iframe
                    src={url}
                    width="100%"
                    style={{height: '80vh'}}
                    title="Whaticket"
                />
        </CardContainer>
    </Layout>
}

export default Page
