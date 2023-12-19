import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";

export default function () {
    const {setData, post} = useForm();

    function submit(e) {
        e.preventDefault()
        post(route('admin.franquias.store'))
    }
    return (
        <Layout container titlePage="Cadastrar Setor" voltar={route('admin.config.categorias.index')}
                menu="config" submenu="setores">

            <form onSubmit={submit}>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <TextField label="Nome da Franquia"
                                   onChange={e => setData('nome', e.target.value)} required fullWidth/>
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
