import Layout from "@/Layouts/Layout.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Grid, Typography} from "@mui/material";
import {Link} from "@inertiajs/react";

const Page = ({cursos}) => {

    return (
        <Layout titlePage="Cursos" menu="cursos" submenu="cursos-index">
            {cursos.map(item => {
                return (
                    <CardContainer>
                        <CardBody>
                            <Link href={route('auth.cursos.curso.show', 1)}>
                                <Grid container spacing={3}>
                                    <Grid item md={4}>
                                        <img src={item.capa} alt="capa"/>
                                    </Grid>
                                    <Grid item md={8}>
                                        <Typography variant="h4">{item.titulo}</Typography>

                                        <Typography variant="h6" marginBottom={2}>{item.sub_titulo}</Typography>

                                        <Typography>{item.descricao}</Typography>

                                        <Grid container spacing={3} marginTop={1}>
                                            <Grid item>
                                                <Typography>Módulos: 0/3</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography>Aulas: 0/13</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography>Avaliações: 0/3</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography>Nota: 0</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography>Graus de Vantagem: 0/1000</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Link>
                        </CardBody>
                    </CardContainer>
                )
            })}

        </Layout>
    )
}
export default Page
