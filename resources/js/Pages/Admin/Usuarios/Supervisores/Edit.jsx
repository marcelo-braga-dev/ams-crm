import {useForm} from '@inertiajs/react';
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {router} from '@inertiajs/react'

export default function Edit({usuario, setores, errors}) {
    const {data, setData,} = useForm({
        nome: usuario.nome,
        email: usuario.email,
        status: usuario.status,
        setor: usuario.setor,
        funcao: usuario.tipo
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.usuarios.supervisores.update', usuario.id), {
            _method: 'put', ...data
        })
    };

    const submitSenha = (e) => {
        e.preventDefault();
        router.post(route('admin.usuarios.update-senha', usuario.id), {
            _method: 'put', ...data
        })
    };

    return (
        <Layout container errors={errors} titlePage="Atualizar Dados do Supervisor"
                voltar={route('admin.usuarios.supervisores.show', usuario.id)}
                menu="usuarios" submenu="contas">

            <form onSubmit={submit} className="border-bottom">
                <h6>Atualizar dados do usuário</h6>
                <div className="row mb-3 mt-4">
                    <div className="col">
                        <TextField label="Nome" id="nome" value={data.nome} required
                                   onChange={e => setData('nome', e.target.value)} fullWidth/>
                    </div>
                    <div className="col">
                        <TextField label="Email" id="email" value={data.email} type={'email'} required
                                   onChange={e => setData('email', e.target.value)} fullWidth/>
                    </div>
                    <div className="col">
                        <TextField
                            select label="Status" defaultValue={data.status}
                            helperText="Status de acesso do usuário"
                            onChange={e => setData('status', e.target.value)}>
                            <MenuItem value="ativo">
                                Ativo
                            </MenuItem>
                            <MenuItem value="bloqueado">
                                Bloqueado
                            </MenuItem>
                        </TextField>
                    </div>
                </div>
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
                    <div className="col-md-4">
                        <TextField label="Função" select required fullWidth
                                   defaultValue={data.funcao}
                                   onChange={e => setData('funcao', e.target.value)}>
                            <MenuItem value="consultor">Consultor</MenuItem>
                            <MenuItem value="supervisor">Supervisor</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-md-4">
                        <TextField type="file" label="Foto"
                                   inputProps={{accept: 'image/*'}}  InputLabelProps={{shrink: true}}
                                   onChange={e => setData('foto', e.target.files[0])}/>
                    </div>
                </div>
                <div className="row mb-3 text-right">
                    <div className={'text-center mt-4'}>
                        <button className="btn btn-primary" type="submit">Salvar</button>
                    </div>
                </div>
            </form>

            <hr/>
            <form onSubmit={submitSenha}>
                <h6>Alterar Senha</h6>
                <div className="row">
                    <div className="col">
                        <TextField label="Nova Senha" type="password" fullWidth required
                                   onChange={e => setData('nova_senha', e.target.value)}/>
                    </div>
                    <div className="col">
                        <TextField label="Confirmar Nova Senha" type="password" fullWidth required
                                   onChange={e => setData('confirmar_senha', e.target.value)}/>
                    </div>
                    <div className="col">
                        <button className="btn btn-primary mt-2" type="submit">Atualizar</button>
                    </div>
                </div>
            </form>
        </Layout>);
}
