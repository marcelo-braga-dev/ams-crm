import Layout from "@/Layouts/Admin/Layout";

export default function ({produtos, fornecedor}) {
    return (
        <Layout titlePage="Produtos" container menu="fornecedores" submenu="lista"
                voltar={route('admin.fornecedores.index')}>
            <div className="row justify-content-between mb-4">
                <div className="col-auto">
                    <h6>Fornecedor: {fornecedor.nome}</h6>
                </div>
                <div className="col-auto">
                    <a href={route('admin.produtos.create', {fornecedor: fornecedor.id})}
                       className="btn btn-warning btn-sm">Cadastrar</a>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th className="col-1 text-center">ID</th>
                        <th>Nome</th>
                        <th>Preço Venda</th>
                        <th>Preço Fornecedor</th>
                        <th>Unidade</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtos.map((dado, index) => {
                        return (
                            <tr key={index}>
                                <td className="text-center">#{dado.id}</td>
                                <td className="text-wrap">{dado.nome}</td>
                                <td>R$ {dado.preco_venda}</td>
                                <td>R$ {dado.preco_fornecedor}</td>
                                <td>{dado.unidade}</td>
                                <td>
                                    <a href={route('admin.produtos.edit', dado.id)}
                                       className="btn btn-primary btn-sm">Editar</a>
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
