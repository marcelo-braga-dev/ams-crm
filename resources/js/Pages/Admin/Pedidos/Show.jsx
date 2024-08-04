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
import {router, usePage} from "@inertiajs/react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTable from "@/Components/Cards/CardTable";
import {ListCheck, Paperclip, Tags} from "react-bootstrap-icons";
import CardTitleDefault from "@/Components/Cards/CardTitleDefault";

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

export default function Pedidos({pedido, produtos, historico, historicoAcompanhamento, sacHistorico, urlPrevious}) {
    const [value, setValue] = React.useState(0);
    const funcaoUsuario = usePage().props.auth.user.is_financeiro == 1

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout empty titlePage="Informações do Pedido" menu="pedidos" submenu="pedidos-lista" voltar={urlPrevious}>

            <div className="row justify-content-between mb-3">
                <div className="col">
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Pedido" {...a11yProps(0)} />
                        <Tab label="Cliente" {...a11yProps(1)} />
                        <Tab label="Financeiro" {...a11yProps(2)} />
                        <Tab label="Anexos" {...a11yProps(3)} />
                        <Tab label="Histórico" {...a11yProps(4)} />
                        <Tab label="SAC" {...a11yProps(5)} />
                    </Tabs>
                </div>
                <div className="col-auto m-0">
                    <a className="btn btn-primary btn-sm"
                       href={route('admin.pedidos.edit', pedido.id)}>Editar</a>
                </div>
            </div>

            <CardContainer>
                <CardBody>
                    <Box sx={{width: '100%'}}>
                        <TabPanel value={value} index={0}>
                            <DadosPedido dados={pedido}/>

                            {produtos.length > 0 &&
                                <div className="mt-4">
                                    <DadosProdutosCompleta dados={produtos} isFinanceiro={pedido.financeiro.is_financeiro}/>
                                </div>
                            }
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <DadosPedidoCliente dados={pedido}/>

                            <DadosPedidoClienteFiles dados={pedido}/>
                        </TabPanel>
                        {/*Financeiro*/}
                        <TabPanel value={value} index={2}>
                            <div className="row">
                                <div className="mb-4 col">
                                    <DadosPedidoFinanceiro dados={pedido}/>
                                </div>
                            </div>

                            <div className="row row-cols-4">
                                <DadosPedidoFinanceiroFiles dados={pedido}/>
                            </div>

                        </TabPanel>
                        {/*Anexos*/}
                        <TabPanel value={value} index={3}>
                            <DadosPedidoFiles dados={pedido}/>
                        </TabPanel>
                        {/*Historico*/}
                        <TabPanel value={value} index={4}>
                            <CardTitleDefault title="Histórico dos Status" icon={<ListCheck size="23"/>}/>
                            <CardTable>
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

                            {/*Historico Acompanhamento*/}
                            {historicoAcompanhamento.length > 0 &&
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
                            }
                        </TabPanel>
                        <TabPanel value={value} index={5}>
                            <CardTitleDefault title="SAC" icon={<Tags size="23"/>}/>
                            <CardTable>
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
                                                <td><a className="btn btn-primary btn-sm" href={route('admin.chamados.show', item.id)}>Abrir</a></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                }

                                {!!!sacHistorico.length && 'Não há registros de SAC.'}

                                <div className="col mt-4">
                                    <a className="btn btn-primary" href={route('admin.chamados.create', {pedido_id: pedido.pedido.id})}>
                                        Abrir SAC
                                    </a>
                                </div>
                            </CardTable>
                        </TabPanel>
                    </Box>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}







