import Layout from '@/Layouts/Admin/Layout';

export default function Create({fornecedores, setores, setorAtual}) {

    return (
        <Layout container titlePage="Categorias por Fornecedores"
                menu="produtos" submenu="categorias">
            {/*Setores*/}
            <div className="row mb-4">
                <h6>Setores</h6>
                <div className="col">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <a type="button"
                           href={route('admin.produtos-fornecedores.index')}
                           className={(!setorAtual ? 'active text-white ' : '') + "btn btn-outline-dark "}>
                            Todos
                        </a>
                        {setores.map((setor, index) => {
                            return (
                                <a type="button" key={index}
                                   href={route('admin.produtos-fornecedores.index', {setor: setor.id})}
                                   className={(setor.id == setorAtual ? 'active text-white ' : '') + "btn btn-outline-dark "}>
                                    {setor.nome}
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fornecedor</th>
                        <th>Setor</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {fornecedores.map((dados) => {
                        return (
                            <tr key={dados.id}>
                                <td>
                                    #{dados.id}
                                </td>
                                <td>
                                    {dados.nome}
                                </td>
                                <td>
                                    {dados.setor}
                                </td>
                                <td className="text-right">
                                    <a href={route('admin.produtos-categorias.show', dados.id)}
                                       className="btn btn-primary btn-sm">Categorias</a>
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
