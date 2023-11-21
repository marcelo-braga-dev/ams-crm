import Layout from '@/Layouts/AdminLayout/LayoutAdmin';
import {Button, Card, Col, Container, Row} from "reactstrap";
import Typography from "@mui/material/Typography";
import ConvertMoney from "@/Components/ConvertMoney";
import Paper from "@mui/material/Paper";

import {useForm} from '@inertiajs/react'
import {router} from '@inertiajs/react'


export default function Pedidos({pedido, cliente, img}) {
    const {data, put} = useForm()

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.entregue.update', pedido.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (<Layout titlePage="Pedidos" voltar={route('admin.pedidos.index')} container
                    menu="pedidos" submenu="pedidos-lista">
        <Typography>Atualizar Preço</Typography>
        <Typography>Fornecedor</Typography>
        <form onSubmit={submit}>
            <Button className={"mt-3"} color={"primary"}>Atualizar Status</Button>
        </form>
    </Layout>);
}
