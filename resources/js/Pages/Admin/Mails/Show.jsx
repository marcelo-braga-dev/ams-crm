import Layout from "@/Layouts/Admin/Layout";
import parse from 'html-react-parser';

export default function Index({email}) {
    return (
        <Layout container>
            {email.body && parse(email.body)}
        </Layout>
    )
}
