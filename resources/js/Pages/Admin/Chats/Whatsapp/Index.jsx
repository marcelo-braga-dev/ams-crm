import Layout from "@/Layouts/Layout.jsx";
import {useEffect} from "react";

const Page = ({width, height}) => {
    const url = "https://app-wa.ams360crm.com.br/whaticket.js"

    return <Layout>
        <iframe
            src={url}
            width="100%"

            style={{height: '80vh'}}
            title="Whaticket"
        />
    </Layout>
}

export default Page
