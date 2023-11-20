import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import Typography from "@mui/material/Typography";

export default function Index({usuario}) {

    return (<Layout titlePage="Informações do Supervisor" container
                    voltar={route('admin.usuarios.usuario.index')}
                    menu="usuarios" submenu="contas">
        <div className="row p-4 justify-content-between">
            <div className="col">
                <Typography>Nome: {usuario.nome}</Typography>
                <Typography>Email: {usuario.email}</Typography>
                <Typography>Status: {usuario.status}</Typography>
            </div>
            <div className="col-auto text-right">
                <a className="btn btn-primary"
                   href={route('admin.usuarios.supervisores.edit', usuario.id)}>Editar</a>
            </div>
        </div>
    </Layout>);
}
