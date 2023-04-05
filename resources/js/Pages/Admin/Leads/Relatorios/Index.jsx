import Layout from "@/Layouts/Admin/Layout";

export default function ({qtdLeads}) {
    return (
        <Layout container titlePage="Relatórios dos Leads" menu="leads" submenu="relatorios">
            <div className="row">
                <div className="col">
                    <div className="table table-responsive">
                        <table className="w-100 text-center">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Novo</th>
                                <th>Atendimento</th>
                                <th>Finalizado</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {qtdLeads.map((dado, index) => {
                                return (
                                    <tr key={index}>
                                        <td>#{dado.id}</td>
                                        <td>{dado.nome}</td>
                                        <td>{dado.novo ?? 0}</td>
                                        <td>{dado.atendimento ?? 0}</td>
                                        <td>{dado.finalizado ?? 0}</td>
                                        <td>
                                            <a className="btn btn-primary btn-sm mt-3"
                                               href={route('admin.leads.relatorios.show', dado.id)}>
                                                Ver
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
