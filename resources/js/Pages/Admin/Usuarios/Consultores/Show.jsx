import Layout from '@/Layouts/Admin/Layout';
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import * as React from "react";

export default function Index({usuario}) {

    function iconeStatus(status) {
        return status === 'ativo' ? <CheckCircleOutlineIcon color="success" fontSize="small"/> :
            <BlockIcon color="error" fontSize="small"/>
    }

    return (<Layout titlePage="Informações do Usuário" container
                    voltar={route('admin.usuarios.usuario.index')}
                    menu="usuarios" submenu="contas">
        <div className="row justify-content-between">
            <div className="col">
                {/*        <td className="pe-3">*/}
                <div className="row">
                    <div className="col-auto"><Avatar alt={usuario.nome} src={usuario.foto}
                                                      sx={{width: 100, height: 100}}/></div>
                    <div className="col-8">
                        <h6>Nome: {usuario.nome}</h6>
                        <span className="d-block">ID: #{usuario.id}</span>
                        <span className="d-block">Email: {usuario.email}</span>
                        <span className="d-block">Status: {usuario.status} {iconeStatus(usuario.status)}</span>
                        <span className="d-block">Função: {usuario.tipo}</span>
                        <span className="d-block">Setor: {usuario.setor}</span>
                        <span className="d-block">Data Cadastro: {usuario.data_cadastro}</span>
                        <span className="d-block">Último Login: {usuario.ultimo_login}</span>
                    </div>
                </div>
            </div>
            <div className="col-auto text-right">
                <a className="btn btn-primary"
                   href={route('admin.usuarios.consultores.edit', usuario.id)}>Editar</a>
            </div>
        </div>
    </Layout>);
}
