import Layout from "@/Layouts/Layout";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";

export default function () {
    const {setData, post} = useForm();

    function submit(e) {
        e.preventDefault()
        post(route('admin.franquias.store'))
    }
    return (
        <Layout container titlePage="Cadastrar Franquia" voltar={route('admin.config.categorias.index')}
                menu="config" submenu="setores">

            <form onSubmit={submit}>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <TextField label="Nome da Franquia"
                                   onChange={e => setData('nome', e.target.value)} required fullWidth/>
                    </div>
                    <div className="col-md-2">
                        <TextField label="Cor Fundo" type="color" required fullWidth
                                   onChange={e => setData('cor', e.target.value)}/>
                    </div>
                    <div className="col-md-2">
                        <TextField label="Cor Texto" type="color"
                                   onChange={e => setData('cor_texto', e.target.value)} required fullWidth/>
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
