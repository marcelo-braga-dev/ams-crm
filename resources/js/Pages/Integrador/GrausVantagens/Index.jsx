import Layout from "@/Layouts/Layout";
import MemoryGame from './MemoryGame/Game'
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import {Grid, Stack, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {Coin, Database, EmojiLaughing, Grid3x3, HandThumbsUp} from "react-bootstrap-icons";

import GrausCoin from './MemoryGame/Images/COIN.jpg';

import AMS from './MemoryGame/Images/AMS.png';
import img1 from './MemoryGame/Images/CLAMPER.png';
import img2 from './MemoryGame/Images/COIN.jpg';
import img3 from './MemoryGame/Images/DEYE.png';
import img4 from './MemoryGame/Images/GROWATT.png';
import img5 from './MemoryGame/Images/HELIUS.png';
import img6 from './MemoryGame/Images/HONOR SOLAR.png';
import img7 from './MemoryGame/Images/OSDA.png';
import img8 from './MemoryGame/Images/SOLIS.png';

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
                                            <Typography></Typography>
                                            <Typography variant="body1" color="darkorange">Graus Ganho: </Typography>
                                            <Typography variant="body2">Pedido: #{54 * item + 14}</Typography>
                                        </Stack>
                                        <Typography variant="h4" color="darkorange">{item * 10 + 105}</Typography>
                                        <button className="btn btn-warning">Jogar</button>
                                        {/*<Typography fontSize={10} align="right">25/06/2024<br/>14:28:45</Typography>*/}
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
                                            <Typography variant="body1">Seus Graus</Typography>
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
                                <Coin size="25" color="darkorange"/>
                                <Typography variant="h3">Caça ao Tesouro</Typography>
                            </Stack>
                            <Typography variant="body2" align="center" marginBottom={1}>
                                Vire os cartões para encontrar os pares e ganhar os bônus!
                            </Typography>
                            <MemoryGame/>
                        </CardBody>
                    </CardContainer>
                </Grid>
                <Grid item md={2} xl={3}>
                    <div className="pe-4 mb-4" style={{height: '350px', overflow: 'auto'}}>
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
                    <CardContainer>
                        <CardBody>
                            <Typography variant="body1">Suas Chances</Typography>
                            <table>
                                <tbody>
                                <tr>
                                    <td><img alt="img" src={img2} style={{width: '150px'}}/></td>
                                    <td><Typography variant="h5" color="darkorange">2x Graus</Typography></td>
                                </tr>
                                <tr>
                                    <td><img alt="img" src={img1} style={{width: '150px'}}/></td>
                                    <td><Typography variant="h5">1,7x Graus</Typography></td>
                                </tr>
                                <tr>
                                    <td><img alt="img" src={img3} style={{width: '150px'}}/></td>
                                    <td><Typography variant="h5">1,6x Graus</Typography></td>
                                </tr>
                                <tr>
                                    <td><img alt="img" src={img4} style={{width: '150px'}}/></td>
                                    <td><Typography variant="h5">1,5x Graus</Typography></td>
                                </tr>
                                <tr>
                                    <td><img alt="img" src={img5} style={{width: '150px'}}/></td>
                                    <td><Typography variant="h5">1,4x Graus</Typography></td>
                                </tr>
                                <tr>
                                    <td><img alt="img" src={img6} style={{width: '150px'}}/></td>
                                    <td><Typography variant="h5">1,3x Graus</Typography></td>
                                </tr>
                                <tr>
                                    <td><img alt="img" src={img7} style={{width: '150px'}}/></td>
                                    <td><Typography variant="h5">1,2x Graus</Typography></td>
                                </tr>
                                <tr>
                                    <td><img alt="img" src={img8} style={{width: '180px'}}/></td>
                                    <td><Typography variant="h5">1,1x Graus</Typography></td>
                                </tr>
                                </tbody>
                            </table>

                            <Stack direction="row" spacing={2} alignItems="center">


                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center">

                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center">

                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center">

                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center">

                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center">

                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center">

                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center">

                            </Stack>
                        </CardBody>
                    </CardContainer>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default Index
