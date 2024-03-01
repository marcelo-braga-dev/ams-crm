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
import {useState} from "react";
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

export default function ({bancos, empresas, fornecedores}) {
    const [banco, setBanco] = useState('')
    const [empresa, setEmpresas] = useState('')
    const [fornecedor, setFornecedores] = useState('')
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
        router.post(route('admin.financeiro.config.store'), {...data, chave: chave})
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
        setBanco('')
        setEmpresas('')
        setFornecedores('')
        setData({cnpj: '', valor: ''})
    })

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
                    <div className="card card-body mb-3">
                        <h6>Bancos</h6>
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
                        <form onSubmit={e => submit(e, 'bancos')}>
                            <span>Cadastrar novo Banco</span>
                            <div className="row">
                                <div className="col">
                                    <TextField label="Nome" value={banco} required fullWidth onChange={e => {
                                        setData('valor', e.target.value)
                                        setBanco(e.target.value)
                                    }}/>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary mx-3">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div className="card card-body mb-3">
                        <h6>Empresas</h6>
                        <List>
                            {empresas.map(item =>
                                <div className="row mb-1 p-3 border-bottom">
                                    <div className="col">
                                        <TextField label="Nome" defaultValue={item.valor} fullWidth
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

                        <form onSubmit={e => submit(e, 'empresas')}>
                            <span>Cadastrar nova Empresa</span>
                            <div className="row">
                                <div className="col">
                                    <TextField required value={empresa} fullWidth label="Nome"
                                               onChange={e => {
                                                   setData('valor', e.target.value)
                                                   setEmpresas(e.target.value)
                                               }}/>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary mx-3">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <div className="card card-body mb-3">
                        <h6>Fornecedores</h6>
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
                        <form onSubmit={e => submit(e, 'fornecedores')}>
                            <span>Cadastrar novo Foenecedor</span>
                            <div className="row">
                                <div className="col">
                                    <TextField label="Nome" required value={data.valor} fullWidth
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
                </CustomTabPanel>
            </Box>
        </Layout>
    )
}
