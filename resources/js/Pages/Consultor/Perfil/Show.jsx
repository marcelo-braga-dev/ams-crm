import {router} from '@inertiajs/react'
import Layout from "@/Layouts/Consultor/Layout";

import React from 'react';
import {useForm, usePage} from '@inertiajs/react';
import {TextField, Typography} from "@mui/material";
import Alert from "@mui/material/Alert";

export default function Create({dados, flash}) {
    const {data, setData} = useForm();
    const {errors} = usePage().props;

    function submit(e) {
        e.preventDefault()
        router.post(route('consultor.senha.update', dados.id), {
            _method: 'put',
            ...data,
        },)
    }

    return (
        <Layout container titlePage="Perfil">
            <div className="row mb-4 p-2 border-bottom shadow rounded">
                <div className="col">
                    <h5 className="mb-2">Seus Dados</h5>
                    <span className="d-block"><b>Nome:</b> {dados.nome}</span>
                    <span className="d-block"><b>Email:</b> {dados.email}</span>
                    <span className="d-block"><b>Função:</b> {dados.tipo}</span>
                </div>
            </div>

            {/*Alterar Senha*/}
            <div className="row mb-4 p-2 border-bottom shadow rounded">
                <h5 className="mb-2 mb-4">Alterar Senha</h5>
                {flash.erro && <Alert className="mb-3" severity="error">{flash.erro}</Alert>}
                {errors.nova_senha && <Alert className="mb-3" severity="error">{errors.nova_senha}</Alert>}
                {flash.sucesso && <Alert className="mb-3" severity="success">{flash.sucesso}</Alert>}

                <form onSubmit={submit}>
                    <div className="row mb-4">
                        <div className="col">
                            <TextField
                                label="Senha Atual" required fullWidth type="password"
                                onChange={e => setData('senha_atual', e.target.value)}/>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col">
                            <TextField
                                label="Nova Senha" required fullWidth type="password"
                                onChange={e => setData('nova_senha', e.target.value)}/>
                        </div>
                        <div className="col">
                            <TextField
                                label="Confirmar Nova Senha" required fullWidth type="password"
                                onChange={e => setData('confirmar_senha', e.target.value)}/>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col">
                            <button className="btn btn-primary" type='submit'>
                                Alterar Senha
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {/*Alterar Senha - fim */}
        </Layout>
    )
}
