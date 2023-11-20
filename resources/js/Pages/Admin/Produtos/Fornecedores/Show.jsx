import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import React, {useState} from "react";
import {router} from "@inertiajs/react";

export default function ({produtos, fornecedor}) {
    const [idExcluir, setIdExcluir] = useState(null);

    function excluir(id) {
        setIdExcluir(id)
    }

    function deletar() {
        router.post(route('admin.produtos-fornecedores.destroy', idExcluir), {
            '_method': 'DELETE'
        })
    }

    function mensagemexcluir() {
        const nome = produtos[produtos.findIndex(i => i.id === idExcluir)]?.nome;
        return '#' + idExcluir + ' - ' + nome
    }

    return (
        <Layout container titlePage="Produtos do Fornecedor" menu="produtos" submenu="todos-produtos"
                voltar={route('admin.produtos-fornecedores.index')}>

            <div className="row justify-content-between mb-3 px-4">
                <div className="col-auto">
                    <span>Fornecedor:</span>
                    <h6>{fornecedor.nome}</h6>
                </div>
                <div className="col-auto">
                    <a href={route('admin.produtos-fornecedores.create', {fornecedor: fornecedor.id})}
                       className="btn btn-warning btn-sm">Cadastrar</a>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-sm text-sm">
                    <thead>
                    <tr className="text-sm">
                        <th></th>
                        <th>Nome</th>
                        <th>Preços</th>
                        <th>Unidade</th>
                        <th>Categoria</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {produtos.map((dado, index) => {
                        return (
                            <tr key={index}>
                                <td>
                                    {dado.foto && <img src={dado.foto} width="80" alt="foto"/>}
                                </td>
                                <td className="text-wrap">
                                    {dado.nome}<br/>
                                    <small>ID: #{dado.id}</small>
                                </td>
                                <td>
                                    Venda: R$ {dado.preco_venda}<br/>
                                    Forn.: R$ {dado.preco_fornecedor}
                                </td>
                                <td className="text-center">{dado.unidade}</td>
                                <td className="text-wrap">{dado.categoria}</td>
                                <td>
                                    <a href={route('admin.produtos-fornecedores.edit', dado.id)}
                                       className="btn btn-primary btn-sm me-2">Editar</a>
                                    <button type="button" className="btn btn-link btn-sm text-danger px-3"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalExcluir"
                                            onClick={() => excluir(dado.id)}>
                                        <i className="fas fa-trash"/>
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            {/*Modal*/}
            <div className="modal fade" id="modalExcluir" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Produto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja deletar o produto?<br/>
                            <h6>{mensagemexcluir()}</h6>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => deletar()}>Deletar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
