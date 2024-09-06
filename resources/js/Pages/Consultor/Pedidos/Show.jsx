import Layout from "@/Layouts/Layout";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoClienteFiles from "@/Components/Pedidos/DadosPedidoClienteFiles";
import DadosPedidoFiles from "@/Components/Pedidos/DadosPedidoFiles";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro";
import DadosPedidoFinanceiroFiles from "@/Components/Pedidos/DadosPedidoFinanceiroFiles";
import DadosProdutosCompleta from "@/Components/Pedidos/DadosProdutosCompleta.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardTable from "@/Components/Cards/CardTable.jsx";
import {Tags} from "react-bootstrap-icons";
import {Avatar, Stack, TextField, Typography} from "@mui/material";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {router} from "@inertiajs/react";
import {useState} from "react";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Pedidos({dados, produtos, historico, sacHistorico, anotacoesHistorico}) {
    const [value, setValue] = React.useState(0);
    const [anotacoesMsg, setAnotacoesMsg] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const adicionarAnotacoes = () => {
        if (anotacoesMsg) router.post(route('auth.pedidos.add-anotacoes', {pedido_id: dados.id, mensagem: anotacoesMsg}))
        setAnotacoesMsg('')
    }

    return (
        <Layout empty titlePage="Pedidos" menu="pedidos" submenu="pedidos-lista"
                voltar={route('consultor.pedidos.index', {id_card: dados.pedido.id})}>
            <Box sx={{width: '100%'}}>
                <div className="card card-body mb-4">
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Pedido" {...a11yProps(0)} />
                        <Tab label="Cliente" {...a11yProps(1)} />
                        <Tab label="Financeiro" {...a11yProps(2)} />
                        <Tab label="Anexos" {...a11yProps(3)} />
                        <Tab label="Histórico" {...a11yProps(4)} />
                        <Tab label="Anotaçoes" {...a11yProps(5)} />
                        <Tab label="SAC" {...a11yProps(6)} />
                    </Tabs>
                </div>

                <TabPanel value={value} index={0} className="p-0 m-0 ">
                    <CardContainer>
                        <CardBody>
                            <DadosPedido dados={dados}/>
                        </CardBody>
                    </CardContainer>

                    {!!produtos.length && (
                        <CardContainer>
                            <CardBody>
                                <DadosProdutosCompleta dados={produtos}/>
                            </CardBody>
                        </CardContainer>
                    )}

                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className="card card-body mb-4">
                        <DadosPedidoCliente dados={dados}/>
                    </div>

                    <DadosPedidoClienteFiles dados={dados}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div className="card card-body mb-4">
                        <div className="row">
                            <div className="col">
                                <DadosPedidoFinanceiro dados={dados}/>
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-4">
                        {dados.pedido_files.planilha_pedido &&
                            <div className="col-md-4">
                                <span className="d-block">Imagem da Planilha de Pedidos</span>
                                <ImagePdf url={dados.pedido_files.planilha_pedido}/>
                            </div>
                        }
                        <DadosPedidoFinanceiroFiles dados={dados}/>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <DadosPedidoFiles dados={dados}/>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <div className="card card-body mb-4">
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Prazo</th>
                                    <th>Status</th>
                                    <th>Anotações</th>
                                </tr>
                                </thead>
                                <tbody>
                                {historico.map((dado) => {
                                    return (
                                        <tr key={dado.id} className={"align-middle"}>
                                            <td scope="row">
                                                {dado.data}
                                            </td>
                                            <td>
                                                {dado.prazo} dias
                                            </td>
                                            <td>
                                                {dado.status}
                                            </td>
                                            <td>
                                                {dado.obs}
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <CardContainer>
                        <CardTable title="Anotações" icon={<Tags size="23"/>}>
                            {anotacoesHistorico.length > 0 &&
                                <table className="table-1">
                                    <thead>
                                    <tr>
                                        <th>Autor</th>
                                        <th>Mensagem</th>
                                        <th>Data</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {anotacoesHistorico.map(item => (
                                        <tr>
                                            <td className="col-3">
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Avatar src={item.foto} sx={{width: 30, height: 30}}/>
                                                    <Typography>{item.nome}</Typography>
                                                </Stack>
                                            </td>
                                            <td><Typography>{item.mensagem}</Typography></td>
                                            <td className="col-2"><Typography>{item.data}</Typography></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            }
                        </CardTable>
                    </CardContainer>
                    <CardContainer>
                        <CardTitle title="Adicionar Anotação" icon={<Tags size="23"/>}/>
                        <CardBody>
                            <TextField label="Mensagem" multiline fullWidth minRows={3} value={anotacoesMsg}
                                       onChange={e => setAnotacoesMsg(e.target.value)}/>
                            <button className="btn btn-success mt-4" onClick={adicionarAnotacoes}>Salvar</button>
                        </CardBody>
                    </CardContainer>
                </TabPanel>
                <TabPanel value={value} index={6}>
                    <div className="card card-body">
                        {!!sacHistorico.length &&
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th>Autor</th>
                                    <th>Título</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {sacHistorico.map(item => (
                                    <tr>
                                        <td className="col-1">{item.data}</td>
                                        <td className="col-1">{item.status}</td>
                                        <td className="col-1">{item.autor}</td>
                                        <td>{item.titulo}</td>
                                        <td><a className="btn btn-primary" href={route('consultor.chamados.show', item.id)}>Ver</a></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        }
                        {!!!sacHistorico.length && 'Não há registros de SAC.'}

                        <div className="col mt-4">
                            <a className="btn btn-primary" href={route('consultor.chamados.create', {pedido_id: dados.pedido.id})}>
                                Abrir SAC
                            </a>
                        </div>
                    </div>
                </TabPanel>
            </Box>
        </Layout>
    )
        ;
}







