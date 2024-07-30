import Layout from "@/Layouts/Layout";
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from '@inertiajs/react';
import {useState} from "react";
import {FormControlLabel, Switch, TextField, Typography} from "@mui/material";
import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {Person, List, ChevronRight} from "react-bootstrap-icons";

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
                <CardContainer>
                    <CardTitle title="Dados do Usuário" icon={<Person size={22}/>}/>
                    <CardBody>
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
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardTitle title="Funções" icon={<List size={22}/>}/>
                    <CardBody>
                        <div className="row">
                            <div className="mb-4 col">
                                {permissoes?.map(categorias => {
                                    return (
                                        <CardContainer key={categorias.categoria}>
                                            <CardBody>
                                                <Typography><ChevronRight size={10}/> <b>{categorias.categoria}</b></Typography>
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
                                            </CardBody>
                                        </CardContainer>
                                    )
                                })}
                            </div>
                        </div>

                    </CardBody>
                </CardContainer>


                <div className="row">
                    <div className="col-md-4">
                        <button className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
