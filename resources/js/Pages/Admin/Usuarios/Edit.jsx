import Layout from "@/Layouts/Layout";
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from '@inertiajs/react';
import {useMemo, useState} from "react";
import {Avatar, Checkbox, FormControlLabel, Grid, Stack, Switch, TextField, Typography} from "@mui/material";
import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import {CardChecklist, ChevronRight, People, Person, ChevronDown, Box} from "react-bootstrap-icons";

export default function ({
                             usuario,
                             usuarios,
                             supervisionados,
                             funcoes,
                             franquias,
                             setores,
                             permissoes,
                             permissoesUsuario,
                             categorias,
                             categoriasUsuario
                         }) {
    const [usuarioAtivos, setUsuarioAtivos] = useState(false)

    const [aba, setAba] = useState({permissoes: true, categorias: true, supervisionados: true});

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
        categorias: categoriasUsuario
    });

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.usuarios.usuario.update', usuario.id), {...data, _method: 'PUT'});
    };

    const toggleAba = (key) => {
        setAba(prev => ({
            permissoes: key === 'permissoes' ? !prev.permissoes : true,
            categorias: key === 'categorias' ? !prev.categorias : true,
            supervisionados: key === 'supervisionados' ? !prev.supervisionados : true,
        }));
    };

    const dadosPermissao = useMemo(() => {
        return permissoes?.map(categorias => {
            return (
                <CardContainer>
                    <CardBody key={categorias.categoria}>
                        <Typography><ChevronRight size={10}/> <b>{categorias.categoria}</b></Typography>
                        <div className="row row-cols-5">
                            {categorias?.permissoes?.map(item => {
                                return (
                                    <div key={item.id} className="col">
                                        <FormControlLabel label={<Typography variant="body2">{item.nome}</Typography>} control={
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
                    </CardBody>
                </CardContainer>
            )
        })
    }, [data]);

    const dadosCategorias = useMemo(() => {
        return categorias.map(item => <Grid item md={3} marginBottom={1}>
            <Stack direction="row" spacing={1}>
                <Switch defaultChecked={categoriasUsuario[item.id] > 0}
                        size="small" key={item.id}
                        onChange={e => setData('categorias', {
                            ...data.categorias,
                            [item.id]: e.target.checked
                        })}/>
                <Stack direction="column" spacing={0}>
                    <Typography>{item.nome}</Typography>
                    <Typography variant="body2">{item.setor}</Typography>
                </Stack>
            </Stack>
        </Grid>)
    }, [data]);

    const dadosSupervisionados = useMemo(() => {
        return usuarios.map(item =>
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
                            <div className="me-2"><Avatar src={item.foto} sx={{width: 80, height: 80}}/></div>
                            <div>
                                <Typography fontWeight="bold">{item.nome}</Typography>
                                <Typography variant="body2">{item.funcao}</Typography>
                                <Typography variant="body2">{item.setor_nome}</Typography>
                            </div>
                        </Stack>
                    </CardBody>
                </CardContainer>
            </div>
        )
    }, [data, usuarios]);

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
                    <CardTitle title="Permissões de Acesso" icon={<CardChecklist size={22}/>} onClick={() => toggleAba('permissoes')}
                               children={<ChevronDown size={22}/>} cursorPointer/>
                    <CardBody displayNone={aba.permissoes}>
                        <div className="row">
                            <div className="mb-4 col">
                                {dadosPermissao}
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardTitle title="Categorias de Produtos" onClick={() => toggleAba('categorias')} icon={<Box size={22}/>}
                               children={<ChevronDown size={22}/>} cursorPointer/>
                    <CardBody displayNone={aba.categorias}>
                        <Grid container>
                            {dadosCategorias}
                        </Grid>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardTitle title="Supervisonados" icon={<People size={22}/>} onClick={() => toggleAba('supervisionados')}
                               children={<ChevronDown size={22}/>} cursorPointer>
                    </CardTitle>
                    <CardBody displayNone={aba.supervisionados}>
                        <FormControlLabel label="Ver Bloqueados" control={
                            <Switch onChange={e => setUsuarioAtivos(e.target.checked)}/>}/>
                        <div className="row row-cols-4">
                            {dadosSupervisionados}
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
