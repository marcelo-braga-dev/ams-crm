import Layout from '@/Layouts/Admin/Layout';
import {Button, Card, Col, Container, Row, Table} from "reactstrap";
import Typography from "@mui/material/Typography";
import ConvertMoney from "@/Components/ConvertMoney";
import Paper from "@mui/material/Paper";

import {useForm} from '@inertiajs/inertia-react'


export default function Index({consultores}) {

    return (<Layout titlePage="Consultores">

        <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 rounded">
            <Row className={"mb-3 text-right"}>
                <Col><Button color={"warning"} href={route('admin.consultores.create')}>Cadastrar Consultor</Button></Col>
            </Row>
            <Table hover responsive>
                <thead>
                <tr>
                    <th>#ID</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Ação</th>
                </tr>
                </thead>
                <tbody>
                {consultores.map((colsultor) => {
                    return (
                    <tr key={colsultor.id} className={"align-middle"}>
                        <th scope="row">
                            {colsultor.id}
                        </th>
                        <td>
                            {colsultor.name}
                        </td>
                        <td>
                            {colsultor.email}
                        </td>
                        <td>
                            <Button color={"primary"} href={route('admin.consultores.show', colsultor.id)} size="sm">Ver</Button>
                        </td>
                    </tr>)
                })}
                </tbody>
            </Table>
        </Container>
    </Layout>);
}
