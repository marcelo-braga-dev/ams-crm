import Layout from '@/Layouts/Consultor/Layout';

export default function Create({integradores}) {

    return (
        <Layout container titlePage="Integradores Cadastrados">
            <div className="row justify-content-end">
                <div className="col-auto text-right">
                    <a href={route('consultor.integradores.create')} className="btn btn-dark">
                        Cadastrar Integrador
                    </a>
                </div>
            </div>
            <div className="row">
                <div className="col-12 mb-3 p-3">
                    <table className="table" width="100%">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Integrador</th>
                            <th>CNPJ</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {integradores.map((dados) => {
                            return (
                                <tr key={dados.id}>
                                    <td>
                                        #{dados.id}
                                    </td>
                                    <td>
                                        {dados.nome}
                                    </td>
                                    <td>
                                        {dados.cnpj}
                                    </td>
                                    <td className="text-right">
                                        <a href={route('consultor.integradores.show', dados.id)}
                                           className="btn btn-primary btn-sm">
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
        </Layout>
    )
}
