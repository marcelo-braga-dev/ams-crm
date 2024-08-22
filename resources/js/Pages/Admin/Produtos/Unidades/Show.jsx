import Layout from "@/Layouts/Layout";
import {TextField} from "@mui/material";
import {router, useForm} from "@inertiajs/react";

export default function ({categoria}) {
    const {post, data, setData, reset} = useForm({})

    const excluirCategoria = () => {
        router.post(route('admin.produtos-categorias.destroy', categoria.id), {
            _method: 'DELETE'
        })
    }

    return (
        <Layout titlePage="Categoria de Produto" container menu="produtos" submenu="produtos-unidades"
                voltar={route('admin.produtos-categorias.index')}>

            <div className="row">
                <div className="col">
                    <b>Nome da Categoria:</b> {categoria.nome}
                </div>
                <div className="col-auto">
                    <i className="fas fa-trash text-danger px-3 cursor-pointer"
                       data-bs-toggle="modal" data-bs-target="#modalExcluir"></i>
                </div>
            </div>

            <div className="modal fade mt-5" id="modalExcluir" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Categoria</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Confirmar exclusão da categoria.
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => excluirCategoria()}>Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
