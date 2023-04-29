import Layout from "@/Layouts/Admin/Layout";

export default function ({historicos}) {
    return (
        <Layout container titlePage="Histórico de Importação" menu="leads" submenu="importar"
                voltar={route('admin.clientes.leads.importar.index')}>
            <div className="table-responsive">
                <table className="table table-hover table-striped table-sm">
                    <thead>
                    <tr>
                        <th>Data</th>
                        <th>Usuário</th>
                        <th>Setor</th>
                        <th className="text-center">Qtd.</th>
                    </tr>
                    </thead>
                    <tbody>
                    {historicos.map((dado, index) => {
                        return (
                            <tr key={index}>
                                <td>{dado.data}</td>
                                <td>{dado.nome}</td>
                                <td>{dado.setor}</td>
                                <td className="text-center">{dado.qtd}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
