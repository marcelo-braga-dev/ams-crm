import Layout from "@/Layouts/Layout";
import { useForm } from "@inertiajs/inertia-react";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { router } from "@inertiajs/react";

export default function ({ funcao, permissoes, permissoesAtivas }) {
    const { setData, data } = useForm({
        nome: funcao.nome,
        permissoes: permissoesAtivas
    })

    const submit = (e) => {
        e.preventDefault()
        router.post(route('admin.usuarios.funcoes.update', funcao.id), { ...data, _method: 'PUT' })
    }

    return (
        <Layout titlePage="Editar Função" menu="usuarios" submenu="usuarios-funcoes"
            voltar={route('admin.usuarios.funcoes.index')}>
            <form onSubmit={submit}>
                <div className="mb-4 card card-body">
                    <div className="row">
                        <div className="mb-4 col">
                            <TextField label="Nome da Função" fullWidth required defaultValue={data.nome}
                                onChange={e => setData('nome', e.target.value)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-primary">Atualizar</button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
