import Layout from "@/Layouts/Admin/Layout";

export default function ({dados}) {
    return (
        <Layout container titlePage="Categorias">
            <div className="row justify-content-between">
                <div className="col-auto"><h5>Categorias</h5></div>
                <div className="col-auto">
                    <a href={route('admin.config.categorias.create')} className="btn btn-primary">Cadastrar Categoria</a>
                </div>
            </div>
            <div className="table table-responsive">
                <table width="100%">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Categoria</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {dados.map((dado, index) => {
                        return (
                            <tr key={index}>
                                <td>#{dado.id}</td>
                                <td>{dado.nome}</td>
                                <td>
                                    <a href={route('admin.config.categorias.show', dado.id)}
                                    className="btn btn-primary btn-sm mt-3">Ver</a>
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
