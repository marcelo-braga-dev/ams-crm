import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import Avatar from "@mui/material/Avatar";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockIcon from "@mui/icons-material/Block";
import * as React from "react";

export default function ({ usuario }) {
    return (
        <Layout titlePage="Dados do Usuário" menu="usuarios" submenu="usuarios-contas">
            <div className="row justify-content-between">
                <div className="col">
                    <div className="row">
                        <div className="col-auto"><Avatar alt={usuario.nome} src={usuario.foto}
                            sx={{ width: 80, height: 80 }} /></div>
                        <div className="col-8">
                            <h6>Nome: {usuario.nome}</h6>
                            <span className="d-block">ID: #{usuario.id}</span>
                            <span className="d-block">Email: {usuario.email}</span>
                            <span className="d-block">Status: {usuario.status} </span>
                            <span className="d-block">Franquia: {usuario.franquia}</span>
                            <span className="d-block">Função: {usuario.funcao}</span>
                            <span className="d-block">Setor: {usuario.setor}</span>
                            <span className="d-block">Data Cadastro: {usuario.data_cadastro}</span>
                            <span className="d-block">Último Login: {usuario.ultimo_login}</span>
                            {usuario.supervisor &&
                                <span className="pt-3 d-block"><b>Supervisor(a): {usuario.supervisor}</b></span>}
                        </div>
                    </div>
                </div>
                <div className="col-auto text-right">
                    <a className="btn btn-primary"
                        href={route('admin.usuarios.usuario.edit', usuario.id)}>Editar</a>
                </div>
            </div>
        </Layout>
    )
}