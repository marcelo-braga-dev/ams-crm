import IntegradorLayout from "@/Layouts/VendedorLayout/LayoutConsultor";
import React, {useState} from 'react';
import { router } from '@inertiajs/react';
import {Container, FormControl, FormHelperText, InputLabel, Select, TextField} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from "@mui/material/Typography";
import {Row, Col, Button} from 'reactstrap';
import MenuItem from "@mui/material/MenuItem";

export default function Show({auth, errors, cliente}) {
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        email: "",
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post(route('consultor.leads.main.index'), values)
    }

    const [age, setAge] = React.useState('');

    const handleChangeSelect = (event) => {
        setAge(event.target.value);
    };

    return (
        <IntegradorLayout
            auth={auth}
            errors={errors}
            titlePage="Informações do Cliente"
            button={true}
            url={route('consultor.leads.main.index')} textButton={'Voltar'}>


            <Container fixed className="bg-white px-lg-5 py-lg-5 mb-4">
                <form onSubmit={handleSubmit}>
                    <Row container rowSpacing={3} spacing={3}>
                        <Col md={12}>
                            Dados do Cliente
                        </Col>
                        <Col md={4}>
                            <Typography component={"p"}>NOME: {cliente.nome}</Typography>
                            <Typography component={"p"}>EMPRESA: {cliente.empresa}</Typography>
                        </Col>
                        <Col md={4}>
                            <Typography component={"p"}>EMAIL: {cliente.email}</Typography>
                            <Typography component={"p"}>TELEFONE: {cliente.telefone}</Typography>
                        </Col>
                        <Col md={4}>
                            <Typography component={"p"}>CIDADE: {cliente.cidade}</Typography>
                            <Typography component={"p"}>ESTADO: {cliente.estado}</Typography>
                        </Col>
                    </Row>
                </form>
            </Container>
            <Container fixed className="bg-white px-lg-5 py-lg-5">
                <form onSubmit={handleSubmit}>
                    <Row container rowSpacing={3} spacing={3}>
                        <Col md={3}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChangeSelect}
                                >
                                    <MenuItem value={1}>Em Atendimento</MenuItem>
                                </Select>
                            </FormControl>
                        </Col>
                        <Col md={3}>
                            <Button color={'primary'} type={'submit'}>Atualizar</Button>
                        </Col>
                    </Row>
                </form>
            </Container>
        </IntegradorLayout>
    );
}



