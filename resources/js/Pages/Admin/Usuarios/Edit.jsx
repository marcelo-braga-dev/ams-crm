import Layout from "@/Layouts/Layout";
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from '@inertiajs/react';
import {useState} from "react";
import {Avatar, Checkbox, FormControlLabel, Stack, Switch, TextField} from "@mui/material";
import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import {CardChecklist, People, Person} from "react-bootstrap-icons";

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
        sdr: usuario.is_sdr,
        admin_completo: usuario.admin_completo,
        supervisionados: supervisionados,
        status: usuario.status,
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.usuarios.usuario.update', usuario.id), {...data, _method: 'PUT'});
    };

    return (
        <Layout empty titlePage="Editar Usuário" menu="usuarios" submenu="usuarios-contas"
                voltar={route('admin.usuarios.usuario.index')}>
            <form onSubmit={submit}>
                <CardContainer>
                    <CardTitle title="Dados do Usuário" icon={<Person size={22}/>}/>
                    <CardBody>
                        <div className="row">
                            <div className="mb-4 col-md-4">
                                <TextField label="Nome" fullWidth required defaultValue={data.nome}
                                           onChange={e => setData('nome', e.target.value)}/>
                            </div>
                            <div className="mb-4 col-md-4">
                                <TextField label="Email" type="email" fullWidth required defaultValue={data.email}
                                           onChange={e => setData('email', e.target.value)}/>
                            </div>
                            <div className="col-md-3">
                                <FormControlLabel label={data.status ? 'Usuário Ativo' : 'Usuário Bloqueado'} control={
                                    <Switch defaultChecked={data.status} onChange={e => setData('status', e.target.checked)}/>}/>
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
                            <div className="col-md-3">
                                <FormControlLabel label="Usuário do tipo Admin/Gerente" control={
                                    <Switch defaultChecked={data.admin} onChange={e => setData('admin', e.target.checked)}/>}/>
                            </div>
                            {/*<div className="col-md-3">*/}
                            {/*    <FormControlLabel label="Usuário com função SDR" control={*/}
                            {/*        <Switch defaultChecked={data.sdr} onChange={e => setData('sdr', e.target.checked)}/>}/>*/}
                            {/*</div>*/}
                            <div className="col-md-3">
                                <FormControlLabel label="Acesso a Dados Financeiros" control={
                                    <Switch defaultChecked={data.financeiro} onChange={e => setData('financeiro', e.target.checked)}/>}/>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardTitle title="Permissões de Acesso" icon={<CardChecklist size={22}/>}/>
                    <CardBody>
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
                                                                        })}/>
                                                            }/>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardTitle title="Supervisonados" icon={<People size={22}/>}>
                        <FormControlLabel label="Ver Bloqueados" control={
                            <Switch onChange={e => setUsuarioAtivos(e.target.checked)}/>}/>
                    </CardTitle>
                    <CardBody>
                        <div className="row row-cols-4">
                            {usuarios.map(item =>
                                (item.status || usuarioAtivos) &&
                                <div key={item.id} className="mb-2 col">
                                    <CardContainer>
                                        <CardBody>
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
                                        </CardBody>
                                    </CardContainer>
                                </div>
                            )}
                        </div>
                    </CardBody>
                </CardContainer>


                <div className="row mb-6 justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-success">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
