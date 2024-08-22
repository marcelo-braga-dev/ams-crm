import Layout from "@/Layouts/Layout";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import { router } from '@inertiajs/react'
import MenuItem from "@mui/material/MenuItem";

export default function ({dados, franquias}) {
    const {data, setData} = useForm({
        nome: dados.nome,
        cor: dados.cor,
        franquia: dados.franquia_id,
        modelo: dados.modelo_id
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.config.categorias.update', dados.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout titlePage="Editar Setor" voltar={route('admin.config.categorias.index')}
                menu="config" submenu="config-setores">

            <form onSubmit={submit}>
                <div className="row">
                    <div className="col mb-4">
                        <div className="col-md-3 mb-3">
                            <TextField label="Franquia" select required fullWidth
                                       defaultValue={data.franquia}
                                       onChange={e => setData('franquia', e.target.value)}>
                                {franquias.map(item => <MenuItem value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <TextField label="Nome" defaultValue={data.nome}
                                   onChange={e => setData('nome', e.target.value)} required fullWidth/>
                    </div>
                    <div className="col-md-2">
                        <TextField label="Emitir Pedidos" select required fullWidth defaultValue={data.modelo}
                                   onChange={e => setData('modelo', e.target.value)}>
                            <MenuItem value="2">Com produtos</MenuItem>
                            <MenuItem value="1">Sem produtos</MenuItem>
                        </TextField>
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
