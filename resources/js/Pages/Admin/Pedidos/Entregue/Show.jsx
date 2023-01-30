import Layout from '@/Layouts/Admin/Layout';
import {Button, Card, Col, Container, Row} from "reactstrap";
import Typography from "@mui/material/Typography";
import ConvertMoney from "@/Components/ConvertMoney";
import Paper from "@mui/material/Paper";

import {useForm} from '@inertiajs/react'
import { router } from '@inertiajs/react'


export default function Pedidos({pedido, cliente, img}) {
    const {data, put} = useForm()

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.entregue.update', pedido.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (<Layout titlePage="Pedidos" button={true} url={route('admin.pedidos.index')} textButton={'Voltar'}>

        <Container fluid="lg" className="bg-white px-lg-6 py-lg-5 rounded">
            <Typography>Atualizar Preço</Typography>
            <Typography>Fornecedor</Typography>
            <form onSubmit={submit}>
                <Button className={"mt-3"} color={"primary"}>Atualizar Status</Button>
            </form>
        </Container>
    </Layout>);
}
