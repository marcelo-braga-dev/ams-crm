import Layout from '@/Layouts/Layout';

export default function Create({consultores, setores, setorAtual}) {

    return (
        <Layout container titlePage="Relatórios de Vendas"
                menu="pedidos" submenu="faturamento">
            {/*Setores*/}
            <div className="row mb-4">
                <h6>Setores</h6>
                <div className="col">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <a type="button"
                           href={route('admin.pedidos.relatorios.faturamento.index')}
                           className={(!setorAtual ? 'active text-white ' : '') + "btn btn-outline-dark "}>
                            Todos
                        </a>
                        {setores.map((setor, index) => {
                            return (
                                <a type="button" key={index}
                                   href={route('admin.pedidos.relatorios.faturamento.index', {setor: setor.id})}
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
                        <th>Nome</th>
                        <th>Setor</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {consultores.map((dados) => {
                        return (
                            <tr key={dados.id}>
                                <td>
                                    {dados.name}<br/>
                                </td>
                                <td>
                                    {dados.setor}
                                </td>
                                <td className="text-right">
                                    <a href={route('admin.pedidos.relatorios.faturamento.show', {
                                        id: dados.id,
                                        setor: setorAtual
                                    })}
                                       className="btn btn-primary btn-sm">Vendas</a>
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
