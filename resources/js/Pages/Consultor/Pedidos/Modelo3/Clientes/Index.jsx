import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";

export default function ({clientes}) {
    return (
        <Layout container titlePage="Clientes" menu="pedidos" submenu="clientes">
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Ver</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clientes.map((dado) => {
                        return (
                            <tr>
                                <td>{dado.nome}</td>
                                <td>
                                    <a href={route('consultor.clientes.show', dado.id)} className="btn btn-primary btn-sm">Ver</a>
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
