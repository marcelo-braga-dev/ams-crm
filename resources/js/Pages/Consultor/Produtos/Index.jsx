import Layout from "@/Layouts/Consultor/Layout";

export default function ({fornecedores}) {
    return (
        <Layout container titlePage="Produtos">
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th>Fornecedor</th>
                        <th>Setor</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {fornecedores.map((dados) => {
                        return (
                            <tr key={dados.id}>
                                <td className="text-center">
                                    #{dados.id}
                                </td>
                                <td>
                                    {dados.nome}
                                </td>
                                <td>
                                    {dados.setor}
                                </td>
                                <td className="text-right">
                                    <a href={route('consultor.pedidos.produtos.show', dados.id)}
                                       className="btn btn-warning btn-sm">Produtos</a>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
