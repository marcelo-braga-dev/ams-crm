import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import MenuItem from "@mui/material/MenuItem";

export default function ({franquias}) {
    const {setData, post} = useForm();

    function submit(e) {
        e.preventDefault()
        post(route('admin.config.categorias.store'))
    }

    return (
        <Layout container titlePage="Cadastrar Setor" voltar={route('admin.config.categorias.index')}
                menu="config" submenu="config-setores">

            <form onSubmit={submit}>
                <div className="row">
                    <div className="col mb-4">
                        <div className="col-md-3 mb-3">
                            <TextField label="Franquia" select required fullWidth
                                       onChange={e => setData('franquia', e.target.value)}>
                                {franquias.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <TextField label="Nome do Setor" fullWidth required
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>
                    <div className="col-md-2">
                        <TextField label="Tipo" select required fullWidth
                                   onChange={e => setData('modelo', e.target.value)}>
                            <MenuItem value="2">Com produtos</MenuItem>
                            <MenuItem value="1">Sem produtos</MenuItem>
                            <MenuItem value="3">Dimensionamento Solar</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-md-2">
                        <TextField label="Cor" type="color"
                                   onChange={e => setData('cor', e.target.value)} required fullWidth/>
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
