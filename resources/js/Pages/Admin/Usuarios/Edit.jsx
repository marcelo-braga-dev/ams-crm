import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from '@inertiajs/react';
import {useState} from "react";
import {Avatar, Checkbox, FormControlLabel, Stack, Switch, TextField} from "@mui/material";
import * as React from "react";

export default function ({
                             usuario,
                             usuarios,
                             supervisionados,
                             funcoes,
                             franquias,
                             setores,
                             permissoes,
                             permissoesUsuario
                         }) {
    const [usuarioAtivos, setUsuarioAtivos] = useState(false)

    const {data, setData} = useForm({
        nome: usuario.nome,
        email: usuario.email,
        funcao: usuario.funcao_id,
        franquia: usuario.franquia_id,
        setor: usuario.setor_id,
        financeiro: usuario.financeiro,
        permissoes: permissoesUsuario,
        admin: usuario.is_admin,
        admin_completo: usuario.admin_completo,
        supervisionados: supervisionados,
        status: usuario.status,
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.usuarios.usuario.update', usuario.id), {...data, _method: 'PUT'});
    };

    return (
        <Layout titlePage="Editar Usuário" menu="usuarios" submenu="usuarios-contas"
                voltar={route('admin.usuarios.usuario.index')}>
            <form onSubmit={submit}>
                <div className="mb-4 card card-body">
                    <div className="row">
                        <div className="mb-4 col-md-4">
                            <TextField label="Nome" fullWidth required defaultValue={data.nome}
                                       onChange={e => setData('nome', e.target.value)}/>
                        </div>
                        <div className="mb-4 col-md-4">
                            <TextField label="Email" type="email" fullWidth required defaultValue={data.email}
                                       onChange={e => setData('email', e.target.value)}/>
                        </div>
                        <div className="col-md-2">
                            <TextField label="Status" select required fullWidth
                                       defaultValue={data.status}
                                       onChange={e => setData('status', e.target.value)}>
                                <MenuItem value="1">Ativo</MenuItem>
                                <MenuItem value="0">Bloqueado</MenuItem>
                            </TextField>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-4 col-md-3">
                            <TextField label="Função" select required fullWidth
                                       defaultValue={data.funcao}
                                       onChange={e => setData('funcao', e.target.value)}>
                                {funcoes.map((item) => <MenuItem key={item.id}
                                                                 value={item.id}>{item.nome} {item.admin ? '[ADMIN]' : ''}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="mb-4 col-md-3">
                            <TextField label="Franquia" select required fullWidth
                                       defaultValue={data.franquia}
                                       onChange={e => setData('franquia', e.target.value)}>
                                {franquias.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="mb-4 col-md-3">
                            <TextField label="Setor" select required fullWidth
                                       defaultValue={data.setor}
                                       onChange={e => setData('setor', e.target.value)}>
                                {setores.map(setor => <MenuItem key={setor.id}
                                                                value={setor.id}>{setor.nome}</MenuItem>)}
                            </TextField>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-4 col-md-2">
                            <TextField label="Função Admin/Gerente" select required fullWidth
                                       defaultValue={data.admin}
                                       onChange={e => setData('admin', e.target.value)}>
                                <MenuItem value="0">Não</MenuItem>
                                <MenuItem value="1">Sim</MenuItem>
                            </TextField>
                        </div>
                        <div className="mb-4 col-md-2">
                            <TextField label="Acesso a Dados Financeiros" select required fullWidth
                                       defaultValue={data.financeiro}
                                       onChange={e => setData('financeiro', e.target.value)}>
                                <MenuItem value="0">Não</MenuItem>
                                <MenuItem value="1">Sim</MenuItem>
                            </TextField>
                        </div>
                    </div>
                </div>

                <div className="mb-4 card card-body">
                    <span>Funções</span>
                    <div className="row">
                        <div className="mb-4 col">
                            {permissoes?.map(categorias => {
                                return (
                                    <div key={categorias.categoria} className="mb-2 border-bottom">
                                        <div className="">
                                            <small className="d-block">{categorias.categoria}</small>
                                        </div>
                                        <div className="row row-cols-5">
                                            {categorias?.permissoes?.map(item => {
                                                return (
                                                    <div key={item.id} className="col">
                                                        <FormControlLabel label={<small>{item.nome}</small>} control={
                                                            <Switch defaultChecked={permissoesUsuario[item.id] > 0}
                                                                    size="small" key={item.id}
                                                                    onChange={e => setData('permissoes', {
                                                                        ...data.permissoes,
                                                                        [item.id]: e.target.checked
                                                                    })}/>}/>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="mb-4 card card-body">
                    <div className="row justify-content-between">
                        <div className="col"><h6>Supervisonados</h6></div>
                        <div className="col-auto">
                            <FormControlLabel control={
                                <Switch
                                    // defaultChecked
                                    onChange={e => setUsuarioAtivos(e.target.checked)}/>}
                                              label="Ver Bloqueados"/>
                        </div>
                    </div>

                    <div className="row row-cols-4">
                        {usuarios.map(item =>
                            (item.status === '1' || usuarioAtivos) &&
                            <div key={item.id} className="mb-2 col">
                                <div className="p-1 card card-body">
                                    <Stack direction="row" spacing="3" className="pt-2">
                                        <div>
                                            <Checkbox
                                                defaultChecked={supervisionados?.[item.id] > 0}
                                                onChange={e => setData('supervisionados', {
                                                    ...data.supervisionados,
                                                    [item.id]: e.target.checked
                                                })}/>
                                        </div>
                                        <div className="me-2"><Avatar src={item.foto}/></div>
                                        <div>
                                            <span><b>{item.nome}</b></span><br/>
                                            <small>{item.funcao}</small><br/>
                                            <small>{item.setor_nome}</small><br/>
                                        </div>
                                    </Stack>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <button className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
