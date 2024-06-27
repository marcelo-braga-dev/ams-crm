import React from "react";
import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import {Grid, Stack, Typography} from "@mui/material";
import {
    Box, CardChecklist, Clipboard2CheckFill, FileEarmarkPdfFill, FileTextFill, Paperclip, Person
} from "react-bootstrap-icons";

import CardTitle from "@/Components/Cards/CardTitle";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function CustomTabPanel(props) {
    const {children, value, index} = props;

    return value === index && children
}

const Page = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout titlePage="Dados do Orçamento" menu="orcamentos">
            <Tabs value={value} onChange={handleChange} sx={{
                '& .MuiTabs-indicator': {
                    display: 'none'
                },
                borderBottom: 'none'
            }}>
                <Tab label="Orçamento"/>
                <Tab label="Anexos"/>
            </Tabs>

            <CustomTabPanel value={value} index={0}>


                <div className="row">
                    <div className="col">
                        <CardContainer>
                            <CardTitle title="Dados do Cliente" icon={<Person size={22}/>}/>
                            <CardBody>
                                <div className="row">
                                    <div className="col">
                                        <Typography>Nome: Cliente Teste 1</Typography>
                                        <Typography>Localização: Cidade/Estado</Typography>
                                    </div>
                                </div>
                            </CardBody>
                        </CardContainer>
                    </div>
                    <div className="col">
                        <CardContainer>
                            <CardTitle title="Dados do Orçamento" icon={<CardChecklist size={22}/>}/>
                            <CardBody>
                                <div className="row">
                                    <div className="col">
                                        <Typography>Status do Orçamento: Novo</Typography>
                                        <Typography>Média de Consumo: 800 kWh/mês</Typography>
                                        <Stack direction="row" spacing={4}>
                                            <Typography>Estrutura: Colonial</Typography>
                                            <Typography>Tensão: 220V</Typography>
                                        </Stack>
                                    </div>
                                </div>
                            </CardBody>
                        </CardContainer>
                    </div>
                </div>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <CardContainer>
                    <CardTitle title="Anexos" icon={<Paperclip size={22}/>}/>
                    <CardBody>
                    </CardBody>
                </CardContainer>
            </CustomTabPanel>

            <CardContainer>
                <CardBody>
                    <Grid container spacing={5}>
                        <Grid item>
                            <a className="btn btn-danger mb-0" target="_blank" href={route('consultor.orcamentos.orcamento-pdf')}>
                                <FileEarmarkPdfFill className="me-1" size={18}/>Gerar PDF Proposta
                            </a>
                        </Grid>
                        <Grid item>
                            <button className="btn btn-success mb-0"><Clipboard2CheckFill className="me-1" size={18}/>Realizar Pedido</button>
                        </Grid>
                        <Grid item>
                            <button className="btn btn-info mb-0"><FileTextFill className="me-1" size={18}/>Gerar Contrato</button>
                        </Grid>
                    </Grid>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Gerador Fotovoltaico" icon={<Box size={20}/>}/>
                <CardBody>
                    <div className="row mb-4">
                        <div className="col">
                            <Typography variant="h4" color="green">Valor Total: R$ 12.546,45</Typography>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <CardContainer>
                                <CardBody>
                                    <table className="table-1">
                                        <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>SKU</th>
                                            <th>Produtos</th>
                                            <th>Qtd.</th>
                                            <th>Valor Uni.</th>
                                            <th>Valor Total</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td className="text-center"><Typography>1</Typography></td>
                                            <td><Typography>4618</Typography></td>
                                            <td>
                                                <Typography>
                                                    Gerador edeltec solar solis 8,33 kwp mon. 220v fibromadeira (6k/555w)
                                                </Typography>
                                            </td>
                                            <td className="text-center"><Typography>8</Typography></td>
                                            <td><Typography noWrap>R$ 45.654,25</Typography></td>
                                            <td><Typography noWrap>R$ 124.456,54</Typography></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center"><Typography>2</Typography></td>
                                            <td><Typography>3254</Typography></td>
                                            <td>
                                                <Typography>
                                                    Cabo edeltec solar pv 1.8kvcc 6mm preto nbr 16612 - bobina 50mts
                                                </Typography>
                                            </td>
                                            <td className="text-center"><Typography>2</Typography></td>
                                            <td><Typography>R$ 654,25</Typography></td>
                                            <td><Typography>R$ 4.456,54</Typography></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </CardBody>
                            </CardContainer>
                        </div>
                        <div className="col">
                            <CardContainer>
                                <CardBody>
                                    <table className="table-1">
                                        <tbody>
                                        <tr>
                                            <td><Typography>Potência do Gerador</Typography></td>
                                            <td><Typography>5,4 kWp</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Typography>Inversor Growwat</Typography></td>
                                            <td><Typography>2kW</Typography></td>
                                        </tr>
                                        <tr>
                                            <td><Typography>Módulos Jinko</Typography></td>
                                            <td><Typography>440W</Typography></td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </CardBody>
                            </CardContainer>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}

export default Page
