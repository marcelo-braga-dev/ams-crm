import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import MenuItem from "@mui/material/MenuItem";
import { router, useForm } from '@inertiajs/react';
import { useState } from "react";
import { FormControlLabel, Switch, TextField } from "@mui/material";

export default function ({ usuario, funcoes, franquias, setores, permissoes, permissoesUsuario }) {
    const { data, setData } = useForm({
        nome: usuario.nome,
        email: usuario.email,
        funcao: usuario.funcao_id,//
        franquia: usuario.franquia_id,
        setor: usuario.setor_id,
        //financeiro: usuario.,
        permissoes: permissoesUsuario,
        admin: usuario.is_admin
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.usuarios.usuario.update', usuario.id), { ...data, _method: 'PUT' });
    };

    return (
        <Layout titlePage="Editar Usuário" menu="usuarios" submenu="usuarios-contas"
            voltar={route('admin.usuarios.usuario.index')}>
            <form onSubmit={submit}>
                <div className="mb-4 card card-body">
                    <div className="row">
                        <div className="mb-4 col-md-4">
                            <TextField label="Nome" fullWidth required defaultValue={data.nome}
                                onChange={e => setData('nome', e.target.value)} />
                        </div>
                        <div className="mb-4 col-md-4">
                            <TextField label="Email" type="email" fullWidth required defaultValue={data.email}
                                onChange={e => setData('email', e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-4 col-md-3">
                            <TextField label="Função" select required fullWidth
                                defaultValue={data.funcao}
                                onChange={e => setData('funcao', e.target.value)}>
                                {funcoes.map((item) => <MenuItem key={item.id} value={item.id}>{item.nome} {item.admin ? '[ADMIN]' : ''}</MenuItem>)}
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
                                {setores.map(setor => <MenuItem key={setor.id} value={setor.id}>{setor.nome}</MenuItem>)}
                            </TextField>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-4 col-md-2">
                            <TextField label="Função Admin/Gerente" select required fullWidth
                                defaultValue={data.admin}
                                onChange={e => setData('admin', e.target.value)}>
                                <MenuItem value="0" >Não</MenuItem>
                                <MenuItem value="1" >Sim</MenuItem>
                            </TextField>
                        </div>
                        <div className="mb-4 col-md-2">
                            <TextField label="Função Financeiro" select required fullWidth
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
                                                        <FormControlLabel label={item.nome} control={
                                                            <Switch defaultChecked={permissoesUsuario[item.id] > 0} size="small" key={item.id} onChange={e => setData('permissoes', { ...data.permissoes, [item.id]: e.target.checked })} />} />
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

                <div className="row">
                    <div className="col-md-4">
                        <button className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout >
    )
}