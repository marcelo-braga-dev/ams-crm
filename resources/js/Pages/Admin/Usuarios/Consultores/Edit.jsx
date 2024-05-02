import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import { TextField, MenuItem, Card, Checkbox, FormControlLabel } from "@mui/material";
import { router } from '@inertiajs/react'

import menuItems from '@/Layouts/VendedorLayout/menu-items';

export default function Edit({ usuario, franquias, setores, superiores, menus, errors }) {

    const [menuSelecionado, setMenuSelecionado] = useState([])

    const { data, setData, } = useForm({
        nome: usuario.nome,
        email: usuario.email,
        status: usuario.status,
        franquia: usuario.franquia_id,
        setor: usuario.setor_id,
        funcao: usuario.tipo,
        superior: usuario.supervisor_id
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.usuarios.consultores.update', usuario.id), {
            _method: 'put', ...data, menus: menuSelecionado
        })
    };

    const submitSenha = (e) => {
        e.preventDefault();
        router.post(route('admin.usuarios.update-senha', usuario.id), {
            _method: 'put', ...data
        })
    };

    return (
        <Layout errors={errors} titlePage="Atualizar Dados"
            voltar={route('admin.usuarios.consultores.show', usuario.id)}
            menu="usuarios" submenu="contas">

            <form onSubmit={submit}>
                <Card className='p-4 mb-4'>
                    <div className='row justify-content-between'>
                        <div className='col-auto'>
                            <h6>Atualizar dados do usuário</h6>
                        </div>
                        <div className='col-auto'>
                            <button className="btn btn-primary" type="submit">Salvar</button>
                        </div>
                    </div>

                    <div className="mt-4 mb-3 row">
                        <div className="col">
                            <TextField label="Nome" id="nome" value={data.nome} required
                                onChange={e => setData('nome', e.target.value)} fullWidth />
                        </div>
                        <div className="col">
                            <TextField label="Email" id="email" value={data.email} type={'email'} required
                                onChange={e => setData('email', e.target.value)} fullWidth />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-3 col-md-3">
                            <TextField label="Franquia" select required fullWidth
                                defaultValue={data.franquia}
                                onChange={e => setData('franquia', e.target.value)}>
                                {franquias.map(item => <MenuItem value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
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
                        <div className="mb-3 col-md-3">
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
                        <div className="mb-3 col-md-3">
                            <TextField label="Função" select required fullWidth
                                defaultValue={data.funcao}
                                onChange={e => setData('funcao', e.target.value)}>
                                <MenuItem value="consultor">Consultor</MenuItem>
                                <MenuItem value="supervisor">Supervisor</MenuItem>
                                <MenuItem value="admin">Admin</MenuItem>
                            </TextField>
                        </div>
                        {data.funcao === 'consultor' &&
                            <div className="mb-3 col-md-3">
                                <TextField label="Supervisor" select required fullWidth
                                    defaultValue={data.superior}
                                    onChange={e => setData('superior', e.target.value)}>
                                    {superiores.map((item, index) => {
                                        return (item.id !== usuario.id &&
                                            <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                        )
                                    })}
                                </TextField>
                            </div>
                        }
                        <div className="mb-3 col-md-3">
                            <TextField type="file" label="Foto"
                                inputProps={{ accept: 'image/*' }} InputLabelProps={{ shrink: true }}
                                onChange={e => setData('foto', e.target.files[0])} />
                        </div>
                    </div>
                </Card>


                {/* <Card className='p-4 mb-4'>
                    <h6>Permissões de Acesso</h6>
                    <div className='row row-cols-5'>
                        {menuItems.items.map(menu => {
                            return <div className='col'>
                                <Card className='p-3 mb-2'>
                                    <span className='ps-0'>{menu.title}<br /></span>
                                    {menu.children.map(submenu => {
                                        // <span className='ps-5'>{submenu.id}{console.log(item)}<br /></span>
                                        return <FormControlLabel
                                            label={submenu.title} className='ps-3 d-block'
                                            control={<Checkbox
                                                value={submenu.id}
                                                defaultChecked={menus?.[submenu.id] == 1}
                                                onChange={e => setMenuSelecionado({ ...menuSelecionado, [e.target.value]: e.target.checked })}
                                            />
                                            }
                                        />
                                    })}
                                </Card>
                            </div>
                        })} */}


                {/* {menuItems.items.map(menu => {
                            return menu.children.map(item => {
                                return <div className='col'>
                                    <Card className='p-3 mb-2'>
                                        <span className='ps-0'>{item.title}<br /></span>
                                        {item.submenu.map(submenu => {
                                            // <span className='ps-5'>{submenu.id}{console.log(item)}<br /></span>
                                            return <FormControlLabel
                                                label={submenu.title} className='ps-3 d-block'
                                                control={<Checkbox
                                                    value={submenu.id}
                                                    defaultChecked={menus?.[submenu.id] == 1}
                                                    onChange={e => setMenuSelecionado({ ...menuSelecionado, [e.target.value]: e.target.checked })}
                                                />
                                                }
                                            />
                                        })}
                                    </Card>
                                </div>
                            })
                        })} */}

                {/* </div> */}
                {/* </Card> */}
            </form>

            <Card className="p-3 mb-4">
                <form onSubmit={submitSenha}>
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
                            <button className="mt-2 btn btn-primary" type="submit">Atualizar Senha</button>
                        </div>
                    </div>
                </form>
            </Card>
        </Layout>);
}
