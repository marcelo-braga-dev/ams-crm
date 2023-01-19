import Layout from '@/Layouts/Admin/Layout';
import {Inertia} from '@inertiajs/inertia'
import {Button, Card, Col, Container, Row, Table} from "reactstrap";
import * as React from 'react';
import Typography from "@mui/material/Typography";

import {useForm} from '@inertiajs/inertia-react';
import TextFieldMoney from "@/Components/Inputs/TextFieldMoney";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";

export default function Pedidos({dados}) {
    const {data, put, setData} = useForm({
        'preco_custo': null
    })

    function submit(e) {
        e.preventDefault()
        Inertia.post(route('admin.lancado.update', dados.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    // ConvertMoney
    let valor = 0
    if (data.preco_custo) {
        valor = data.preco_custo.replace('.', '').replace(',', '').replace(/\D/g, '');
        valor /= 100
    }

    function precoBruto(venda) {
        return new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(
            parseFloat(venda - valor))
    }

    // ConvertMoney - fim

    return (<Layout titlePage="Pedidos" button={true} url={route('admin.pedidos.index')} textButton={'Voltar'}>

        <Container fluid="lg" className="bg-white px-lg-6 py-lg-4 mb-4 rounded">
            <Row>
                <Col>
                    <DadosPedido dados={dados}/>
                </Col>
                <Col>
                    <DadosPedidoCliente dados={dados}/>
                </Col>
            </Row>
        </Container>
        <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 rounded">
            <form onSubmit={submit}>
                <Row>
                    <Col className={"mb-4"} lg={"4"}>
                        <Typography variant={"body1"}>Preço de Venda: {dados.preco.convertido}</Typography>
                    </Col>
                </Row>
                <Row>
                    <Col className={"mb-4"} lg={"4"}>
                        <TextFieldMoney required
                                        label="Preço Custo" value={data.preco_custo}
                                        setData={setData} index="preco_custo"></TextFieldMoney>
                    </Col>
                </Row>
                <Row>
                    <Col className={"mb-3"} lg={"4"}>
                        <Typography>Preço Bruto: R$ {precoBruto(dados.preco.preco_float)}</Typography>
                    </Col>
                </Row>
                <Button className={"mt-3"} color={"primary"}>Salvar</Button>
            </form>
        </Container>
    </Layout>);
}
