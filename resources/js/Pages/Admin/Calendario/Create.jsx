import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import {useForm} from "@inertiajs/react";

export default function ({usuarios}) {
    const {post, data, setData} = useForm({
        usuario: ''
    });

    function submit(e) {
        e.preventDefault()
        if (data.usuario)
        post(route('admin.agenda.calendario.store'))
    }

    return (
        <Layout container titlePage="Novo Registro de Calendário" voltar={route('admin.agenda.calendario.index')}
                menu="agenda" submenu="calendario">
            <div className="row">
                <div className="col-md-4">
                    <TextField label="Usuário" select fullWidth required defaultValue=""
                               onChange={e => setData('usuario', e.target.value)}>
                        {usuarios.map((item, index) => {
                            return (
                                <MenuItem key={index} value={item.id}>#{item.id} - {item.nome}</MenuItem>
                            )
                        })}
                    </TextField>
                </div>
                <div className="col-auto">
                    <TextField type="datetime-local"
                    onChange={e => setData('data', e.target.value)}/>
                </div>
            </div>
            <form onSubmit={submit}>
                <div className="row mt-4">
                    <div className="col">
                        <TextField label="Mensagem" fullWidth required
                                   onChange={e => setData('msg', e.target.value)}/>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-auto">
                        <button className="btn btn-primary">Enviar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
