import Layout from '@/Layouts/Admin/Layout';

export default function Dashboard(props) {
    return (
        <Layout titlePage="Home">

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Admin</div>
                    </div>
                </div>
            </div>

        </Layout>
    );
}
