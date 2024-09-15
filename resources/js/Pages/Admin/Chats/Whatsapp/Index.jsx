import Layout from "@/Layouts/Layout.jsx";

const Page = () => {

    // const url = "http://localhost:3000/tickets"
    const url = import.meta.env.VITE_WHATSAPP

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
