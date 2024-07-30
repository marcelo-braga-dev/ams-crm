import Layout from '@/Layouts/Layout';
import * as React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import {Avatar, Grid, Stack} from "@mui/material";
import {router} from "@inertiajs/react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import Link from "@/Components/Link.jsx";

export default function Index({contas, status}) {

    function iconeStatus(status) {
        return status ? <CheckCircleOutlineIcon color="success" sx={{fontSize: 16}}/> :
            <BlockIcon color="error" sx={{fontSize: 16}}/>
    }

    function escolherStatus(status) {
        router.get(route('admin.usuarios.usuario.index', {status: status}))
    }

    return (
        <Layout container titlePage="Usuários" menu="usuarios" submenu="usuarios-contas">
            <div className='row justify-content-between'>
                <div className='col-auto'>
                    <Link label="Cadastrar Usuário" href={route('admin.usuarios.usuario.create')}/>
                </div>
                <div className="col-auto">
                    <FormControlLabel control={
                        <Switch defaultChecked={status}
                            onChange={e => escolherStatus(e.target.checked)}/>} label="Mostrar Bloqueados"/>
                </div>
            </div>
            {contas.map((item) => (
                <CardContainer>
                    <CardBody className="cursor-pointer" onClick={() => router.get(route('admin.usuarios.usuario.show', item.id))}>
                        <div className="row">
                            <div className="col-auto">
                                <Avatar src={'/storage/' + item.foto} sx={{width: 40, height: 40}}/>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <div className="col-12">
                                        {iconeStatus(item.status)} <b>{item.nome}</b>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="row">
                                            <div className="col">
                                                <small className='d-block'><b>Função:</b> {item.funcao_nome} {item.is_admin ? '[ADMIN]' : ''}</small>
                                            </div>
                                            <div className="col">
                                                <small className='d-block'><b>Franquia:</b> {item.franquia_nome}</small>
                                            </div>
                                            <div className="col">
                                                <small className='d-block'><b>Setor:</b> {item.setor_nome}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-auto">
                                <button className="btn btn-primary btn-sm mb-0 mt-2">Ver</button>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>
            ))}
        </Layout>);
}
