import Layout from "@/Layouts/Layout";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import {router, useForm} from "@inertiajs/react";

export default function ({usuarios}) {
    const {post, data, setData} = useForm({
        registroPessoal: true
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('consultor.calendario.agenda.store'), data)
    }

    return (
        <Layout titlePage="Novo Registro de Agenda" menu="ferramentas" submenu="ferramentas-agenda"
                voltar={route('consultor.calendario.agenda.index')}>
            <form onSubmit={submit}>
                <div className="row mb-5">
                    <div className="col-3">
                        <TextField type="datetime-local" required fullWidth
                                   onChange={e => setData('data', e.target.value)}/>
                    </div>
                    <div className="col-md-3">
                        <TextField label="Categoria" select fullWidth required defaultValue=""
                                   onChange={e => setData('categoria', e.target.value)}>
                            <MenuItem value="reuniao">Reunião</MenuItem>
                            <MenuItem value="visita">Visitas</MenuItem>
                            <MenuItem value="anotacoes">Anotações</MenuItem>
                        </TextField>
                    </div>
                    <div className="col">

                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <TextField label="Título" fullWidth required
                                   onChange={e => setData('titulo', e.target.value)}/>
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
