import Layout from '@/Layouts/AdminLayout/LayoutAdmin';

export default function Create({fornecedores, setores, setorAtual}) {

    return (
        <Layout container titlePage="Fornecedores Cadastrados"
                menu="config" submenu="config-fornecedores">

            <div className="row justify-content-end">
                <div className="col-auto text-right">
                    <a href={route('admin.fornecedores.create')} className="btn btn-dark">
                        Cadastrar Fornecedor</a>
                </div>
            </div>

            {/*Setores*/}
            <div className="row mb-4">
                <h6>Setores</h6>
                <div className="col">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <a type="button"
                           href={route('admin.fornecedores.index')}
                           className={(!setorAtual ? 'active text-white ' : '') + "btn btn-outline-dark "}>
                            Todos
                        </a>
                        {setores.map((setor, index) => {
                            return (
                                <a type="button" key={index}
                                   href={route('admin.fornecedores.index', {setor: setor.id})}
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
                        <th>Franquia</th>
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
                                    {dados.franquia}
                                </td>
                                <td>
                                    {dados.setor}
                                </td>
                                <td className="text-right">
                                    <a href={route('admin.fornecedores.show', dados.id)}
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
