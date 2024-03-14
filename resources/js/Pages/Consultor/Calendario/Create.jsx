import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import {router, useForm} from "@inertiajs/react";

export default function ({usuarios}) {
    const {post, data, setData} = useForm({
        usuario: ''
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.agenda.calendario.store'), data)
    }

    return (
        <Layout titlePage="Novo Registro de Calendário" menu="agenda" submenu="calendario"
                voltar={route('admin.agenda.calendario.index')}>
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col-auto">
                        <TextField type="date" required
                                   onChange={e => setData('data', e.target.value)}/>
                    </div>
                    <div className="col-md-4">
                        <TextField label="Usuário" select fullWidth required defaultValue=""
                                   onChange={e => setData('usuario', e.target.value)}>
                            <MenuItem value="todos">Todos Usuários</MenuItem>
                            {usuarios.map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.id}>#{item.id} - {item.nome}</MenuItem>
                                )
                            })}
                        </TextField>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <TextField label="Mensagem" fullWidth required multiline rows="3"
                                   onChange={e => setData('msg', e.target.value)}/>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-auto">
                        <button className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
