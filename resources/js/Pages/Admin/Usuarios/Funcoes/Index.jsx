import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

export default function ({ funcoes }) {
    return (
        <Layout titlePage="Funções de Usuários" menu="usuarios" submenu="usuarios-funcoes">
            <a className="btn btn-primary" href={route('admin.usuarios.funcoes.create')}>Cadastrar</a>

            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th className="text-center">Admin</th>
                        <th className="text-center">Qtd</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {funcoes.map((item => (
                        <tr key={item.id}>
                            <td>{item.nome}</td>
                            <td className="text-center">{item.admin ? 'SIM' : 'NÃO'}</td>
                            <td className="text-center">0</td>
                            <td>
                                <a className="mb-0 btn btn-primary btn-sm"
                                    href={route('admin.usuarios.funcoes.edit', item.id)}>Ver</a>
                            </td>
                        </tr>
                    )))}
                </tbody>
            </table>
        </Layout>
    )
}