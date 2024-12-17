import Layout from '@/Layouts/Layout';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoClienteFiles from "@/Components/Pedidos/DadosPedidoClienteFiles";
import DadosPedidoFiles from "@/Components/Pedidos/DadosPedidoFiles";
import DadosProdutosCompleta from "@/Components/Pedidos/DadosProdutosCompleta";
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro";
import DadosPedidoFinanceiroFiles from "@/Components/Pedidos/DadosPedidoFinanceiroFiles";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTable from "@/Components/Cards/CardTable";
import {ListCheck, Tags, Truck} from "react-bootstrap-icons";
import {Avatar, Stack, TextField, Typography} from "@mui/material";
import Link from "@/Components/Link.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import DadosPedidoFrete from "@/Components/Pedidos/DadosPedidoFrete.jsx";
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney3.jsx";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import {router} from "@inertiajs/react";
import LeadsDados from "@/Components/Leads/LeadsDados.jsx";

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
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Pedidos({pedido, lead, produtos, historico, transportadoras, anotacoesHistorico, historicoAcompanhamento, sacHistorico, urlPrevious}) {
    const [value, setValue] = React.useState(0);

    const [frete, setFrete] = React.useState(false);
    const [freteValor, setFreteValor] = useState(pedido.frete.preco);
    const [freteTransportadora, setFreteTransportadora] = useState(pedido.frete.transportadora_id);
    const [freteRastreio, setFreteRastreio] = useState(pedido.frete.rastreio);
    const [anotacoesMsg, setAnotacoesMsg] = useState();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const atualizarFrete = () => {
        router.post(route('admin.pedidos.fretes.update', pedido.id),
            {frete_transportadora: freteTransportadora, frete_valor: freteValor, frete_rastreio: freteRastreio, _method: 'PUT'})
        setFrete(false)
    }

    const adicionarAnotacoes = () => {
        if (anotacoesMsg) router.post(route('auth.pedidos.add-anotacoes', {pedido_id: pedido.id, mensagem: anotacoesMsg}))
        setAnotacoesMsg('')
    }

    return (
        <Layout empty titlePage="Informações do Pedido" menu="pedidos" submenu="pedidos-lista" voltar={urlPrevious}>

            <div className="row justify-content-between mb-3">
                <div className="col">
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Pedido" {...a11yProps(0)} />
                        <Tab label="Cliente" {...a11yProps(1)} />
                        <Tab label="Faturamento" {...a11yProps(2)} />
                        <Tab label="Financeiro" {...a11yProps(3)} />
                        <Tab label="Frete" {...a11yProps(4)} />
                        <Tab label="Anexos" {...a11yProps(5)} />
                        <Tab label="Histórico" {...a11yProps(6)} />
                        <Tab label="Anotações" {...a11yProps(7)} />
                        <Tab label="SAC" {...a11yProps(8)} />
                    </Tabs>
                </div>
                <div className="col-auto m-0">
                    <Link label="Editar" href={route('admin.pedidos.edit', pedido.id)}/>
                </div>
            </div>

            <Box sx={{width: '100%'}}>
                {/*Pedido*/}
                <TabPanel value={value} index={0}>
                    <CardContainer>
                        <CardBody>
                            <DadosPedido dados={pedido}/>
                        </CardBody>
                    </CardContainer>

                    {produtos.length > 0 && <DadosProdutosCompleta dados={produtos} valorFrete={pedido.frete.preco} isFinanceiro={pedido.financeiro.is_financeiro}/>}

                </TabPanel>

                {/*Cliente*/}
                <TabPanel value={value} index={1}>
                    <LeadsDados dados={lead}/>
                </TabPanel>

                {/*Faturamento*/}
                <TabPanel value={value} index={2}>
                    <CardContainer>
                        <CardBody>
                            <DadosPedidoCliente dados={pedido}/>
                        </CardBody>
                    </CardContainer>

                    <DadosPedidoClienteFiles dados={pedido}/>
                </TabPanel>

                {/*Financeiro*/}
                <TabPanel value={value} index={3}>
                    <CardContainer>
                        <CardBody>
                            <DadosPedidoFinanceiro dados={pedido}/>
                        </CardBody>
                    </CardContainer>

                    <DadosPedidoFinanceiroFiles dados={pedido}/>
                </TabPanel>

                {/*Frete*/}
                <TabPanel value={value} index={4}>
                    <CardContainer>
                        <CardTitle title="Frete" icon={<Truck size={22}/>}/>
                        <CardBody>
                            <DadosPedidoFrete dados={pedido}/>
                        </CardBody>
                    </CardContainer>
                    <CardContainer>
                        <CardBody>
                            {!frete && <button className="btn btn-primary" onClick={() => setFrete(true)}>
                                {pedido.frete.transportadora_id ? 'Editar Frete' : 'Adicionar Frete'}
                            </button>}
                            {frete && <div className="row">
                                <div className="col-md-3">
                                    <TextFieldMoney label="Valor do Frete" defaultValue={freteValor} set={setFreteValor}/>
                                </div>
                                <div className="col-md-3">
                                    <TextField label="Transportadora" select fullWidth defaultValue={freteTransportadora}
                                               onChange={e => setFreteTransportadora(e.target.value)}>
                                        {transportadoras.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                                    </TextField>
                                </div>
                                <div className="col-md-3">
                                    <TextField label="Código Rastreio" fullWidth defaultValue={freteRastreio}
                                               onChange={e => setFreteRastreio(e.target.value)}/>
                                </div>
                                <div className="col-md-3">
                                    <button className="btn btn-primary" onClick={atualizarFrete}>Salvar</button>
                                </div>
                            </div>}
                        </CardBody>
                    </CardContainer>
                </TabPanel>

                {/*Anexos*/}
                <TabPanel value={value} index={5}>
                    <DadosPedidoFiles dados={pedido}/>
                </TabPanel>

                {/*Historico*/}
                <TabPanel value={value} index={6}>
                    <CardContainer>
                        <CardTable title="Histórico dos Status" icon={<ListCheck size="23"/>}>
                            <table className="table-1">
                                <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Prazo</th>
                                    <th>Responsável</th>
                                    <th>Status</th>
                                    <th>Anotações</th>
                                </tr>
                                </thead>
                                <tbody>
                                {historico.map((dado, index) => {
                                    return (
                                        <tr key={index}>
                                            <td scope="row">
                                                {dado.data}
                                            </td>
                                            <td className="col-1">
                                                {dado.prazo} dias
                                            </td>
                                            <td>
                                                {dado.usuario}
                                            </td>
                                            <td>
                                                {dado.status}
                                            </td>
                                            <td>
                                                {dado.obs}
                                            </td>
                                        </tr>)
                                })}
                                </tbody>
                            </table>
                        </CardTable>
                    </CardContainer>

                    {/*Historico Acompanhamento*/}
                    {historicoAcompanhamento.length > 0 &&
                        <CardContainer>
                            <CardTable>
                                <span><b>Histórico de Acompanhamento do Pedido</b></span>
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Autor</th>
                                        <th>Mensagem</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {historicoAcompanhamento.map((dado, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row" className="col-2">
                                                    {dado.data}
                                                </th>
                                                <td>
                                                    {dado.nome}
                                                </td>
                                                <td>
                                                    {dado.msg}
                                                </td>
                                            </tr>)
                                    })}
                                    </tbody>
                                </table>
                            </CardTable>
                        </CardContainer>
                    }
                </TabPanel>
                <TabPanel value={value} index={7}>
                    {anotacoesHistorico.length > 0 && (
                        <CardContainer>
                            <CardTable title="Anotações" icon={<Tags size="23"/>}>
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
                            </CardTable>
                        </CardContainer>
                    )}
                    <CardContainer>
                        <CardTitle title="Adicionar Anotação" icon={<Tags size="23"/>}/>
                        <CardBody>
                            <TextField label="Mensagem" multiline fullWidth minRows={3} value={anotacoesMsg}
                                       onChange={e => setAnotacoesMsg(e.target.value)}/>
                            <button className="btn btn-success mt-4" onClick={adicionarAnotacoes}>Salvar</button>
                        </CardBody>
                    </CardContainer>
                </TabPanel>
                <TabPanel value={value} index={8}>
                    <CardContainer>
                        <CardTable title="SAC" icon={<Tags size="23"/>}>
                            {!!sacHistorico.length &&
                                <table className="table-1">
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
                                            <td><a className="btn btn-primary btn-sm" href={route('admin.chamados.show', item.id)}>Abrir</a></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            }
                        </CardTable>
                        <CardBody>
                            {!!!sacHistorico.length && <Typography marginBottom={3}>Não há registros de SAC.</Typography>}
                            <a className="btn btn-primary" href={route('admin.chamados.create', {pedido_id: pedido.pedido.id})}>
                                Abrir SAC
                            </a>
                        </CardBody>
                    </CardContainer>
                </TabPanel>
            </Box>
        </Layout>
    )
}







