import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

export default function ({historicos, listaEnvio, proximo}) {
    return (
        <Layout titlePage="Leads Encaminhados" menu="leads" submenu="leads-encaminhados">
            <div className="card card-body mb-4">
                <h6>Sequência de Envios de Leads</h6>
                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Consultor(a)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listaEnvio.map(item => (
                            <tr>
                                <td className="col-1">{proximo === item.id ? 'Próximo' : ''}</td>
                                <td>{item.nome}</td>
                            </tr>
                        )
                    )}
                    </tbody>
                </table>
            </div>
            <div className="card card-body">
                <h6>Histórico de Envios de Leads</h6>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Consultor(a)</th>
                        <th>SDR</th>
                        <th>Cliente</th>
                        <th>Data</th>
                    </tr>
                    </thead>
                    <tbody>
                    {historicos.map(item => (
                            <tr>
                                <td>{item.destino}</td>
                                <td>{item.nome}</td>
                                <td>{item.lead_nome} [#{item.lead_id}]</td>
                                <td>{item.data}</td>
                            </tr>
                        )
                    )}

                    </tbody>
                </table>
            </div>
        </Layout>
    )
}
