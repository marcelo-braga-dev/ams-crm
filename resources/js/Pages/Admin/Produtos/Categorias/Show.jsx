import Layout from "@/Layouts/Admin/Layout";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";

export default function ({categorias, fornecedor}) {
    const {post, data, setData, reset} = useForm({
        fornecedor: fornecedor.id
    })

    function submit(e) {
        e.preventDefault()
        post(route('admin.produtos-categorias.store'))
        window.location.reload()
    }

    return (
        <Layout titlePage="Categorias Produtos" container menu="produtos" submenu="categorias"
                voltar={route('admin.produtos-categorias.index')}>
            <div className="row justify-content-between mb-4">
                <div className="col-auto">
                    <span>Fornecedor:</span>
                    <h6>{fornecedor.nome}</h6>
                </div>
            </div>
            <div className="table-responsive mb-4">
                <table className="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome da Categoria</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categorias.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>#{item.id}</td>
                                <td>{item.nome}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <form onSubmit={submit}>
                <h6>Adicionar Categoria</h6>
                <div className="row">
                    <div className="col-auto">
                        <TextField size="small" required
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>
                    <div className="col-auto">
                        <button type="submit" className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
