import { router } from '@inertiajs/react'
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";

import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import { Avatar, TextField, Typography } from "@mui/material";

export default function Create({ dados }) {
    const { data, setData } = useForm();

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.perfil.alterar-senha', dados.id), {
            _method: 'put',
            ...data,
        },)
        document.getElementById('senha_atual').value = ''
        document.getElementById('nova_senha').value = ''
        document.getElementById('confirmar_senha').value = ''
    }

    function atualizarFoto(file) {
        router.post(route('admin.perfil.config.update', dados.id), {
            _method: 'put',
            foto: file,
        })
    }

    return (
        <Layout container titlePage="Perfil">
            <div className="p-2 mb-4 rounded shadow row row-cols-2 border-bottom">
                <div className="col">
                    <h6 className="mb-2">Seus Dados</h6>
                    <span className="d-block"><b>Nome:</b> {dados.nome}</span>
                    <span className="d-block"><b>Email:</b> {dados.email}</span>
                    <span className="d-block"><b>Função:</b> {dados.funcao}</span>
                </div>
                <div className="col">
                    <Avatar className="cursor-pointer"
                        src={dados.foto} sx={{ width: 80, height: 80 }}
                        onClick={() => {
                            document.getElementById('file_foto').click()
                        }} />
                    <label className="px-2 cursor-pointer" htmlFor="file_foto">Alterar foto</label>
                    <input className="d-none" type="file" id="file_foto" accept="image/*"
                        onChange={e => atualizarFoto(e.target.files[0])} />
                </div>
            </div>

            {/*Alterar Senha*/}
            <div className="p-2 mb-4 rounded shadow row border-bottom">
                <h6 className="mb-2 mb-4">Alterar Senha</h6>

                <form onSubmit={submit}>
                    <div className="mb-4 row">
                        <div className="col">
                            <TextField id="senha_atual"
                                label="Senha Atual" required fullWidth type="password"
                                onChange={e => setData('senha_atual', e.target.value)} />
                        </div>
                        <div className="col">
                        </div>
                    </div>
                    <div className="mb-4 row">
                        <div className="col">
                            <TextField id="nova_senha"
                                label="Nova Senha" required fullWidth type="password"
                                onChange={e => setData('nova_senha', e.target.value)} />
                        </div>
                        <div className="col">
                            <TextField id="confirmar_senha"
                                label="Confirmar Nova Senha" required fullWidth type="password"
                                onChange={e => setData('confirmar_senha', e.target.value)} />
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
            {/*Alterar Senha - fim */}
        </Layout>
    )
}
