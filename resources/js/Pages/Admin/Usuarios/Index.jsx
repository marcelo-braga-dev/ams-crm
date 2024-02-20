import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import {Button, Card, Col, Container, Row, Table} from "reactstrap";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import BlockIcon from '@mui/icons-material/Block';
import {Avatar} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {router} from "@inertiajs/react";

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

export default function Index({usuarios, status}) {
    // Tab
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Tab - fim

    function iconeStatus(status) {
        return status === 'ativo' ? <CheckCircleOutlineIcon color="success"/> :
            <BlockIcon color="error"/>
    }

    function escolherStatus(status) {
        router.get(route('admin.usuarios.usuario.index', {status: !status}))
    }

    return (
        <Layout container titlePage="Usuários" menu="usuarios" submenu="usuarios-contas">
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <div className="row">
                        <div className="col">
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Consultores" {...a11yProps(0)} />
                                <Tab label="Supervisores" {...a11yProps(1)} />
                                <Tab label="Admins" {...a11yProps(2)} />
                            </Tabs>
                        </div>
                        <div className="col-auto">
                            <FormControlLabel control={<Switch defaultChecked={status}/>}
                                              label={status ? "Ativos" : "Todos"}
                                              onChange={event => escolherStatus(event.target.checked)}/>
                        </div>
                    </div>
                </Box>
                {/*Consultores*/}
                <TabPanel value={value} index={0}>
                    <Row className={"mb-3 text-right"}>
                        <Col>
                            <a className="btn btn-dark" href={route('admin.usuarios.consultores.create')}>
                                Cadastrar Consultor
                            </a>
                        </Col>
                    </Row>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr className="text-sm">
                                <th>Nome</th>
                                <th>Setor</th>
                                <th className="text-center">Franquia</th>
                                <th>Ação</th>
                            </tr>
                            </thead>
                            <tbody>
                            {usuarios.consultores.map((dados, index) => {
                                return (
                                    <tr className="cursor-pointer"
                                        key={index}
                                        onClick={() => window.location.href = route('admin.usuarios.consultores.show', dados.id)}>

                                        <td className="text-wrap">
                                            <div className="row">
                                                <div className="col-auto">
                                                    <Avatar src={dados.foto} sx={{width: 60, height: 60}}/>
                                                </div>
                                                <div className="col-auto">
                                                    {iconeStatus(dados.status)} {dados.nome}<br/>
                                                    <small className="d-block">{dados.email}</small>
                                                    <small>ID: #{dados.id}</small>
                                                    <small className="d-block">Último
                                                        Acesso {dados.ultimo_login}</small>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="pt-4">
                                            <small className="badge rounded-pill"
                                                   style={{backgroundColor: dados.setor.cor ?? 'black'}}>{dados.setor.nome}</small>
                                        </td>
                                        <td className="text-center pt-3">
                                            {dados.franquia}
                                        </td>
                                        <td>
                                            <Button color="primary"
                                                    href={route('admin.usuarios.consultores.show', dados.id)}
                                                    size="sm">Ver</Button>
                                        </td>
                                    </tr>)
                            })}
                            </tbody>
                        </table>
                    </div>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <Row className={"mb-3 text-right"}>
                        <Col>
                            <a className="btn btn-dark" href={route('admin.usuarios.supervisores.create')}>
                                Cadastrar Supervisor
                            </a>
                        </Col>
                    </Row>
                    <Table hover responsive>
                        <thead>
                        <tr className="text-sm">
                            <th></th>
                            <th>Nome</th>
                            <th className="text-center">Status</th>
                            <th>Setor</th>
                            <th className="text-center">Último Acesso</th>
                            <th>Ação</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usuarios.supervisores.map((dados, index) => {
                            return (
                                <tr className="cursor-pointer"
                                    key={index}
                                    onClick={() => window.location.href = route('admin.usuarios.consultores.show', dados.id)}>
                                    <td>
                                        <Avatar src={dados.foto}/>
                                    </td>
                                    <td className="text-wrap">
                                        {dados.nome}<br/>
                                        <small className="d-block">{dados.email}</small>
                                        <small>ID: #{dados.id}</small>
                                    </td>
                                    <td className="text-center">
                                        {iconeStatus(dados.status)}
                                    </td>
                                    <td>
                                        <small className="badge rounded-pill"
                                               style={{backgroundColor: dados.setor.cor ?? 'black'}}>{dados.setor.nome}</small>
                                    </td>
                                    <td className="text-center">
                                        <small>{dados.ultimo_login}</small>
                                    </td>
                                    <td>
                                        <Button color={"primary"}
                                                href={route('admin.usuarios.supervisores.show', dados.id)}
                                                size="sm">Ver</Button>
                                    </td>
                                </tr>)
                        })}
                        </tbody>
                    </Table>
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <Row className={"mb-3 text-right"}>
                        <Col>
                            <a className="btn btn-dark" href={route('admin.usuarios.admins.create')}>
                                Cadastrar Admin
                            </a>
                        </Col>
                    </Row>
                    <Table hover responsive>
                        <thead>
                        <tr className="text-sm">
                            <th></th>
                            <th>Nome</th>
                            <th className="text-center">Status</th>
                            <th>Setor</th>
                            <th className="text-center">Último Acesso</th>
                            <th>Ação</th>
                        </tr>
                        </thead>
                        <tbody>
                        {usuarios.admins.map((dados, index) => {
                            return (
                                <tr className="cursor-pointer"
                                    key={index}
                                    onClick={() => window.location.href = route('admin.usuarios.consultores.show', dados.id)}>
                                    <td>
                                        <Avatar src={dados.foto}/>
                                    </td>
                                    <td className="text-wrap">
                                        {dados.nome}<br/>
                                        <small className="d-block">{dados.email}</small>
                                        <small>ID: #{dados.id}</small>
                                    </td>
                                    <td className="text-center">
                                        {iconeStatus(dados.status)}
                                    </td>
                                    <td>
                                        <small className="badge rounded-pill"
                                               style={{backgroundColor: dados.setor.cor ?? 'black'}}>{dados.setor.nome}</small>
                                    </td>
                                    <td className="text-center">
                                        <small>{dados.ultimo_login}</small>
                                    </td>
                                    <td>
                                        <a className="btn btn-primary btn-sm"
                                           href={route('admin.usuarios.consultores.show', dados.id)}>
                                            Ver
                                        </a>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </TabPanel>
            </Box>
        </Layout>);
}
