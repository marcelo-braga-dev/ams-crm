import {useEffect} from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import {Head, Link, useForm} from '@inertiajs/react';
import Layout from "@/Layouts/Admin/Layout";
import {Button, Col, Container, Row, Table} from "reactstrap";
import {TextField} from "@mui/material";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";

export default function Register({setores}) {
    const {data, setData, post, processing, errors} = useForm({
        nome: '',
        email: '',
        senha: '',
        senha_confirmar: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.usuarios.admins.store'));
    };

    return (<Layout titlePage="Cadastrar Admin" container voltar={route('admin.usuarios.usuario.index')}>

        {errors.nome && <Alert severity="error" className={"mb-3"}>{errors.nome}</Alert>}
        {errors.senha && <Alert severity="error" className={"mb-3"}>{errors.senha}</Alert>}
        {errors.email && <Alert severity="error" className={"mb-3"}>{errors.email}</Alert>}
        <form onSubmit={submit}>
            <div className="row">
                <div className="col-md-4">
                    {/*Setores*/}
                    <TextField label="Setor" select required fullWidth
                               defaultValue={data.setor}
                               onChange={e => setData('setor', e.target.value)}>
                        {setores.map((setor, index) => {
                            return (
                                <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                            )
                        })}
                    </TextField>
                </div>
            </div>
            <Row className={"mb-3 mt-3 text-right"}>
                <Col md={"6"}>
                    <TextField label="Nome" id="nome" value={data.nome} required
                               onChange={e => setData('nome', e.target.value)} fullWidth>
                    </TextField>
                </Col>
                <Col md={"6"}>
                    <TextField label="Email" id="email" value={data.email} type={'email'} required
                               onChange={e => setData('email', e.target.value)} fullWidth>
                    </TextField>
                </Col>
            </Row>
            <Row className={"mb-3 text-right"}>
                <Col md={"6"}>
                    <TextField label="Senha" id="senha" type="password" value={data.senha} required
                               onChange={e => setData('senha', e.target.value)} fullWidth>
                    </TextField>
                </Col>
                <Col md={"6"}>
                    <TextField label="Confirmar Senha" id="senha_confirmar" type="password"
                               value={data.senha_confirmar}
                               onChange={e => setData('senha_confirmar', e.target.value)} required fullWidth>
                    </TextField>
                </Col>
            </Row>
            <Row className={"mb-3 text-right"}>
                <Col className={'text-center mt-4'}>
                    <Button color={"primary"} type={'submit'}>Salvar</Button>
                </Col>
            </Row>
        </form>
    </Layout>)
}
