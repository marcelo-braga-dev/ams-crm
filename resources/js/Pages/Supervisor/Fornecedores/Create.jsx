import {useForm} from '@inertiajs/react';
import Layout from "@/Layouts/Supervisor/Layout";
import {TextField} from "@mui/material";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

export default function Register() {
    const {data, setData, post, processing, errors} = useForm();

    const submit = (e) => {
        e.preventDefault();
        post(route('supervisor.fornecedores.store'))
    };

    return (
        <Layout container titlePage="Cadastrar Fornecedor" voltar={route('supervisor.fornecedores.index')}>
            {errors.nome && <Alert severity="error" className={"mb-3"}>{errors.empresa}</Alert>}
            {errors.senha && <Alert severity="error" className={"mb-3"}>{errors.senha}</Alert>}
            {errors.email && <Alert severity="error" className={"mb-3"}>{errors.email}</Alert>}

            <form onSubmit={submit}>
                <Typography component="h5">Cadastro de Fornecedores</Typography>
                <div className="row mb-3 mt-3 text-right">
                    <div className="col mb-3">
                        <TextField label="Empresa" required
                                   onChange={e => setData('nome', e.target.value)} fullWidth/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField label="CNPJ"
                                   onChange={e => setData('cnpj', e.target.value)} fullWidth/>
                    </div>
                </div>
                <div className="row mb-3 text-right">
                    <div className="col mb-3">
                        <TextField label="Atendente"
                                   onChange={e => setData('atendente', e.target.value)} fullWidth/>
                    </div>
                    <div className="col mb-3">
                        <TextField label="Telefone"
                                   onChange={e => setData('telefone', e.target.value)} fullWidth/>
                    </div>
                    <div className="col mb-3">
                        <TextField label="Email"
                                   onChange={e => setData('email', e.target.value)} fullWidth/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <TextField label="Anota????es" multiline rows="6" fullWidth
                                   onChange={e => setData('anotacoes', e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3 text-right">
                    <div className='col text-center mt-4'>
                        <button className="btn btn-primary" type='submit'>Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
