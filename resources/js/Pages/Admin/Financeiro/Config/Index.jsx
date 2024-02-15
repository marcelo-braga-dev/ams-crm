import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {TextField} from "@mui/material";
import {router, useForm} from "@inertiajs/react";

export default function ({bancos, empresas, fornecedores}) {
    const {data, setData} = useForm()
    const submit = (e, chave) => {
        e.preventDefault()
        router(route('admin.financeiro.config.store'), {...data, chave: chave})
    }

    return (
        <Layout titlePage="Configurações do Financeiro" menu="financeiro" submenu="financeiro-config">

            <div className="row">
                <div className="col-4">
                    <div className="card card-body mb-3">
                        <h6>Bancos</h6>
                        <List>
                            {bancos.map(item =>
                                <ListItem>
                                    <ListItemText primary={item}/>
                                </ListItem>,
                            )}
                        </List>
                        <form onSubmit={e => submit(e, 'banco')}>
                            <TextField required onChange={e => setData('valor', e.target.value)}/>
                            <button className="btn btn-primary mx-3">Salvar</button>
                        </form>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card card-body mb-3">
                        <h6>Empresas</h6>
                        <List>
                            {empresas.map(item =>
                                <ListItem>
                                    <ListItemText primary={item}/>
                                </ListItem>,
                            )}
                        </List>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card card-body mb-3">
                        <h6>Fornecedores</h6>
                        <List>
                            {fornecedores.map(item =>
                                <ListItem>
                                    <ListItemText primary={item}/>
                                </ListItem>,
                            )}
                        </List>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
