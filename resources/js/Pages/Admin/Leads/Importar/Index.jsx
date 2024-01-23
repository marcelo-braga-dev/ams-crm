import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import TextField from "@mui/material/TextField";
import {useForm} from "@inertiajs/react";
import MenuItem from "@mui/material/MenuItem";
import React, {useState} from "react";
import {CircularProgress} from "@mui/material";

export default function ({setores, modelo}) {
    const {post, setData} = useForm()
    const [pregress, setPregress] = useState(false);

    function submit(e) {
        e.preventDefault()
        setPregress(true)
        post(route('admin.clientes.leads.importar.store'))
    }

    return (
        <Layout container titlePage="Importar Planilhas de Leads" menu="leads" submenu="leads-importar">
            <div className="row justify-content-between">
                <div className="col-auto">
                    <a href={modelo} className="btn btn-link">Baixar Modelo</a>
                </div>
                <div className="col-auto">
                    <a className="btn btn-primary btn-sm"
                       href={route('admin.clientes.leads.importar-historico.index')}>Histórico</a>
                </div>
            </div>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col mb-4">
                        <span className="d-block">Arquivo de Importação (.csv)</span>
                        <TextField type="file" required inputProps={{accept: '.csv'}} fullWidth
                                   onChange={e => setData('arquivo', e.target.files[0])}/>
                    </div>
                    <div className="col mb-4">
                        <span className="d-block">Setor</span>
                        <TextField select label="" fullWidth defaultValue="" required
                                   onChange={e => setData('setor', e.target.value)}>
                            {setores.map((setor, index) => {
                                return (
                                    <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                                )
                            })}
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    <div className="col-auto">
                        <button className="btn btn-primary">Enviar</button>

                    </div>
                    <div className="col">
                        {pregress && <CircularProgress/>}
                    </div>
                </div>
            </form>

        </Layout>
    )
}
