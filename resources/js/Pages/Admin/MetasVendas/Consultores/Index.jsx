import Layout from "@/Layouts/Admin/Layout";

export default function ({consultores, metas}) {
    return (
        <Layout container titlePage="Metas dos Consultores" menu="meta-vendas" submenu="consultores">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Meta de Venda<br/>Semestral</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {consultores.map((consultor, index) => {
                        return (
                            <tr key={index}>
                                <td>#{consultor.id}</td>
                                <td>{consultor.name}</td>
                                <td>R$ {metas[consultor.id] ?? '0,00'}</td>
                                <td>
                                    <a href={route('admin.metas-vendas.consultores.edit', consultor.id)}
                                       className="btn btn-primary btn-sm mb-0">Editar</a>
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
