import {useForm} from '@inertiajs/react';
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";

export default function Register({setores, franquias}) {
    const {data, setData, post, processing, errors} = useForm({
        nome: '',
        email: '',
        senha: '',
        senha_confirmar: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.usuarios.admins.store'));
    };

    return (
        <Layout titlePage="Cadastrar Admin" container
                voltar={route('admin.usuarios.usuario.index')}
                menu="usuarios" submenu="contas">

            {errors.nome && <Alert severity="error" className={"mb-3"}>{errors.nome}</Alert>}
            {errors.senha && <Alert severity="error" className={"mb-3"}>{errors.senha}</Alert>}
            {errors.email && <Alert severity="error" className={"mb-3"}>{errors.email}</Alert>}
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-md-3 mb-3">
                        <TextField label="Franquia" select required fullWidth
                                   onChange={e => setData('franquia', e.target.value)}>
                            {franquias.map(item => <MenuItem value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
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
                        <TextField label="Nome" id="nome" value={data.nome} required
                                   onChange={e => setData('nome', e.target.value)} fullWidth>
                        </TextField>
                    </div>
                    <div className="col-md-6">
                        <TextField label="Email" id="email" value={data.email} type={'email'} required
                                   onChange={e => setData('email', e.target.value)} fullWidth>
                        </TextField>
                    </div>
                </div>
                <div className="row mb-3 text-right">
                    <div className="col-md-6">
                        <TextField label="Senha" id="senha" type="password" value={data.senha} required
                                   onChange={e => setData('senha', e.target.value)} fullWidth>
                        </TextField>
                    </div>
                    <div className="col-md-6">
                        <TextField label="Confirmar Senha" id="senha_confirmar" type="password"
                                   value={data.senha_confirmar}
                                   onChange={e => setData('senha_confirmar', e.target.value)} required fullWidth>
                        </TextField>
                    </div>
                </div>
                <div className="row mb-3 justify-content-center">
                    <div className="col-auto text-center mt-4">
                        <button className="btn btn-primary" type="submit">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
