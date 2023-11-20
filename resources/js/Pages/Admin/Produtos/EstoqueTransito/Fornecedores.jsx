import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import {router} from "@inertiajs/react";

export default function Create({id, fornecedores, setores, setorAtual}) {

    function abrir(fornecedor) {
        router.get(route('admin.estoque-transito.show', id), {fornecedor: fornecedor})
    }

    return (
        <Layout container titlePage="Fornecedores"
                menu="produtos" submenu="estoque-transito"
                voltar={route('admin.estoque-transito.index', {setor: setorAtual})}>
            {/*Setores*/}
            <div className="row mb-4">
                <h6>Setores</h6>
                <div className="col">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <a type="button"
                           href={route('admin.estoque-transito-fornecedores', {id: id})}
                           className={(!setorAtual ? 'active text-white ' : '') + "btn btn-outline-dark "}>
                            Todos
                        </a>
                        {setores.map((setor, index) => {
                            return (
                                <a type="button" key={index}
                                   href={route('admin.estoque-transito-fornecedores', {id: id, setor: setor.id})}
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
                                    <button className="btn btn-primary btn-sm"
                                            onClick={() => abrir(dados.id)}>Estoque
                                    </button>
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
