import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import Color from "@/Components/Elementos/Color";

export default function ({franquias}) {
    return (
        <Layout container titlePage="Franquias"
                menu="config" submenu="config-franquias">
            <div className="row justify-content-end">
                <div className="col-auto">
                    <a href={route('admin.franquias.create')} className="btn btn-primary">
                        Cadastrar Franquia</a>
                </div>
            </div>
            <div className="table table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Cor</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {franquias.map((dado, index) => {
                        return (
                            <tr key={index}>
                                <td>{dado.nome}</td>
                                <td><Color valor={dado.cor}/></td>
                                <td>
                                    <a href={route('admin.franquias.show', dado.id)}
                                    className="btn btn-primary btn-sm">Ver</a>
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
