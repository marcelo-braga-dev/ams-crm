import Layout from '@/Layouts/Consultor/Layout';

import {Typography} from "@mui/material";
import {Table} from "reactstrap";

export default function Create({integradores}) {

    return (
        <Layout titlePage="Integradores">

            <div className="container bg-white px-3 px-md-6 py-4 mb-4">
                <div className="row">
                    <div className="col mb-4">
                        <Typography className="mb-3" variant="h6">Integradores Cadastrados</Typography>
                    </div>
                    <div className="col text-right">
                        <a href={route('consultor.integradores.create')} className="btn btn-primary">
                            Cadastrar Integrador</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-3 p-3 shadow rounded">
                        <table className="table" width="100%">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Integrador</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {integradores.map((dados) => {
                                return (<tr key={dados.id}>
                                    <td>
                                        {dados.id}
                                    </td>
                                    <td>
                                        {dados.nome}
                                    </td>
                                    <td className="text-right">
                                        <a href={route('consultor.integradores.show', dados.id)}
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
