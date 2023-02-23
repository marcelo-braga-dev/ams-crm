import React from "react";
import Layout from '@/Layouts/Admin/Layout';
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";

export default function Create({dataAtual}) {

    const {data, setData, post} = useForm({
        prazo: dataAtual
    })

    function submit(e) {
        e.preventDefault();
        post(route('admin.dev.store'))
    }

    return (
        <Layout container titlePage="Cadastrar - Desenvolvimento"
                menu="dev" submenu="cadastrar">
            <form onSubmit={submit}>
                <div className="row">
                    <div className="col mb-4">
                        <TextField label="Título" fullWidth required
                                   onChange={e => setData('titulo', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-4">
                        <TextField multiline rows="3" label="Descrição" fullWidth required
                                   onChange={e => setData('descricao', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <TextField type="datetime-local" label="Prazo" fullWidth required
                                   defaultValue={data.prazo} onChange={e => setData('prazo', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-auto mx-auto">
                        <button className="btn btn-primary" type="submit">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
