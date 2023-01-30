import {useForm} from '@inertiajs/react';
import Layout from "@/Layouts/Admin/Layout";
import {TextField} from "@mui/material";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

export default function Show({dados}) {

    return (<Layout titlePage="Cadastrar Fornecedor" button={true} url={route('admin.fornecedores.index')}
                    textButton={'Voltar'}>

        <div className="container bg-white px-lg-6 py-lg-5 rounded">
            <div className="row">
                <div className="col">
                    <Typography variant="h5" component="h3">Informações do Fornecedor</Typography></div>
                <div className="col text-right">
                    <a className="btn btn-primary" href={route('admin.fornecedores.edit', dados.id)}>Editar</a>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Typography><b>Empresa:</b> {dados.nome}</Typography>
                    <Typography><b>CNPJ:</b> {dados.cnpj}</Typography>
                    <Typography><b>Atendente:</b> {dados.atendente}</Typography>
                    <Typography><b>Telefone:</b> {dados.telefone}</Typography>
                    <Typography><b>Email:</b> {dados.email}</Typography>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <Typography><b>Anotações:</b> {dados.anotacoes}</Typography>
                </div>
            </div>

        </div>
    </Layout>);
}
