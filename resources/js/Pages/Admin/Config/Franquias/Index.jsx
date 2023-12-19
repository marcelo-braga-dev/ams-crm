import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

export default function ({franquias}) {
    return (
        <Layout container titlePage="Franquias"
                menu="config" submenu="franquias-lista">
            <div className="row justify-content-end">
                <div className="col-auto">
                    <a href={route('admin.franquias.create')} className="btn btn-dark">
                        Cadastrar Franquia</a>
                </div>
            </div>
            <div className="table table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {franquias.map((dado, index) => {
                        return (
                            <tr key={index}>
                                <td>{dado.nome}</td>
                                <td>
                                    <a href={route('admin.franquias.show', dado.id)}
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
