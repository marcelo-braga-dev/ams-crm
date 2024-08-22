import Layout from '@/Layouts/Layout';
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";

export default function Create({unidades}) {

    const {data, setData, post} = useForm()

    const cadastrarCategoria = (e) => {
        e.preventDefault()
        post(route('admin.produtos-unidades.store'))
        window.location.reload()
    }

    return (
        <Layout container titlePage="Unidades de Medidas dos Produtos"
                menu="produtos" submenu="produtos-unidades">
            {/*Setores*/}
            <div className="row">
                <div className="col-auto">
                    <button className="btn btn-warning" type="button"
                            data-bs-toggle="modal" data-bs-target="#cadastrarCategoria">
                        Cadastrar Unidade
                    </button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-hover text-center">
                    <thead>
                    <tr>
                        <th className="col-1">Unidades</th>
                    </tr>
                    </thead>
                    <tbody>
                    {unidades.map((dados) => {
                        return (
                            <tr key={dados.id}>
                                <td className="text-center">
                                    {dados.valor} {dados.nome}
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
                            <h5 className="modal-title" id="exampleModalLabel">Cadastrar Unidade de Medida</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form onSubmit={cadastrarCategoria}>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col mb-4">
                                        <TextField label="Valor" fullWidth type="number"
                                                   InputLabelProps={{shrink: true}} inputProps={{step: 0.001}} placeholder="0,500; 1; 20, ..."
                                                   onChange={e => setData('valor', e.target.value)}/>
                                    </div>
                                    <div className="col mb-4">
                                        <TextField label="Nome da unidade" fullWidth required
                                                   placeholder="kg, g, litros, ..."
                                                   InputLabelProps={{shrink: true}}
                                                   onChange={e => setData('nome', e.target.value)}/>
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
