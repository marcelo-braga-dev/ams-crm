import Layout from '@/Layouts/Admin/Layout';
import {Button, Card, Col, Container, Row, Table} from "reactstrap";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Tab
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

// Tab - fim

export default function Index({usuarios}) {
    // Tab
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    // Tab - fim
    return (<Layout titlePage="Consultores">

        <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 rounded">
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Consultores" {...a11yProps(0)} />
                        <Tab label="Supervisores" {...a11yProps(1)} />
                        <Tab label="Admins" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                {/*Consultores*/}
                <TabPanel value={value} index={0}>
                    <Row className={"mb-3 text-right"}>
                        <Col>
                            <Button color={"warning"} href={route('admin.usuarios.consultores.create')}>Cadastrar
                                Consultor</Button>
                        </Col>
                    </Row>
                    <Table hover responsive>
                        <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Nome</th>
                            <th>Setor</th>
                            <th>Status</th>
                            <th>Email</th>
                            <th>Ação</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usuarios.consultores.map((dados) => {
                            return (
                                <tr key={dados.id} className={"align-middle"}>
                                    <th scope="row">
                                        {dados.id}
                                    </th>
                                    <td>
                                        {dados.nome}
                                    </td>
                                    <td>
                                        {dados.setor.nome}
                                    </td>
                                    <td>
                                        {dados.status}
                                    </td>
                                    <td>
                                        {dados.email}
                                    </td>
                                    <td>
                                        <Button color={"primary"}
                                                href={route('admin.usuarios.consultores.show', dados.id)}
                                                size="sm">Ver</Button>
                                    </td>
                                </tr>)
                        })}
                        </tbody>
                    </Table>
                </TabPanel>
                {/*Consultores - fim */}
                {/*Supervisores*/}
                <TabPanel value={value} index={1}>
                    <Row className={"mb-3 text-right"}>
                        <Col>
                            <Button color={"warning"} href={route('admin.usuarios.supervisores.create')}>
                                Cadastrar Supervisor
                            </Button>
                        </Col>
                    </Row>
                    <Table hover responsive>
                        <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Nome</th>
                            <th>Setor</th>
                            <th>Status</th>
                            <th>Email</th>
                            {/*<th>Ação</th>*/}
                        </tr>
                        </thead>
                        <tbody>
                        {usuarios.supervisores.map((dados) => {
                            return (
                                <tr key={dados.id} className={"align-middle"}>
                                    <th scope="row">
                                        {dados.id}
                                    </th>
                                    <td>
                                        {dados.nome}
                                    </td>
                                    <td>
                                        {dados.setor.nome}
                                    </td>
                                    <td>
                                        {dados.status}
                                    </td>
                                    <td>
                                        {dados.email}
                                    </td>
                                    {/*<td>*/}
                                    {/*    <Button color={"primary"}*/}
                                    {/*            href={route('admin.usuarios.consultores.show', dados.id)}*/}
                                    {/*            size="sm">Ver</Button>*/}
                                    {/*</td>*/}
                                </tr>)
                        })}
                        </tbody>
                    </Table>
                </TabPanel>
                {/*Supervisores - fim*/}
                {/*Admins*/}
                <TabPanel value={value} index={2}>
                    <Row className={"mb-3 text-right"}>
                        <Col>
                            <Button color={"warning"} href={route('admin.usuarios.admins.create')}>
                                Cadastrar Admin
                            </Button>
                        </Col>
                    </Row>
                    <Table hover responsive>
                        <thead>
                        <tr>
                            <th>#ID</th>
                            <th>Nome</th>
                            <th>Setor</th>
                            <th>Status</th>
                            <th>Email</th>
                            <th>Ação</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usuarios.admins.map((dados) => {
                            return (
                                <tr key={dados.id} className={"align-middle"}>
                                    <th scope="row">
                                        {dados.id}
                                    </th>
                                    <td>
                                        {dados.nome}
                                    </td>
                                    <td>
                                        {dados.setor.nome}
                                    </td>
                                    <td>
                                        {dados.status}
                                    </td>
                                    <td>
                                        {dados.email}
                                    </td>
                                    <td>
                                        <Button color={"primary"}
                                                href={route('admin.usuarios.consultores.show', dados.id)}
                                                size="sm">Ver</Button>
                                    </td>
                                </tr>)
                        })}
                        </tbody>
                    </Table>
                </TabPanel>
                {/*Admins - fim*/}
            </Box>

        </Container>
    </Layout>);
}
