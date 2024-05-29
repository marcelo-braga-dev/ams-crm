import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from '@inertiajs/react';
import {useState} from "react";
import {FormControlLabel, Switch, TextField} from "@mui/material";
import * as React from "react";

export default function ({funcoes, franquias, setores, permissoes}) {
    const {data, setData} = useForm();
    const [isAdmin, setIsAdmin] = useState();

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.usuarios.usuario.store'), {...data, is_admin: isAdmin});
    };

    return (
        <Layout titlePage="Cadastrar Usuário" menu="usuarios" submenu="usuarios-contas"
                voltar={route('admin.usuarios.usuario.index')}>
            <form onSubmit={submit}>
                <div className="mb-4 card card-body">
                    <div className="row">
                        <div className="mb-4 col-md-4">
                            <TextField label="Nome" fullWidth required
                                       onChange={e => setData('nome', e.target.value)}/>
                        </div>
                        <div className="mb-4 col-md-4">
                            <TextField label="Email" type="email" fullWidth required
                                       onChange={e => setData('email', e.target.value)}/>
                        </div>
                        <div className="mb-4 col-md-4">
                            <TextField label="Senha" type="password" fullWidth required
                                       onChange={e => setData('senha', e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-4 col-md-3">
                            <TextField label="Função" select required fullWidth
                                       defaultValue={data.setor}
                                       onChange={e => setData('funcao', e.target.value)}>
                                {funcoes.map((item) => <MenuItem key={item.id} value={item.id}>{item.nome} {item.admin ? '[ADMIN]' : ''}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="mb-4 col-md-3">
                            <TextField label="Franquia" select required fullWidth
                                       onChange={e => setData('franquia', e.target.value)}>
                                {franquias.map(item => <MenuItem value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="mb-4 col-md-3">
                            <TextField label="Setor" select required fullWidth
                                       defaultValue={data.setor}
                                       onChange={e => setData('setor', e.target.value)}>
                                {setores.map((setor, index) => <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>)}
                            </TextField>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <FormControlLabel label="Usuário do tipo Admin/Gerente" control={
                                <Switch onChange={e => setData('admin', e.target.checked)}/>}/>
                        </div>
                        <div className="col-md-3">
                            <FormControlLabel label="Usuário com função SDR" control={
                                <Switch onChange={e => setData('sdr', e.target.checked)}/>}/>
                        </div>
                        <div className="col-md-3">
                            <FormControlLabel label="Acesso a Dados Financeiros" control={
                                <Switch onChange={e => setData('financeiro', e.target.checked)}/>}/>
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
                                                            <Switch size="small" key={item.id}
                                                                    onChange={e => setData('permissoes', {...data.permissoes, [item.id]: e.target.checked})}/>}/>
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
        </Layout>
    )
}
