import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import List from "@mui/material/List";
import {IconButton, TextField} from "@mui/material";
import {router, useForm} from "@inertiajs/react";

import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useEffect, useState} from "react";
import maskJquery from "@/Helpers/maskJquery";

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function () {
    const [bancos, setBancos] = useState([])
    const [empresas, setEmpresas] = useState([])
    const [fornecedores, setFornecedores] = useState([])

    const [banco, setBanco] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [fornecedor, setFornecedor] = useState('')
    const [editarValor, setEditarValor] = useState({
        id: undefined,
        valor: undefined,
        cnpj: undefined
    })

    const {data, setData, reset} = useForm({
        valor: '',
        cnpj: ''
    })

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const submit = (e, chave) => {
        e.preventDefault()
        router.post(route('admin.financeiro.config.store'), {...data?.[chave], chave: chave})

    }

    const deletar = (id) => {
        router.post(route('admin.financeiro.config.destroy', id), {_method: 'DELETE'})
    }

    const editar = (id) => {
        if (id === editarValor.id) router.post(route('admin.financeiro.config.update', id), {
            ...editarValor,
            _method: 'PUT'
        })
    }

    router.on('success', () => {
        window.location.reload()
    })


    useEffect(() => {
        axios.get(route('admin.financeiro.config-registros'))
            .then(res => {
                setBancos(res.data.bancos)
                setEmpresas(res.data.empresas)
                setFornecedores(res.data.fornecedores)
            })
    }, []);

    maskJquery()

    return (
        <Layout titlePage="Configurações do Financeiro" menu="financeiro" submenu="financeiro-config">
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Bancos" {...a11yProps(0)} />
                        <Tab label="Empresas" {...a11yProps(1)} />
                        <Tab label="Fornecedores" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <h6>Bancos</h6>
                    <div className="card card-body mb-3">
                        <form onSubmit={e => submit(e, 'bancos')}>
                            <span>Cadastrar novo Banco</span>
                            <div className="row">
                                <div className="col">
                                    <TextField label="Nome do Banco" required fullWidth value={data?.bancos?.nome}
                                               onChange={e => {
                                                   setData({bancos: {...data.bancos, 'nome': e.target.value}})
                                               }}/>
                                </div>
                                <div className="col">
                                    <TextField label="Agência" required fullWidth value={data?.bancos?.agencia}
                                               onChange={e => {
                                                   setData({bancos: {...data.bancos, 'agencia': e.target.value}})
                                               }}/>
                                </div>
                                <div className="col">
                                    <TextField label="Conta" required fullWidth value={data?.bancos?.conta}
                                               onChange={e => {
                                                   setData({bancos: {...data.bancos, 'conta': e.target.value}})
                                               }}/>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary mx-3">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card card-body mb-3">
                        <span>Bancos Cadastrados</span>
                        <List>
                            {bancos.map(item =>
                                <div className="row mb-1 p-3 border-bottom">
                                    <div className="col">
                                        <TextField label="Nome" defaultValue={item.valor} fullWidth
                                                   onChange={e => setEditarValor({
                                                       id: item.id,
                                                       valor: e.target.value
                                                   })}/>
                                    </div>
                                    <div className="col">
                                        <TextField label="Agência" defaultValue={item.agencia} fullWidth
                                                   onChange={e => setEditarValor({
                                                       id: item.id,
                                                       valor: e.target.value
                                                   })}/>
                                    </div>
                                    <div className="col">
                                        <TextField label="Conta" defaultValue={item.conta} fullWidth
                                                   onChange={e => setEditarValor({
                                                       id: item.id,
                                                       valor: e.target.value
                                                   })}/>
                                    </div>
                                    <div className="col-auto">
                                        <IconButton edge="end" aria-label="delete" onClick={() => deletar(item.id)}>
                                            <DeleteOutlineOutlinedIcon color="error"/>
                                        </IconButton>
                                        <IconButton edge="end" aria-label="edit" className="mx-2"
                                                    onClick={() => editar(item.id)}>
                                            <EditOutlinedIcon color="success"/>
                                        </IconButton>
                                    </div>
                                </div>
                            )}
                        </List>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <h6>Empresas</h6>
                    <div className="card card-body mb-3">
                        <form onSubmit={e => submit(e, 'empresas')}>
                            <span>Cadastrar nova Empresa</span>
                            <div className="row">
                                <div className="col">
                                    <TextField required value={data?.empresas?.nome} fullWidth label="Nome da Empresa"
                                               onChange={e => {
                                                   setData({empresas: {...data.empresas, 'nome': e.target.value}})
                                               }}/>
                                </div>
                                <div className="col">
                                    <TextField required value={data?.empresas?.cnpj} fullWidth label="CNPJ da Empresa" className="cnpj"
                                               onChange={e => {
                                                   setData({empresas: {...data.empresas, cnpj: e.target.value}})
                                               }}/>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary mx-3">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card card-body mb-3">
                        <span>Empresas Cadastradas</span>
                        <List>
                            {empresas.map(item =>
                                <div className="row mb-1 p-3 border-bottom">
                                    <div className="col">
                                        <TextField label="Nome da Empresa" defaultValue={item.valor} fullWidth
                                                   onChange={e => setEditarValor({
                                                       id: item.id,
                                                       valor: e.target.value
                                                   })}/>
                                    </div>
                                    <div className="col">
                                        <TextField label="CNPJ da Empresa" defaultValue={item.cnpj} fullWidth
                                                   onChange={e => setEditarValor({
                                                       id: item.id,
                                                       valor: e.target.value
                                                   })}/>
                                    </div>
                                    <div className="col-auto">
                                        <IconButton edge="end" aria-label="delete" onClick={() => deletar(item.id)}>
                                            <DeleteOutlineOutlinedIcon color="error"/>
                                        </IconButton>
                                        <IconButton edge="end" aria-label="edit" className="mx-2"
                                                    onClick={() => editar(item.id)}>
                                            <EditOutlinedIcon color="success"/>
                                        </IconButton>
                                    </div>
                                </div>
                            )}
                        </List>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <h6>Fornecedores</h6>
                    <div className="card card-body mb-3">
                        <form onSubmit={e => submit(e, 'fornecedores')}>
                            <span>Cadastrar novo Foenecedor</span>
                            <div className="row">
                                <div className="col">
                                    <TextField label="Nome do Fornecedor" required value={data.valor} fullWidth
                                               onChange={e => setData('valor', e.target.value)}/>
                                </div>
                                <div className="col-3">
                                    <TextField label="CNPJ" required fullWidth className="cnpj"
                                               value={data.cnpj}
                                               onChange={e => setData('cnpj', e.target.value)}/>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary mx-3">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card card-body mb-3">
                        <List>
                            {fornecedores.map(item =>
                                <div className="row mb-1 p-3 border-bottom">
                                    <div className="col">
                                        <TextField label="Nome" defaultValue={item.valor} fullWidth
                                                   onChange={e => setEditarValor({
                                                       ...editarValor,
                                                       id: item.id,
                                                       valor: e.target.value,
                                                   })}/>
                                    </div>
                                    <div className="col-3">
                                        <TextField className="cnpj" label="CNPJ" defaultValue={item.cnpj} fullWidth
                                                   onChange={e => setEditarValor({
                                                       ...editarValor,
                                                       id: item.id,
                                                       cnpj: e.target.value,
                                                   })}/>
                                    </div>
                                    <div className="col-auto">
                                        <IconButton edge="end" aria-label="delete" onClick={() => deletar(item.id)}>
                                            <DeleteOutlineOutlinedIcon color="error"/>
                                        </IconButton>
                                        <IconButton edge="end" aria-label="edit" className="mx-2"
                                                    onClick={() => editar(item.id)}>
                                            <EditOutlinedIcon color="success"/>
                                        </IconButton>
                                    </div>
                                </div>
                            )}
                        </List>
                    </div>
                </CustomTabPanel>
            </Box>
        </Layout>
    )
}
