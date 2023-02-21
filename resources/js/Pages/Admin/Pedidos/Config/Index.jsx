import Layout from '@/Layouts/Admin/Layout';
import {Button, Card, Col, Container, Row} from "reactstrap";
import Typography from "@mui/material/Typography";

import {useForm} from '@inertiajs/react'
import {TextField} from "@mui/material";

export default function Pedidos({prazos}) {
    const {post, data, setData} = useForm({
        'novo': prazos.novo,
        'conferencia': prazos.conferencia,
        'lancado': prazos.lancado,
        'boleto': prazos.boleto,
        'pagamento': prazos.pagamento,
        'faturando': prazos.faturando,
        'faturado': prazos.faturado,
    })

    function submit(e) {
        e.preventDefault()
        post(route('admin.config.store'))
    }

    return (
        <Layout container voltar={route('admin.pedidos.index')} titlePage="Consfigurações de Pedidos">

            <Typography variant={"h6"} className={"mb-4"}>Prazos dos Status</Typography>
            <form onSubmit={submit}>
                <Row>
                    <Col lg="3" className="mb-5">
                        <TextField required type="number" value={data.novo} label="Novo"
                                   onChange={e => setData('novo', e.target.value)}></TextField>
                    </Col>
                    <Col lg="3" className="mb-5">
                        <TextField required type="number" value={data.conferencia} label="Conferência"
                                   onChange={e => setData('conferencia', e.target.value)}></TextField>
                    </Col>
                    <Col lg="3" className="mb-5">
                        <TextField required type="number" value={data.lancado} label="Lançamento"
                                   onChange={e => setData('lancado', e.target.value)}></TextField>
                    </Col>
                    <Col lg="3" className="mb-5">
                        <TextField required type="number" value={data.boleto} label="Aguardando Nota/Boleto"
                                   onChange={e => setData('boleto', e.target.value)}></TextField>
                    </Col>
                </Row>
                <Row>
                    <Col lg="3" className="mb-5">
                        <TextField required type="number" value={data.pagamento} label="Aguardando Pagamento"
                                   onChange={e => setData('pagamento', e.target.value)}></TextField>
                    </Col>
                    <Col lg="3" className="mb-5">
                        <TextField required type="number" value={data.faturando} label="Aguardando Faturamento"
                                   onChange={e => setData('faturando', e.target.value)}></TextField>
                    </Col>
                    <Col lg="3" className="mb-5">
                        <TextField required type="number" value={data.faturado} label="Faturado"
                                   onChange={e => setData('faturado', e.target.value)}></TextField>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button color={"primary"}>Atualizar Prazos</Button>
                </div>

            </form>
        </Layout>
    )
}
