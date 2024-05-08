import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import { useForm } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";

import { FormControlLabel, Switch, TextField } from "@mui/material";

export default function ({ permissoes }) {

    const { setData, data } = useForm({
        nome: "",
        is_admin: 'geral',
        permissoes: []
    })

    const submit = (e) => {
        e.preventDefault()
        router.post(route('admin.usuarios.funcoes.store'), { ...data })
    }

    return (
        <Layout titlePage="Cadastrar Função de Usuários" menu="usuarios" submenu="usuarios-funcoes"
            voltar={route('admin.usuarios.funcoes.index')}>

            <form onSubmit={submit}>
                <div className="mb-4 card card-body">
                    <div className="mb-4 row">
                        <div className="col-md-5">
                            <TextField label="Nome da Função" fullWidth required
                                onChange={e => setData('nome', e.target.value)} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <button type="submit" className="btn btn-success">Salvar</button>
                    </div>
                </div>
            </form>

        </Layout >
    )
}