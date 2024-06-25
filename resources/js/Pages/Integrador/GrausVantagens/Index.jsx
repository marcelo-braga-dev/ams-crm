import Layout from "@/Layouts/Layout";
import MemoryGame from './MemoryGame/Game'
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import {Grid, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {Coin, Database, EmojiLaughing, Grid3x3, HandThumbsUp} from "react-bootstrap-icons";

import GrausCoin from './MemoryGame/Images/COIN.jpg';

const Index = () => {
    return (
        <Layout titlePage="Graus de Vantagens" menu="graus-vantagens" submenu="graus-vantagens-pontos">
            <Grid container>
                <Grid item md={3}></Grid>
                <Grid item>

                </Grid>
                <Grid item></Grid>
            </Grid>

            <Grid container justifyContent="center" spacing={5}>
                <Grid item md={2} xl={3}>
                    <CardContainer>
                        <CardBody>
                            <Stack spacing={2}>
                                <Stack direction="row">

                                    <Typography variant="h4" align="center" marginBottom={0}>
                                        Jogue e ganhe pontos no Graus de Vantagens e troque por produtos na loja!
                                    </Typography>
                                </Stack>
                                <img src={GrausCoin} alt=""/>

                                <Typography variant="body1" align="justify">
                                    Em cada pedido que você realiza, você ganha changes para jogar e ganhar ainda mais moedas Graus de Vantagens para trocar por produtos
                                    em nossa loja.
                                </Typography>
                            </Stack>
                        </CardBody>
                    </CardContainer>
                    <div className="pe-4" style={{height: '450px', overflow: 'auto'}}>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                            <CardContainer>
                                <CardBody>
                                    <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
                                        <Database size="30" color="darkorange"/>
                                        <Stack spacing={0}>
                                            <Typography>Giros Ganhos</Typography>
                                            <Typography variant="body2">Pedido: #1234</Typography>
                                        </Stack>
                                        <Typography variant="h4" color="darkorange">3</Typography>

                                        <Typography fontSize={10} align="center">25/06/2024<br/>14:28:45</Typography>
                                    </Stack>
                                </CardBody>
                            </CardContainer>
                        ))}
                    </div>
                </Grid>
                <Grid item md="auto">
                    <Grid container justifyContent="center" gap={4} marginBottom={2}>
                        <Grid item md={5}>
                            <CardContainer>
                                <CardBody>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar sx={{width: 50, height: 50, bgcolor: 'orange'}}><Database size="35" color="black"/></Avatar>
                                        <Stack direction="column" spacing={1}>
                                            <Typography variant="body1">Giros da Sorte</Typography>
                                            <Typography variant="h4" align="center">26</Typography>
                                        </Stack>
                                    </Stack>
                                </CardBody>
                            </CardContainer>
                        </Grid>
                        <Grid item md={5}>
                            <CardContainer>
                                <CardBody>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar sx={{width: 50, height: 50, bgcolor: 'orange'}}><Coin size="35" color="black"/></Avatar>
                                        <Stack direction="column" spacing={1}>
                                            <Typography variant="body1">Seus Pontos</Typography>
                                            <Typography variant="h4" align="center">132,02</Typography>
                                        </Stack>
                                    </Stack>
                                </CardBody>
                            </CardContainer>
                        </Grid>
                    </Grid>
                    <CardContainer>
                        <CardBody>
                            <Stack spacing={1} marginBottom={1} direction="row" alignItems="center" justifyContent="center">
                                <HandThumbsUp size="25" color="darkorange"/>
                                <Typography variant="h3">Jogo da Memória</Typography>
                            </Stack>
                            <Typography variant="body2" align="center" marginBottom={1}>
                                Vire os cartões para encontrar os pares e ganhar os bônus!
                            </Typography>
                            <MemoryGame/>
                        </CardBody>
                    </CardContainer>
                </Grid>
                <Grid item md={2} xl={3}>
                    <div className="pe-4" style={{height: '700px', overflow: 'auto'}}>
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                            <CardContainer>
                                <CardBody>
                                    <Stack direction="row" spacing={4} alignItems="center" justifyContent="space-between">
                                        <Coin size="30" color="darkorange"/>
                                        <Typography>Bônus Ganhos</Typography>
                                        <Typography variant="h4" color="darkorange">125</Typography>
                                        <Typography fontSize={10} align="center">25/06/2024<br/>14:28:45</Typography>
                                    </Stack>
                                </CardBody>
                            </CardContainer>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Index
