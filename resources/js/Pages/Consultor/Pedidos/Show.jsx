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

export default function Pedidos({dados, produtos, historico}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout titlePage="Pedidos" menu="pedidos-lista" voltar={route('admin.pedidos.index', {id_card:  dados.pedido.id})}>
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Pedido" {...a11yProps(0)} />
                        <Tab label="Cliente" {...a11yProps(1)} />
                        <Tab label="Financeiro" {...a11yProps(2)} />
                        <Tab label="Anexos" {...a11yProps(3)} />
                        <Tab label="Histórico" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className="row mb-4">
                        <div className="col-md-8">
                            <DadosPedido dados={dados}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <DadosProdutos dados={produtos}/>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DadosPedidoCliente dados={dados}/>

                    <hr/>
                    <Typography variant={"h6"}>Arquivos do Cliente</Typography>
                    <DadosPedidoClienteFiles dados={dados}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div className="row">
                        <div className="col mb-4">
                            <h6>Financeiro</h6>
                            <DadosPedidoFinanceiro dados={dados}/>
                        </div>
                        {dados.pedido_files.planilha_pedido &&
                            <div className="col-md-4">
                                <label>Imagem da Planilha de Pedidos</label>
                                <ImagePdf url={dados.pedido_files.planilha_pedido}/>
                            </div>
                        }
                    </div>
                    <div className="row">
                        <div className="col">
                            <DadosPedidoFinanceiroFiles dados={dados}/>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <h6>Documentos</h6>
                    <DadosPedidoFiles dados={dados}></DadosPedidoFiles>
                </TabPanel>
                <TabPanel value={value} index={4}>
                    <h6 className="mb-3">Histórico do Pedido</h6>
                    <div className="table-responsive">
                        <table className="table table-hover">
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
                </TabPanel>
            </Box>
        </Layout>
    );
}







