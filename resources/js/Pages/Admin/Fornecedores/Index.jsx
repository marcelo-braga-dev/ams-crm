import Layout from '@/Layouts/Admin/Layout';

import {Typography} from "@mui/material";

export default function Create({fornecedores}) {

    return (
        <Layout titlePage="Fornecedores">

            <div className="container bg-white px-3 px-md-6 py-4 mb-4">
                <div className="row">
                    <div className="col mb-4">
                        <Typography className="mb-3" variant="h6">Fornecedores Cadastrados</Typography>
                    </div>
                    <div className="col text-right">
                        <a href={route('admin.fornecedores.create')} className="btn btn-primary">
                            Cadastrar Fornecedores</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3 p-3 shadow rounded">
                        <table width="100%">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fornecedor</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {fornecedores.map((dados) => {
                                return (<tr key={dados.id}>
                                    <td>
                                        {dados.id}
                                    </td>
                                    <td>
                                        {dados.nome}
                                    </td>
                                    <td className="text-right">
                                        <a href={route('admin.fornecedores.show', dados.id)}
                                            className="btn btn-primary btn-sm">Ver</a>
                                    </td>
                                </tr>)
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </Layout>
    )
}
