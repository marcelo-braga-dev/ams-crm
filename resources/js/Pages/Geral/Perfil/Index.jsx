import React from 'react';
import Layout from "@/Layouts/Layout";

import {useForm} from '@inertiajs/react';
import {Avatar, TextField} from "@mui/material";

import {router} from '@inertiajs/react';
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import AlertError from "@/Components/Alerts/AlertError.jsx";

const Page = ({dados, flash}) => {
    const {data, setData} = useForm();

    function submit(e) {
        e.preventDefault()
        if (data.nova_senha.length >= 4)
            router.post(route('auth.perfil.atualizar-senha'), {
                _method: 'put',
                user_id: dados.id,
                ...data,
            },)
        else AlertError("A senha deve ter no mínimo 4 dígitos.")
    }

    function atualizarFoto(file) {
        router.post(route('auth.perfil.atualizar-avatar', dados.id), {
            _method: 'put',
            foto: file,
            user_id: dados.id,
        })
    }

    return (
        <Layout titlePage="Perfil" menu="perfil" submenu="perfil-conta">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-auto">
                            <Avatar className="cursor-pointer"
                                    src={dados.foto} sx={{width: 80, height: 80}}
                                    onClick={() => {
                                        document.getElementById('file_foto').click()
                                    }}/>
                            <label className="cursor-pointer " htmlFor="file_foto">Alterar foto</label>
                            <input className="d-none" type="file" id="file_foto" accept="image/*"
                                   onChange={e => atualizarFoto(e.target.files[0])}/>
                        </div>
                        <div className="col">
                            <h6 className="mb-2">Seus Dados</h6>
                            <span className="d-block"><b>Nome:</b> {dados.nome}</span>
                            <span className="d-block"><b>Email:</b> {dados.email}</span>
                            {dados.tipo !== 'integrador' && <span className="d-block"><b>Função:</b> {dados.funcao}</span>}
                            <span className="d-block"><b>Franquia:</b> {dados.franquia}</span>
                            <span className="d-block"><b>Setor:</b> {dados.setor}</span>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <div className="row">
                        <h5 className="mb-2 mb-4">Alterar Senha</h5>
                        <form onSubmit={submit}>
                            <div className="mb-4 row">
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
                            <div className="text-center row">
                                <div className="col">
                                    <button className="btn btn-primary" type='submit'>
                                        Alterar Senha
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}

export default Page
