import Layout from "@/Layouts/Admin/Layout";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import { router } from '@inertiajs/react'
export default function ({dados}) {
    const {data, setData} = useForm({
        nome: dados.nome
    });


    function submit(e) {
        e.preventDefault()
        router.post(route('admin.config.categorias.update', dados.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout container titlePage="Cadastrar Categoria" voltar={route('admin.config.categorias.index')}>
            <div className="row justify-content-between mb-4">
                <div className="col-auto"><h5>Cadastrar Categoria</h5></div>
                <div className="col-auto">
                </div>
            </div>
            <form onSubmit={submit}>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <TextField label="Nome" value={data.nome}
                                   onChange={e => setData('nome', e.target.value)} required fullWidth/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">Atualizar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
