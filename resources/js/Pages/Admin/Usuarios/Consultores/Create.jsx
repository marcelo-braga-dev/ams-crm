import {Head, Link, useForm} from '@inertiajs/react';
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";

export default function Register({setores}) {
    const {data, setData, post, errors} = useForm();

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.usuarios.consultores.store'));
    };

    return (
        <Layout container titlePage="Cadastrar Consultor" voltar={route('admin.usuarios.usuario.index')}
                menu="usuarios" submenu="contas">

            {errors.nome && <Alert severity="error" className={"mb-3"}>{errors.nome}</Alert>}
            {errors.senha && <Alert severity="error" className={"mb-3"}>{errors.senha}</Alert>}
            {errors.email && <Alert severity="error" className={"mb-3"}>{errors.email}</Alert>}
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-md-4">
                        {/*Setores*/}
                        <TextField label="Setor" select required fullWidth
                                   defaultValue={data.setor}
                                   onChange={e => setData('setor', e.target.value)}>
                            {setores.map((setor, index) => {
                                return (
                                    <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                                )
                            })}
                        </TextField>
                    </div>
                </div>
                <div className="row mb-3 mt-3 text-right">
                    <div className="col-md-6">
                        <TextField label="Nome" id="nome" required
                                   onChange={e => setData('nome', e.target.value)} fullWidth />
                    </div>
                    <div  className="col-md-6">
                        <TextField label="Email" id="email" type={'email'} required
                                   onChange={e => setData('email', e.target.value)} fullWidth />
                    </div>
                </div>
                <div className="row mb-3 text-right">
                    <div className="col-md-6">
                        <TextField label="Senha" id="senha" type="password" required
                                   onChange={e => setData('senha', e.target.value)} fullWidth />
                    </div>
                    <div className="col-md-6">
                        <TextField label="Confirmar Senha" id="senha_confirmar" type="password"
                                   onChange={e => setData('senha_confirmar', e.target.value)} required fullWidth />
                    </div>
                </div>
                <div className="row mb-3 text-right">
                    <div className='col text-center mt-4'>
                        <button className="btn btn-primary" type="submit">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>);
}
