import IntegradorLayout from "@/Layouts/VendedorLayout/LayoutConsultor";
import React, {useState} from 'react';
import { router } from '@inertiajs/react';
import {Container, TextField} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import {Button} from 'reactstrap';


export default function Create({auth, errors}) {
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

    return (
        <IntegradorLayout
            auth={auth}
            errors={errors}
            titlePage="Cadastrar Clientes"
            button={true}
            url={route('consultor.leads.main.index')} textButton={'Voltar'}>


            <Container fixed className="bg-white px-lg-6 py-lg-5">
                <form onSubmit={handleSubmit}>
                    <Grid container rowSpacing={3} spacing={3}>
                        <Grid md={12}>
                            Dados do Cliente
                        </Grid>
                        <Grid md={6}>
                            <TextField id="outlined-basic" label="Nome:" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid md={6}>
                            <TextField id="outlined-basic2" label="Empresa:" variant="outlined" fullWidth required/>
                        </Grid>
                        <Grid md={6}>
                            <TextField id="outlined-basic2" label="Email:" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid md={6}>
                            <TextField id="outlined-basic2" label="Telefone:" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid md={6}>
                            <TextField id="outlined-basic2" label="Cidade:" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid md={6}>
                            <TextField id="outlined-basic2" label="Estado:" variant="outlined" fullWidth/>
                        </Grid>
                        <Grid>
                            <Button type="submit" color={"primary"}>Salvar</Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </IntegradorLayout>
    );
}



