import Layout from "@/Layouts/Admin/Layout";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";

export default function ({dados}) {
    const {setData, post} = useForm();

    function submit(e) {
        e.preventDefault()
        post(route('admin.config.categorias.store'))
    }
    return (
        <Layout container titlePage="Cadastrar Setor" voltar={route('admin.config.categorias.index')}>

            <form onSubmit={submit}>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <TextField label="Nome do Setor" onChange={e => setData('nome', e.target.value)} required fullWidth/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <button className="btn btn-primary" type="submit">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
