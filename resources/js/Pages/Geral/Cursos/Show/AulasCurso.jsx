import {Box, Button, Grid, IconButton, Stack, Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {TbArrowLeft, TbArrowRight, TbCheck, TbX} from "react-icons/tb";
import {useState} from "react";
import Layout from "@/Layouts/Layout.jsx";
import AvalizacaoModulo from "@/Pages/Geral/Cursos/Show/AvalizacaoModulo.jsx";

const AulasCurso = ({modulo}) => {
    const maxAulas = modulo?.aulas?.length
    const [pagina, setPagina] = useState(0)
    const [avalizacao, setAvaliacao] = useState(false)

    const handleAvancaPagina = () => {
        if (pagina < (maxAulas - 1)) {
            setPagina(value => value + 1)
            setAvaliacao(false)
            return
        }
        setAvaliacao(true)
    }

    const handleVoltarPagina = () => {
        if (pagina >= 1) {
            setPagina(value => value - 1)
        }
        setAvaliacao(false)
    }

    return (
        <Layout titlePage="Cursos" menu="cursos" submenu="cursos-index" voltar>
            <Box>
                <CardContainer>
                    <CardBody>
                        <Grid container justifyContent="space-between">
                            <Grid item><Typography>Funil de Vendas - Método Levelead</Typography></Grid>
                            <Grid item>
                                <Typography> Aulas {maxAulas}</Typography>
                            </Grid>
                        </Grid>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <Grid container justifyContent="space-between" padding={3}>
                            <Grid item>
                                {pagina !== 0 && <IconButton onClick={handleVoltarPagina}>
                                    <TbArrowLeft/>
                                </IconButton>}
                            </Grid>
                            <Grid item>
                                {avalizacao ? <Typography>Avaliação</Typography> : <Typography>Aula {pagina + 1}/{maxAulas}</Typography>}
                            </Grid>
                            <Grid item>
                                {!avalizacao && <IconButton onClick={handleAvancaPagina}>
                                    <TbArrowRight/>
                                </IconButton>}
                            </Grid>
                        </Grid>

                        {avalizacao ?
                            <AvalizacaoModulo avaliacoes={modulo?.avaliacoes}/>
                            : <Box textAlign="center">
                                <img src={modulo?.aulas?.[pagina]?.anexo} alt="capa"/>
                            </Box>
                        }
                    </CardBody>
                </CardContainer>
            </Box>
        </Layout>
    )
}
export default AulasCurso
