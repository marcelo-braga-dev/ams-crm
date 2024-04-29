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
                    <div className="mb-4 row">
                        <div className="col-md-8">
                            Usuário Administrador :<Switch onChange={e => {
                                setData({ ...data, 'is_admin': (e.target.checked ? "admin" : "geral"), permissoes: [] })
                            }} />
                        </div>
                    </div>
                </div>

                <div className="mb-4 card card-body">
                    <h6>Funções do Usuário</h6>{console.log(data)}
                    {permissoes?.[data.is_admin]?.map(categorias => {
                        return (
                            <div key={categorias.categoria} className="mb-2 border-bottom">
                                <div className="">
                                    <small className="d-block">{categorias.categoria}</small>
                                </div>
                                <div className="row row-cols-5">
                                    {categorias?.permissoes?.map(item => {
                                        return (
                                            <div key={item.id} className="col">
                                                <FormControlLabel label={item.nome} control={
                                                    <Switch size="small" key={item.id} onChange={e => setData('permissoes', { ...data.permissoes, [item.id]: e.target.checked })} />} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
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