import Layout from "@/Layouts/Layout";
import { router, useForm } from '@inertiajs/react';
import { Avatar, Checkbox, FormControlLabel, Stack, Switch, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function Edit({ usuario, usuarios, supervionados, setores, errors }) {
    const { data, setData, } = useForm({
        nome: usuario.nome,
        email: usuario.email,
        status: usuario.status,
        setor: usuario.setor_id,
        funcao: usuario.tipo,
        supervisionados: supervionados
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

            <form onSubmit={submit}>
                <div className="mb-4 card card-body">
                    <div className="row justify-content-between">
                        <div className="col-auto"><h6>Atualizar dados do usuário</h6></div>
                        <div className="col-auto"> <button className="btn btn-success" type="submit">Salvar</button></div>
                    </div>

                    <div className="mb-3 row">
                        <div className="col">
                            <TextField label="Nome" id="nome" value={data.nome} required
                                onChange={e => setData('nome', e.target.value)} fullWidth />
                        </div>
                        <div className="col">
                            <TextField label="Email" id="email" value={data.email} type={'email'} required
                                onChange={e => setData('email', e.target.value)} fullWidth />
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
                                inputProps={{ accept: 'image/*' }} InputLabelProps={{ shrink: true }}
                                onChange={e => setData('foto', e.target.files[0])} />
                        </div>
                    </div>
                </div>

                <div className="card card-body">
                    <h6>Supervisonados</h6>
                    <div className="row row-cols-4">
                        {usuarios.map(item => (
                            <div key={item.id} className="mb-2 col">
                                <div className="px-1 card card-body">
                                    <Stack direction="row" spacing="3">
                                        <div>
                                            <Checkbox
                                                defaultChecked={supervionados?.[item.id] > 0}
                                                onChange={e => setData('supervisionados', { ...data.supervisionados, [item.id]: e.target.checked })} />
                                        </div>
                                        <div className="me-2"><Avatar src={item.foto} /></div>
                                        <div>

                                            <span><b>{item.nome}</b></span><br />
                                            <small>{item.setor_nome}</small><br />
                                            <small>{item.funcao}</small><br />
                                        </div>
                                    </Stack>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </form>

            <form onSubmit={submitSenha}>
                <div className="mt-4 card card-body">
                    <h6>Alterar Senha</h6>
                    <div className="row">
                        <div className="col">
                            <TextField label="Nova Senha" type="password" fullWidth required
                                onChange={e => setData('nova_senha', e.target.value)} />
                        </div>
                        <div className="col">
                            <TextField label="Confirmar Nova Senha" type="password" fullWidth required
                                onChange={e => setData('confirmar_senha', e.target.value)} />
                        </div>
                        <div className="col">
                            <button className="mt-2 btn btn-primary" type="submit">Atualizar</button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
