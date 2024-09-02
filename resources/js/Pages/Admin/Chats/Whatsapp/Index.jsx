import Layout from "@/Layouts/Layout.jsx";

const Page = ({width, height}) => {
    // const url = "https://app-wa.ams360crm.com.br/whaticket.js"
    const url = "http://localhost:3000/tickets"

    return <Layout titlePage="Whatsapp" menu="chats" submenu="chats-whatsapp">
        <iframe
            src={url}
            width="100%"
            style={{height: 'calc(100vh - 8em)'}}
            title="Whaticket"
        />
    </Layout>
}

export default Page
