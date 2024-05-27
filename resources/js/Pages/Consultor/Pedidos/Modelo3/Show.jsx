import Layout from '@/Layouts/VendedorLayout/LayoutConsultor';
import Typography from "@mui/material/Typography";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoClienteFiles from "@/Components/Pedidos/DadosPedidoClienteFiles";
import DadosPedidoFiles from "@/Components/Pedidos/DadosPedidoFiles";

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

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function Pedidos({dados, historico}) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout titlePage="Pedidos" voltar={route('admin.pedidos.index', {id_card:  dados.pedido.id})} menu="pedidos-lista">

            <div className="container bg-white rounded">
                <Box sx={{width: '100%'}}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Pedido" {...a11yProps(0)} />
                            <Tab label="Cliente" {...a11yProps(1)} />
                            <Tab label="Anexos" {...a11yProps(2)} />
                            <Tab label="Histórico" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <DadosPedido dados={dados}></DadosPedido>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <DadosPedidoCliente dados={dados}></DadosPedidoCliente>

                        <hr/>
                        <Typography variant={"h6"}>Arquivos do Cliente</Typography>
                        <DadosPedidoClienteFiles dados={dados}></DadosPedidoClienteFiles>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <h6>Documentos</h6>
                        <DadosPedidoFiles dados={dados}></DadosPedidoFiles>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
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
                                            <th scope="row">
                                                {dado.data}
                                            </th>
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
            </div>
        </Layout>
    );
}







