import {Head, Link, useForm} from '@inertiajs/inertia-react';
import Layout from "@/Layouts/Admin/Layout";
import {Button, Col, Container, Row, Table} from "reactstrap";
import {TextField} from "@mui/material";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import {Inertia} from "@inertiajs/inertia";

const currencies = [
    {
        value: 'ativo',
        label: 'Ativo',
    },
    {
        value: 'bloqueado',
        label: 'Bloqueado',
    }
];
export default function Edit({usuario}) {
    const {data, setData, post, processing, errors} = useForm({
        nome: usuario.nome,
        email: usuario.email,
        status: usuario.status,
    });

    const submit = (e) => {
        e.preventDefault();

        Inertia.post(route('admin.usuarios.consultores.update', usuario.id), {
            _method: 'put',
            ...data,
        })
    };

    return (<Layout titlePage="Atualizar Dados" button={true} url={route('admin.usuarios.usuario.index')}
                    textButton={'Voltar'}>

        <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 rounded">
            {errors.nome && <Alert severity="error" className={"mb-3"}>{errors.nome}</Alert>}
            {errors.senha && <Alert severity="error" className={"mb-3"}>{errors.senha}</Alert>}
            {errors.email && <Alert severity="error" className={"mb-3"}>{errors.email}</Alert>}
            <form onSubmit={submit}>
                <Typography component="h5">Atualizar dados do usuário</Typography>
                <Row className={"mb-3 mt-4"}>
                    <Col>
                        <TextField label="Nome" id="nome" value={data.nome} required
                                   onChange={e => setData('nome', e.target.value)} fullWidth>
                        </TextField>
                    </Col>
                    <Col>
                        <TextField label="Email" id="email" value={data.email} type={'email'} required
                                   onChange={e => setData('email', e.target.value)} fullWidth>
                        </TextField>
                    </Col>
                    <Col>
                        <TextField
                            select label="Status" defaultValue={data.status}
                            helperText="Status de acesso do usuário"
                            onChange={e => setData('status', e.target.value)}>
                            {currencies.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Col>
                </Row>
                <Row className={"mb-3 text-right"}>
                    <Col className={'text-center mt-4'}>
                        <Button color={"primary"} type={'submit'}>Salvar</Button>
                    </Col>
                </Row>
            </form>
        </Container>
    </Layout>);
}
