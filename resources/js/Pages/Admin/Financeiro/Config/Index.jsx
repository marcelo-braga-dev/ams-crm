import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {IconButton, TextField} from "@mui/material";
import {router, useForm} from "@inertiajs/react";

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useState} from "react";

export default function ({bancos, empresas, fornecedores}) {
    const [banco, setBanco] = useState('')
    const [empresa, setEmpresas] = useState('')
    const [fornecedor, setFornecedores] = useState('')

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
                                <ListItem
                                    className="border-bottom mb-2"
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete" onClick={() => deletar(item.id)}>
                                            <DeleteOutlineOutlinedIcon/>
                                        </IconButton>
                                    }>
                                    <ListItemText primary={item.valor}/>
                                </ListItem>,
                            )}
                        </List>
                        <form onSubmit={e => submit(e, 'bancos')}>
                            <TextField value={banco} required onChange={e => {
                                setData('valor', e.target.value)
                                setBanco(e.target.value)
                            }}/>
                            <button className="btn btn-primary mx-3">Salvar</button>
                        </form>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card card-body mb-3">
                        <h6>Empresas</h6>
                        <List>
                            {empresas.map(item =>
                                <ListItem
                                    className="border-bottom mb-2"
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteOutlineOutlinedIcon/>
                                        </IconButton>
                                    }>
                                    <ListItemText primary={item.valor}/>
                                </ListItem>,
                            )}
                        </List>
                        <form onSubmit={e => submit(e, 'empresas')}>
                            <TextField required value={empresa}
                                       onChange={e => {
                                setData('valor', e.target.value)
                                setEmpresas(e.target.value)
                            }}/>
                            <button className="btn btn-primary mx-3">Salvar</button>
                        </form>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card card-body mb-3">
                        <h6>Fornecedores</h6>
                        <List>
                            {fornecedores.map(item =>
                                <ListItem
                                    className="border-bottom mb-2"
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteOutlineOutlinedIcon/>
                                        </IconButton>
                                    }>
                                    <ListItemText primary={item.valor}/>
                                </ListItem>,
                            )}
                        </List>
                        <form onSubmit={e => submit(e, 'fornecedores')}>
                            <TextField required value={fornecedor}
                                       onChange={e => {
                                setData('valor', e.target.value)
                                setFornecedores(e.target.value)
                            }}/>
                            <button className="btn btn-primary mx-3">Salvar</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
