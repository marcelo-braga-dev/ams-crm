import Layout from '@/Layouts/Layout';
import * as React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import {Avatar, Button, DialogContent, Grid, IconButton, Stack, TextField, Typography} from "@mui/material";
import {router} from "@inertiajs/react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import Link from "@/Components/Link.jsx";
import Dialog from "@mui/material/Dialog";
import {useState} from "react";
import {TbEye, TbKey} from "react-icons/tb";
import AlertError from "@/Components/Alerts/AlertError.jsx";

export default function Index({contas, status}) {
    const [openDialog, setOpenDialog] = useState(false)

    const [userId, setUserId] = useState('')
    const [senha, setSenha] = useState('')
    const [senhaConfirmar, setSenhaConfirmar] = useState('')

    function iconeStatus(status) {
        return status ? <CheckCircleOutlineIcon color="success" sx={{fontSize: 16}}/> :
            <BlockIcon color="error" sx={{fontSize: 16}}/>
    }

    function escolherStatus(status) {
        router.get(route('admin.usuarios.usuario.index', {status: status}))
    }

    const handleOpenDialog = (userId) => {
        console.log(userId)
        setUserId(userId)
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const alterarSenha = () => {
        if (senha.length < 4) {
            AlertError("A senha deve ter no mínimo 4 dígitos.")
            return
        }

        if (senha !== senhaConfirmar) {
            AlertError("Senha e Repetir Senha não coincidem.")
            return
        }

        router.post(route('auth.perfil.atualizar-senha'), {
            user_id: userId,
            nova_senha: senha,
            confirmar_senha: senhaConfirmar,
            _method: 'put'
        }, {onSuccess: () => handleCloseDialog()})
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
                    <CardBody>
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
                                <Stack spacing={2}>
                                    <IconButton
                                        onClick={() => router.get(route('admin.usuarios.usuario.show', item.id))}>
                                        <TbEye color="blue"/>
                                    </IconButton>
                                    <IconButton onClick={() => handleOpenDialog(item.id)}><TbKey color="orange"/></IconButton>
                                </Stack>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>
            ))}
            <Dialog open={openDialog}
                    onClose={handleCloseDialog}
                    fullWidth
                    maxWidth="xs"
            >
                <DialogContent>
                    <Stack spacing={2}>
                        <Typography variant="h5">Alterar Senha</Typography>
                        <TextField
                            label="Nova Senha"
                            type="password"
                            fullWidth
                            onChange={e => setSenha(e.target.value)}
                        />
                        <TextField
                            label="Repetir Senha"
                            type="password"
                            fullWidth
                            onChange={e => setSenhaConfirmar(e.target.value)}
                        />
                        <Button color="success" onClick={alterarSenha}>Alterar Senha</Button>
                    </Stack>
                </DialogContent>
            </Dialog>
        </Layout>);
}
