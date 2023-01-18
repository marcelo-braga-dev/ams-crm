import Layout from '@/Layouts/Consultor/Layout';
import {Inertia} from '@inertiajs/inertia'

import React from 'react';
import {useForm, usePage} from '@inertiajs/inertia-react';
import {Container, Row, Col, Form, Button} from 'reactstrap';

//step
import {TextField, Typography} from "@mui/material";
import ImagePdf from "@/Components/Inputs/ImagePdf";
export default function Create({id, files}) {
    const {data, setData, progress} = useForm({
        file_recibo: null
    });
    function submit(e) {
        e.preventDefault()
        Inertia.post(route('consultor.aguardando-pagamento.update', id), {
            _method: 'put',
            ...data
        })
    }

    return (<Layout url={route('consultor.pedidos.index')} textButton="Voltar" titlePage="Pedido Faturado" >
            <Container fluid="lg" className="bg-white px-lg-6 py-lg-5">
                <Row>
                    <Col>
                        <Typography variant={"body1"} component="p">Baixar Nota/Boleto</Typography>
                        <ImagePdf url={files.url_nota_fiscal}/>
                    </Col>
                </Row>
            </Container>

        </Layout>
    )
}

