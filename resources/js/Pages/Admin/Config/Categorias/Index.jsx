import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

export default function ({dados}) {
    return (
        <Layout container titlePage="Setores"
                menu="config" submenu="config-setores">
            <div className="row justify-content-end">
                <div className="col-auto">
                    <a href={route('admin.config.categorias.create')} className="btn btn-dark">
                        Cadastrar Setor</a>
                </div>
            </div>
            <div className="table table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Setor</th>
                        <th>Franquia</th>
                        <th>Cor</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {dados.map((dado, index) => {
                        return (
                            <tr key={index}>
                                <td>{dado.nome}</td>
                                <td>{dado.franquia}</td>
                                <td>
                                    <span className="badge rounded-circle p-2" style={{backgroundColor: dado.cor}}> </span>
                                </td>
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
