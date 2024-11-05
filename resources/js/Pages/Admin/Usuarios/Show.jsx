import Layout from '@/Layouts/Layout';
import Avatar from "@mui/material/Avatar";
import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import {Person} from "react-bootstrap-icons";
import Link from "@/Components/Link";
import {Stack, Typography} from "@mui/material";

export default function ({usuario}) {
    return (
        <Layout titlePage="Dados do Usuário" menu="usuarios" submenu="usuarios-contas"
                voltar={route('admin.usuarios.usuario.index')}>
            <CardContainer>
                <CardTitle title="Dados do Usuário" icon={<Person size="22" color="black"/>}>
                    <Link label="Editar" href={route('admin.usuarios.usuario.edit', usuario.id)}/>
                </CardTitle>
                <CardBody>
                    <div className="row">
                        <div className="col-auto">
                            <Avatar alt={usuario.nome} src={usuario.foto} sx={{width: 80, height: 80}}/>
                        </div>
                        <div className="col-8">
                            <Typography variant="h5" marginBottom={1}>Nome: {usuario.nome}</Typography>
                            <div className="row justify-content-between">
                                <div className="col-auto">
                                    <Stack spacing={1}>
                                        <Typography fontSize={15}><span className="me-2 text-bold">ID:</span> #{usuario.id}</Typography>
                                        <Typography fontSize={15}><span className="me-2 text-bold">E-mail:</span> {usuario.email}</Typography>
                                        <Typography fontSize={15}><span className="me-2 text-bold">Status:</span> {usuario.status ? 'Ativo' : 'Bloqueado'}</Typography>
                                    </Stack>
                                </div>
                                <div className="col-auto">
                                    <Stack spacing={1}>
                                        <Typography fontSize={15}><span className="me-2 text-bold">Franquia:</span> {usuario.franquia}</Typography>
                                        <Typography fontSize={15}><span className="me-2 text-bold">Função:</span> {usuario.funcao}</Typography>
                                        <Typography fontSize={15}><span className="me-2 text-bold">Setor:</span> {usuario.setor}</Typography>
                                    </Stack>
                                </div>
                                <div className="col-auto">
                                    <Stack spacing={1}>
                                        <Typography fontSize={15}><span className="me-2 text-bold">Data Cadastro:</span> {usuario.data_cadastro}</Typography>
                                        <Typography fontSize={15}><span className="me-2 text-bold">Último Login:</span> {usuario.ultimo_login}</Typography>
                                        {usuario.supervisor &&
                                            <Typography fontSize={15}><span className="me-2 text-bold">Supervisor(a):</span> {usuario.supervisor}</Typography>}
                                    </Stack>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
