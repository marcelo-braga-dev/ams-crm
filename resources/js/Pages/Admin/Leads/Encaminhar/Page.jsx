import {EncaminharProvider} from './Context.jsx'
import Layout from "@/Layouts/Layout.jsx";
import CardEncaminhar from "@/Pages/Admin/Leads/Encaminhar/CardEncaminhar.jsx";

const Page = () => {
    return (
        <EncaminharProvider>
            <Layout titlePage="Encaminhar Leads" menu="leads" submenu="leads-encaminhar">
            <CardEncaminhar/>
            </Layout>
        </EncaminharProvider>
    )
}
export default Page
