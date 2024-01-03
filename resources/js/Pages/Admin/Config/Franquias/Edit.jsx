import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import { router } from '@inertiajs/react'
export default function ({franquia}) {
    const {data, setData} = useForm({
        nome: franquia.nome,
        cor: franquia.cor
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.franquias.update', franquia.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout container titlePage="Editar Franquia" voltar={route('admin.franquias.index')}
                menu="config" submenu="config-franquias">

            <form onSubmit={submit}>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <TextField label="Nome" defaultValue={data.nome}
                                   onChange={e => setData('nome', e.target.value)} required fullWidth/>
                    </div>
                    <div className="col-md-2">
                        <TextField label="Cor" defaultValue={data.cor} type="color"
                                   onChange={e => setData('cor', e.target.value)} required fullWidth/>
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
