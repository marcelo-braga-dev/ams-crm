import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import Typography from "@mui/material/Typography";
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoClienteFiles from "@/Components/Pedidos/DadosPedidoClienteFiles";
import DadosPedidoFiles from "@/Components/Pedidos/DadosPedidoFiles";
import DadosProdutos from "@/Components/Pedidos/DadosProdutos";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import DadosPedidoFinanceiro from "@/Components/Pedidos/DadosPedidoFinanceiro";
import DadosPedidoFinanceiroFiles from "@/Components/Pedidos/DadosPedidoFinanceiroFiles";

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

export default function Pedidos({dados, produtos, historico}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout empty titlePage="Pedidos" menu="pedidos-lista" voltar={route('consultor.pedidos.index', {id_card: dados.pedido.id})}>
            <Box sx={{width: '100%'}}>
                <div className="card card-body mb-4">
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Pedido" {...a11yProps(0)} />
                        <Tab label="Cliente" {...a11yProps(1)} />
                        <Tab label="Financeiro" {...a11yProps(2)} />
                        <Tab label="Anexos" {...a11yProps(3)} />
                        <Tab label="Histórico" {...a11yProps(3)} />
                    </Tabs>
                </div>


                <TabPanel value={value} index={0} className="p-0 m-0 ">
                    <div className="card card-body mb-4">
                        <div className="row">
                            <div className="col-md-8">
                                <DadosPedido dados={dados}/>
                            </div>
                        </div>
                    </div>
                    {!!produtos.length &&
                        <div className="card card-body mb-4">
                            <div className="row">
                                <div className="col">
                                    <DadosProdutos dados={produtos}/>
                                </div>
                            </div>
                        </div>
                    }
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
                    {(dados.pedido_files.planilha_pedido || !!dados.length) &&
                    <div className="card card-body mb-4">
                        <div className="row row-cols-4">
                            {dados.pedido_files.planilha_pedido &&
                                <div className="col-md-4">
                                    <span className="d-block">Imagem da Planilha de Pedidos</span>
                                    <ImagePdf url={dados.pedido_files.planilha_pedido}/>
                                </div>
                            }
                            <DadosPedidoFinanceiroFiles dados={dados}/>
                        </div>
                    </div>}
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
            </Box>
        </Layout>
    )
        ;
}







