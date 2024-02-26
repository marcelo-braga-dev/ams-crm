import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {IconButton, TextField} from "@mui/material";
import {router, useForm} from "@inertiajs/react";

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useState} from "react";

export default function ({bancos, empresas, fornecedores}) {
    const [banco, setBanco] = useState('')
    const [empresa, setEmpresas] = useState('')
    const [fornecedor, setFornecedores] = useState('')
    const [editarValor, setEditarValor] = useState({
        id: undefined,
        valor: undefined
    })

    const {data, setData, reset} = useForm({
        valor: ''
    })
    const submit = (e, chave) => {
        e.preventDefault()
        router.post(route('admin.financeiro.config.store'), {...data, chave: chave})
    }

    const deletar = (id) => {
        router.post(route('admin.financeiro.config.destroy', id), {_method: 'DELETE'})
    }

    const editar = (id) => {
        if (id === editarValor.id) router.post(route('admin.financeiro.config.update', id), {...editarValor, _method: 'PUT'})
    }

    router.on('success', () => {
        setBanco('')
        setEmpresas('')
        setFornecedores('')
    })

    return (
        <Layout titlePage="Configurações do Financeiro" menu="financeiro" submenu="financeiro-config">

            <div className="row">
                <div className="col-4">
                    <div className="card card-body mb-3">
                        <h6>Bancos</h6>
                        <List>
                            {bancos.map(item =>
                                <div className="row mb-1 p-3 border-bottom">
                                    <div className="col">
                                        <TextField defaultValue={item.valor} fullWidth onChange={e => setEditarValor({
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
                            <div className="row">
                                <div className="col">
                                    <TextField value={banco} required fullWidth onChange={e => {
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
                </div>
                <div className="col-4">
                    <div className="card card-body mb-3">
                        <h6>Empresas</h6>
                        <List>
                            {empresas.map(item =>
                                <div className="row mb-1 p-3 border-bottom">
                                    <div className="col">
                                        <TextField defaultValue={item.valor} fullWidth onChange={e => setEditarValor({
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
                            <div className="row">
                                <div className="col">
                                    <TextField required value={empresa} fullWidth
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
                </div>
                <div className="col-4">
                    <div className="card card-body mb-3">
                        <h6>Fornecedores</h6>
                        <List>
                            {fornecedores.map(item =>
                                <div className="row mb-1 p-3 border-bottom">
                                    <div className="col">
                                        <TextField defaultValue={item.valor} fullWidth onChange={e => setEditarValor({
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
                        <form onSubmit={e => submit(e, 'fornecedores')}>
                            <div className="row">
                                <div className="col">
                                    <TextField required value={fornecedor} fullWidth
                                               onChange={e => {
                                                   setData('valor', e.target.value)
                                                   setFornecedores(e.target.value)
                                               }}/>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-primary mx-3">Salvar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
