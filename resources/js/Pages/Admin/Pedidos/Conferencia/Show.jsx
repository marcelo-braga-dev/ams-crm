import * as React from 'react';
import Layout from '@/Layouts/Admin/Layout';
import {Button, Card, Col, Container, Row} from "reactstrap";
import Typography from "@mui/material/Typography";

import {useForm} from '@inertiajs/inertia-react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Alert, TextField} from "@mui/material";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoClienteFiles from "@/Components/Pedidos/DadosPedidoClienteFiles";
import DadosPedidoFiles from "@/Components/Pedidos/DadosPedidoFiles";

export default function Pedidos({pedido}) {

    const {put, setData} = useForm({
        'reprovado': ''
    })

    // Modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

// Modal -fim

    function submit(e) {
        e.preventDefault()
        put(route('admin.conferencia.update', pedido.pedido.id))
    }

    return (
        <Layout titlePage="Pedidos" button={true} url={route('admin.pedidos.index')} textButton={'Voltar'}>

            <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 rounded">
                {pedido.pedido.alerta && <Alert severity="info">
                    <b>PEDIDO PASSOU POR REVISÃO</b><br/>
                    {pedido.pedido.alerta}
                </Alert>}
                <Row>
                    <Col className={"mb-3"}>
                        <DadosPedido dados={pedido} />
                    </Col>
                    <Col className={"mb-3"}>
                        <DadosPedidoCliente dados={pedido} />
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col className={"mb-3"}>
                        <Typography variant={"h6"}>Documentos:</Typography>
                    </Col>
                </Row>
                <DadosPedidoFiles dados={pedido} />
                <DadosPedidoClienteFiles dados={pedido} />
                <hr/>
                <form onSubmit={submit}>
                    <Row className={"mt-4 text-center"}>
                        <Col></Col>
                        <Col>
                            <Button color={"primary"} component={"button"} type={"submit"}>Aprovar Pedido</Button>
                        </Col>
                        <Col>
                            <Button color="danger" onClick={handleOpen}>Reprovar Pedido</Button>
                        </Col>
                    </Row>
                </form>
            </Container>

            {/*MODAL*/}
            <Modal
                open={open}
                onClose={handleClose}>
                <Box sx={style} className="rounded">
                    <Typography className="mb-4" id="modal-modal-title" variant="h6" component="h2">
                        Reprovar Pedido
                    </Typography>
                    <form onSubmit={submit}>
                        <TextField
                            className="mb-4"
                            label="Motivos da reprovação"
                            multiline fullWidth rows={6} required
                            onChange={event => setData('reprovado', event.target.value)}/>
                        <div className="text-center">
                            <Button type="submit" color="primary">Salvar</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
            {/*MODAL - fim*/}
        </Layout>);
}
