import {useForm} from '@inertiajs/react';
import Layout from "@/Layouts/Supervisor/Layout";
import {TextField} from "@mui/material";
import Alert from "@mui/material/Alert";
import {router} from '@inertiajs/react'

export default function Edit({dados}) {
    const {data, setData, post, processing, errors} = useForm({
        'nome': dados.nome,
        'cnpj': dados.cnpj,
        'atendente': dados.atendente,
        'telefone': dados.telefone,
        'email': dados.email,
        'anotacoes': dados.anotacoes,
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('supervisor.fornecedores.update', dados.id), {
            _method: 'put',
            ...data,
        })
    }

    return (
        <Layout container titlePage="Cadastrar Fornecedor" voltar={route('supervisor.fornecedores.show', dados.id)}>
            {errors.nome && <Alert severity="error" className={"mb-3"}>{errors.empresa}</Alert>}
            {errors.senha && <Alert severity="error" className={"mb-3"}>{errors.senha}</Alert>}
            {errors.email && <Alert severity="error" className={"mb-3"}>{errors.email}</Alert>}

            <form onSubmit={submit}>
                <h5 className="mb-4">Cadastro de Fornecedores</h5>
                <div className="row mb-3 mt-3 text-right">
                    <div className="col mb-3">
                        <TextField label="Empresa" required value={data.nome}
                                   onChange={e => setData('nome', e.target.value)} fullWidth/>
                    </div>
                    <div className="col-md-4 mb-3">
                        <TextField label="CNPJ" value={data.cnpj}
                                   onChange={e => setData('cnpj', e.target.value)} fullWidth/>
                    </div>
                </div>
                <div className="row mb-3 text-right">
                    <div className="col mb-3">
                        <TextField label="Atendente" value={data.atendente}
                                   onChange={e => setData('atendente', e.target.value)} fullWidth/>
                    </div>
                    <div className="col mb-3">
                        <TextField label="Telefone" value={data.telefone}
                                   onChange={e => setData('telefone', e.target.value)} fullWidth/>
                    </div>
                    <div className="col mb-3">
                        <TextField label="Email" value={data.email}
                                   onChange={e => setData('email', e.target.value)} fullWidth/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-3">
                        <TextField label="Anotações" multiline rows="6" fullWidth value={data.anotacoes}
                                   onChange={e => setData('anotacoes', e.target.value)}
                                   InputLabelProps={{shrink: true}}/>
                    </div>
                </div>
                <div className="row mb-3 text-right">
                    <div className='col text-center mt-4'>
                        <button className="btn btn-primary" type='submit'>Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
