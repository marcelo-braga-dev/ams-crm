import {useForm} from '@inertiajs/react';
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";

export default function Register({setores, franquias}) {
    const {data, setData, post, processing, errors} = useForm();

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.fornecedores.store'))
    };

    return (
        <Layout container titlePage="Cadastrar Fornecedor" voltar={route('admin.fornecedores.index')}
                menu="config" submenu="config-fornecedores">
            {errors.nome && <Alert severity="error" className={"mb-3"}>{errors.empresa}</Alert>}
            {errors.senha && <Alert severity="error" className={"mb-3"}>{errors.senha}</Alert>}
            {errors.email && <Alert severity="error" className={"mb-3"}>{errors.email}</Alert>}

            <form onSubmit={submit}>
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
                    <div className="col-md-3 mb-3">
                        <TextField label="Franquia" select required fullWidth
                                   onChange={e => setData('franquia', e.target.value)}>
                            {franquias.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField label="Setor" select required fullWidth
                        onChange={e => setData('setor', e.target.value)}>
                            {setores.map((setor, index) => {
                                return (
                                    <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                                )
                            })}
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <TextField label="Anotações" multiline rows="6" fullWidth
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
