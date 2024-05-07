import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
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
                        <div className="col">
                            <TextField label="Nome da Função" fullWidth required defaultValue={data.nome}
                                onChange={e => setData('nome', e.target.value)} />
                        </div>
                    </div>
                </div>
                {/* <div className="mb-4 card card-body">
                    <h6>Funções do Usuário</h6>{console.log(data)}
                    {permissoes?.map(categorias => {
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
                                                    <Switch size="small" key={item.id} defaultChecked={data.permissoes?.[item.id] > 0 ?? ''}
                                                        onChange={e => setData('permissoes', { ...data.permissoes, [item.id]: e.target.checked })} />} />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div> */}
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary">Atualizar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}