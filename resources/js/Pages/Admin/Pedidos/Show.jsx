import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import Typography from "@mui/material/Typography";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoClienteFiles from "@/Components/Pedidos/DadosPedidoClienteFiles";
import DadosPedidoFiles from "@/Components/Pedidos/DadosPedidoFiles";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import DadosProdutosCompleta from "@/Components/Pedidos/DadosProdutosCompleta";
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro";
import DadosPedidoFinanceiroFiles from "@/Components/Pedidos/DadosPedidoFinanceiroFiles";
import DadosProdutos from "@/Components/Pedidos/DadosProdutos";
import {router, usePage} from "@inertiajs/react";
import GridOnIcon from '@mui/icons-material/GridOn';

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
                <Box sx={{p: 3}}>
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

export default function Pedidos({pedido, produtos, historico, historicoAcompanhamento, urlPrevious}) {
    const [value, setValue] = React.useState(0);
    const funcaoUsuario = usePage().props.auth.user.is_financeiro == 1

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout container titlePage="Informações do Pedido" menu="pedidos" submenu="pedidos-lista"
                voltar={urlPrevious}>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <div className="row justify-content-between">
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

                </Box>
                <TabPanel value={value} index={0}>
                    <div className="card card-body mb-4">
                        <div className="row">
                            <div className="col">
                                <DadosPedido dados={pedido}/>
                            </div>
                        </div>
                    </div>
                    {produtos.length > 0 && <div className="card card-body mb-4">
                        <div className="row">
                            <div className="col">
                                {funcaoUsuario ?
                                    <DadosProdutosCompleta dados={produtos}/> :
                                    <DadosProdutos dados={produtos}/>}
                            </div>
                        </div>
                    </div>}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className="card card-body mb-4">
                        <DadosPedidoCliente dados={pedido}></DadosPedidoCliente>
                    </div>

                    <DadosPedidoClienteFiles dados={pedido}></DadosPedidoClienteFiles>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div className="card card-body mb-4">
                        <div className="row">
                            <div className="mb-4 col">
                                <DadosPedidoFinanceiro dados={pedido}/>
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-4">
                        {pedido.pedido_files.planilha_pedido &&
                            <div className="col">
                                <div className="card card-body">
                                    <label>Imagem da Planilha de Pedidos</label>
                                    <ImagePdf url={pedido.pedido_files.planilha_pedido}/>
                                </div>
                            </div>
                        }
                        <DadosPedidoFinanceiroFiles dados={pedido}/>
                    </div>

                </TabPanel>
                {/*Anexos*/}
                <TabPanel value={value} index={3}>
                    <DadosPedidoFiles dados={pedido}></DadosPedidoFiles>
                </TabPanel>
                {/*Historico*/}
                <TabPanel value={value} index={4}>
                    <div className="card card-body">
                        <span><b>Histórico do Pedido</b></span>
                        <table className="table">
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
                                        <th scope="row">
                                            {dado.data}
                                        </th>
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
                    </div>

                    {/*Historico Acompanhamento*/}
                    {historicoAcompanhamento.length > 0 &&
                        <div className="card card-body">
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
                        </div>
                    }
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <h6>SAC</h6>
                    <a href={route('admin.chamados.create', {id: pedido.pedido.id})}
                       className="btn btn-primary">
                        ABRIR SAC
                    </a>
                </TabPanel>
            </Box>
        </Layout>
    )
}







