import Layout from "@/Layouts/Layout";

export default function ({historicos}) {
    return (
        <Layout container titlePage="Histórico de Importação" menu="leads" submenu="leads-importar"
                voltar={route('admin.clientes.leads.importar.index')}>
            <div className="table-responsive">
                <table className="table table-hover table-striped table-sm">
                    <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th>Data</th>
                        <th>Usuário</th>
                        <th>Setor</th>
                        <th className="text-center">Qtd.</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {historicos.map((dado, index) => {
                        return (
                            <tr key={index}>
                                <td className="col-1 text-center">#{dado.id}</td>
                                <td>{dado.data}</td>
                                <td>{dado.nome}</td>
                                <td>{dado.setor}</td>
                                <td className="text-center">{dado.qtd}</td>
                                <td>
                                    <a className="btn btn-primary btn-sm mb-0"
                                    href={route('admin.clientes.leads.importar-historico.show', dado.id)}>Ver</a>
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
