import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import * as React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import {Avatar} from "@mui/material";
import {router} from "@inertiajs/react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export default function Index({contas, status}) {

    function iconeStatus(status) {
        return status ? <CheckCircleOutlineIcon color="success" sx={{fontSize: 16}} /> :
            <BlockIcon color="error" sx={{fontSize: 16}}/>
    }

    function escolherStatus(status) {
        router.get(route('admin.usuarios.usuario.index', {status: status}))
    }

    return (
        <Layout container titlePage="Usuários" menu="usuarios" submenu="usuarios-contas">
            <div className='row justify-content-between'>
                <div className='col-auto'>
                    <a className='btn btn-primary' href={route('admin.usuarios.usuario.create')}>Cadastrar Usuário</a>
                </div>
                <div className="col-auto">
                    <FormControlLabel control={
                        <Switch
                            defaultChecked={status}
                            onChange={e => escolherStatus(e.target.checked)}/>} label="Mostrar Bloqueados"/>
                </div>
            </div>
            {contas.map((item) => (
                <div className="mb-3 card card-body py-2 cursor-pointer"
                    onClick={() => router.get(route('admin.usuarios.usuario.show', item.id))}>
                    <div className='row'>
                        <div className='col-auto'><Avatar src={'/storage/' + item.foto} sx={{width: 40, height: 40}}/>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className='col'>
                                    <span className='d-block'>{iconeStatus(item.status)} <b>{item.nome}</b></span>
                                    <small
                                        className='d-block'><b>Função:</b> {item.funcao_nome} {item.is_admin ? '[ADMIN]' : ''}</small>
                                </div>
                                <div className='col'>
                                    <small className='d-block'><b>Franquia:</b> {item.franquia_nome}</small>
                                    <small className='d-block'><b>Setor:</b> {item.setor_nome}</small>
                                </div>
                                <div className='col'>
                                    <button className="btn btn-primary btn-sm">Ver</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </Layout>);
}
