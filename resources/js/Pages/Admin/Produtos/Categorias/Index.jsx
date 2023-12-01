import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useForm} from "@inertiajs/react";

export default function Create({categorias, setores, setorAtual}) {

    const {data, setData, post} = useForm()

    const cadastrarCategoria = (e) => {
        e.preventDefault()
        post(route('admin.produtos-categorias.store'))
        window.location.reload()
    }

    return (
        <Layout container titlePage="Categorias por Fornecedores"
                menu="produtos" submenu="categorias">
            {/*Setores*/}
            <div className="row">
                <h6>Setores</h6>
                <div className="col mb-2">
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <a type="button"
                           href={route('admin.produtos-categorias.index')}
                           className={(!setorAtual ? 'active text-white ' : '') + "btn btn-outline-dark "}>
                            Todos
                        </a>
                        {setores.map((setor, index) => {
                            return (
                                <a type="button" key={index}
                                   href={route('admin.produtos-categorias.index', {setor: setor.id})}
                                   className={(setor.id == setorAtual ? 'active text-white ' : '') + "btn btn-outline-dark "}>
                                    {setor.nome}
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-auto">
                    <button className="btn btn-warning" type="button"
                            data-bs-toggle="modal" data-bs-target="#cadastrarCategoria">
                        Cadastrar Categoria
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th>Categorias</th>
                        <th>Setor</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {categorias.map((dados) => {
                        return (
                            <tr key={dados.id}>
                                <td className="text-center">
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
                                       className="btn btn-primary btn-sm">Ver</a>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>

            {/*Cadastrar Categoria*/}
            <div className="modal fade mt-5" id="cadastrarCategoria" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Cadastrar Categoria</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form onSubmit={cadastrarCategoria}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col mb-4">
                                        <TextField label="Nome da categoria" fullWidth required
                                                   onChange={e => setData('nome', e.target.value)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <TextField label="Setor" select required fullWidth defaultValue=""
                                                   onChange={e => setData('setor', e.target.value)}>
                                            {setores.map((setor, index) => {
                                                return (
                                                    <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                                                )
                                            })}
                                        </TextField>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Fechar
                                </button>
                                <button type="submit" className="btn btn-success" data-bs-dismiss="modal">
                                    Cadastrar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
