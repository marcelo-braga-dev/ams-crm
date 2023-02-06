import Layout from "@/Layouts/Admin/Layout";
import parse from 'html-react-parser';

export default function Index({email}) {
    return (
        <Layout container voltar={route('admin.emails.index')}>
            {email.body && parse(email.body)}
        </Layout>
    )
}
