import Layout from "@/Layouts/Admin/Layout";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";

import {router} from "@inertiajs/react";

export default function Edit({dados, urlAnterior}) {
    const {setData, data} = useForm({
        nome: dados.nome,
        razao_social: dados.razao_social,
        cnpj: dados.cnpj,
        atendente: dados.atendente,
        telefone: dados.telefone,
        email: dados.email,
        cidade: dados.cidade,
        estado: dados.estado,
    });

    function submit(e) {
        e.preventDefault();
        router.post(route('admin.clientes.leads.leads-main.update', dados.id),
            {_method: 'put', ...data, url: urlAnterior}
        );
    }

    return (
        <Layout container voltar={route('admin.clientes.leads.leads-main.show', dados.id)} titlePage="Editar LEAD"
                menu="leads" submenu="editar">
            <span className="h6">Atualizar informações</span>
            <form onSubmit={submit}>
                <div className="row mt-3">
                    <div className="col mb-3">
                        <TextField label="Nome/Nome Fantasia:" value={data.nome} fullWidth
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>
                    <div className="col">
                        <div className="col mb-3">
                            <TextField label="Razão Social :" value={data.razao_social} fullWidth
                                       onChange={e => setData('razao_social', e.target.value)}/>
                        </div>
                    </div>
                </div>
                {/*PJ*/}
                {<div className="row">
                    <div className="col mb-3">
                        <TextField label="CNPJ :" value={data.cnpj} fullWidth
                                   onChange={e => setData('cnpj', e.target.value)}/>
                    </div>
                    <div className="col mb-3">

                    </div>
                </div>}
                <div className="row">
                    <div className="col mb-3">
                        <TextField label="Atendente:" value={data.atendente} fullWidth
                                   onChange={e => setData('atendente', e.target.value)}/>
                    </div>
                    <div className="col mb-3">
                        <TextField label="Telefone:" value={data.telefone} fullWidth
                                   onChange={e => setData('telefone', e.target.value)}/>
                    </div>
                    <div className="col mb-3">
                        <TextField label="Email:" value={data.email} type="email" fullWidth
                                   onChange={e => setData('email', e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col mb-3">
                        <TextField label="Cidade:" value={data.cidade} fullWidth
                                   onChange={e => setData('cidade', e.target.value)}/>
                    </div>
                    <div className="col mb-3">
                        <TextField label="Estado:" value={data.estado} fullWidth
                                   onChange={e => setData('estado', e.target.value)}/>
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
