import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import {Grid, Stack, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import {BoxSeam, Calculator, Person} from "react-bootstrap-icons";
import {round} from "lodash";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import {useState} from "react";
import {router} from "@inertiajs/react";

export default function Create({lead}) {
    const [fetchKits, setFetchKits] = useState(false)

    const toggleKits = () => {
        setFetchKits(e => !e)
    }

    return (<Layout empty menu="pedidos" container titlePage="Gerar Orçamento" voltar={route('consultor.pedidos.index')}>
        <CardContainer>
            <CardTitle title="Cliente" icon={<Person size="23"/>}/>
            <CardBody>
                <div className="row">
                    <div className="col">
                        <Typography><b>Nome:</b> {lead.nome} (#{lead.id})</Typography>
                    </div>
                    <div className="col">
                        <Typography><b>Localidade:</b> {lead.cidade}/{lead.estado}</Typography>
                    </div>
                </div>
            </CardBody>
        </CardContainer>

        <CardContainer>
            <CardTitle title="Calcular Potência do Gerador" icon={<Calculator size="23"/>}/>
            <CardBody>
                <div className="row mb-4">
                    <div className="col-md-3">
                        <TextField
                            label="Média Consumo" fullWidth
                            InputProps={{endAdornment: <InputAdornment position="start">kW/h</InputAdornment>}}/>
                    </div>
                    <div className="col-md-3">
                        <TextField label="Estrutura" select fullWidth>
                            <MenuItem value={1}>Colonial</MenuItem>
                            <MenuItem value={2}>Fibromadeira</MenuItem>
                            <MenuItem value={3}>Fibrometal</MenuItem>
                            <MenuItem value={4}>Fibrometal Rosca Dupla</MenuItem>
                            <MenuItem value={5}>Laje</MenuItem>
                            <MenuItem value={6}>Metálico</MenuItem>
                            <MenuItem value={7}>Solo</MenuItem>
                            <MenuItem value={8}>S/Estrutura</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-md-2">
                        <TextField label="Tensão" select fullWidth>
                            <MenuItem value={1}>220V/Bifásico</MenuItem>
                            <MenuItem value={2}>220V/Trifásico</MenuItem>
                            <MenuItem value={2}>380V/Bifásico</MenuItem>
                            <MenuItem value={4}>380V/Trifásico</MenuItem>
                        </TextField>
                    </div>
                </div>
                <div>
                    <button className="btn btn-warning" onClick={() => toggleKits()}>Pesquisar Kits</button>
                </div>
            </CardBody>
        </CardContainer>

        {fetchKits &&
            <CardContainer>
                <CardTitle title="Escolha o Gerador" icon={<BoxSeam size="23"/>}/>
                <CardBody>
                    <div className="row row-cols-4">
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(item => (
                            <div className="col">
                                <CardContainer>
                                    <CardBody>
                                        <img alt="" src="/storage/produtos/gerador_1.jpg"/>
                                        <Typography fontWeight="bold" align="center">Gerador Solar SAJ {round(item * 1.22 + 4.3, 2)} kWp 220V Colonial</Typography>
                                        <Typography variant="body2" align="right" color="gray">ID {item * 10 + 15}</Typography>
                                        <Typography>Inversor: Growwat</Typography>
                                        <Typography>Módulos: Jinko</Typography>
                                        <Stack marginTop={2}>
                                            <Typography color="green" variant="h4">R$ {convertFloatToMoney(item * 1000 + 4514 * item + 15487)}</Typography>
                                            <button className="btn btn-warning mt-3"
                                                    onClick={() => router.get(route('consultor.orcamentos.show', item))}>Selecionar</button>
                                        </Stack>
                                    </CardBody>
                                </CardContainer>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </CardContainer>
        }
    </Layout>)
}









