import Layout from '@/Layouts/Supervisor/Layout';

import {Typography} from "@mui/material";

export default function Create({fornecedores}) {

    return (
        <Layout titlePage="Fornecedores" container menu="fornecedores" submenu="fornecedores">
            <div className="row">
                <div className="col mb-4">
                    <Typography className="mb-3" variant="h6">Fornecedores Cadastrados</Typography>
                </div>
                <div className="col text-right">
                    <a href={route('supervisor.fornecedores.create')} className="btn btn-primary">
                        Cadastrar Fornecedores</a>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fornecedor</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {fornecedores.map((dados) => {
                        return (
                            <tr key={dados.id}>
                                <td>
                                    {dados.id}
                                </td>
                                <td>
                                    {dados.nome}
                                </td>
                                <td className="text-right">
                                    <a href={route('supervisor.fornecedores.show', dados.id)}
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
