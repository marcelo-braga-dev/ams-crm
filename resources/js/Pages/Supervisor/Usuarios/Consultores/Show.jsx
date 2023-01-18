import Layout from '@/Layouts/Supervisor/Layout';
import Typography from "@mui/material/Typography";

export default function Index({usuario, pedidos}) {

    return (<Layout titlePage="Informações do Consultor" button={true} url={route('supervisor.usuarios.usuario.index')}
                    textButton={'Voltar'}>

        <div className="container bg-white px-lg-6 py-lg-5 rounded">
            <div className="row mb-3">
                <div className="col">
                    <Typography>Nome: {usuario.nome}</Typography>
                    <Typography>Email: {usuario.email}</Typography>
                    <Typography>Status: {usuario.status}</Typography>
                </div>
                <div className="col text-right">
                    <a className="btn btn-primary"
                       href={route('supervisor.usuarios.consultores.edit', usuario.id)}>Editar</a>
                </div>
            </div>
        </div>
        <div className="container bg-white px-lg-6 py-lg-5 rounded mt-4">
            <Typography variant={"h6"}>Histórico de Pedidos</Typography>
            <table className="hover responsive" style={{width: '100%'}}>
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>Cliente</th>
                    <th>Status</th>
                    <th>Data cadastro</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {pedidos.map((dados) => {
                    return (
                        <tr key={dados.id} className={"align-middle"}>
                            <th scope="row">
                                {dados.id}
                            </th>
                            <td>
                                {dados.cliente}
                            </td>
                            <td>
                                {dados.status}
                            </td>
                            <td>
                                {dados.data}
                            </td>
                            <td>
                                <a className="btn btn-primary btn-sm" href={route('supervisor.pedidos.show', 1)}>Ver</a>
                            </td>
                        </tr>)
                })}
                </tbody>
            </table>
        </div>
    </Layout>);
}
