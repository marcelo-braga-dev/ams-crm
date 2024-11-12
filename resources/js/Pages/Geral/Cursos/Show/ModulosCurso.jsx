import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Avatar, Box, Button, Grid, Typography} from "@mui/material";
import {Link} from "@inertiajs/react";
import {TbSchool} from "react-icons/tb";

const modulosTeste = [
    {
        id: 7,
        curso_id: 1,
        nome: 'xx',
        numero_modulo: 7,
        aulas: {
            atual: 10,
            total: 20,
        },
        avaliacoes: {
            nota: 8
        },
        graus_vantagem: {
            conquistado: 100,
            maximo: 500,
        },
    }
]

const ModulosCurso = ({modulos}) => {

    return (
        <Box>
            {modulos.map(item => (
                <CardContainer key={item.id}>
                    <CardBody>
                        <Link href={route('auth.cursos.modulo.aulas', {modulo: item.id})}>
                            <Grid container spacing={3}>
                                <Grid item md={1} alignItems="center" textAlign="center" justifyContent="center" display="flex">
                                    <Avatar><TbSchool size={25}/></Avatar>
                                </Grid>
                                <Grid item md={10}>
                                    <Box marginBottom={1}>
                                        <Typography variant="body2">Módulo {item.numero_modulo}</Typography>
                                        <Typography variant="h5">{item.titulo}</Typography>
                                    </Box>

                                    <Grid container spacing={3}>
                                        <Grid item>
                                            <Typography>Aulas: {`${0}/${item.aulas_qtd}`}</Typography>
                                        </Grid>
                                        <Grid item>
                                            {/*<Typography>Nota da Avalização: {item.avaliacoes.nota}</Typography>*/}
                                        </Grid>
                                        <Grid item>
                                            {/*<Typography>Graus de Vantagem: {`${item.graus_vantagem.conquistado}/${item.graus_vantagem.maximo}`}</Typography>*/}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={1} textAlign="end">
                                    <Button>Abrir</Button>
                                </Grid>
                            </Grid>
                        </Link>
                    </CardBody>
                </CardContainer>
            ))}
        </Box>
    )
}
export default ModulosCurso
