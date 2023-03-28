import Layout from '@/Layouts/Admin/Layout';
import {Button, Card, Col, Container, Row} from "reactstrap";
import Typography from "@mui/material/Typography";

import {useForm} from '@inertiajs/react'
import {TextField} from "@mui/material";

export default function Pedidos({prazos, coresPedidos}) {
    const {post, data, setData} = useForm({
        'novo': prazos.novo,
        'conferencia': prazos.conferencia,
        'lancado': prazos.lancado,
        'boleto': prazos.boleto,
        'pagamento': prazos.pagamento,
        'faturando': prazos.faturando,
        'faturado': prazos.faturado,
        'acompanhamento': prazos.acompanhamento,

        'cor_reprovado': coresPedidos.reprovado,
        'cor_conferencia': coresPedidos.conferencia,
        'cor_lancado': coresPedidos.lancado,
        'cor_nota': coresPedidos.boleto,
        'cor_pagamento': coresPedidos.pagamento,
        'cor_faturamento': coresPedidos.faturamento,
        'cor_faturado': coresPedidos.faturado,
        'cor_acompanhamento': coresPedidos.acompanhamento,
        'cor_entregue': coresPedidos.entregue,
        'cor_cancelados': coresPedidos.cancelados,
    })

    function submit(e) {
        e.preventDefault()
        post(route('admin.config.store'))
    }
    function atualizarCoresPedidos(e) {
        e.preventDefault()
        post(route('admin.pedidos.config-cores-pedidos'))
    }

    return (
        <Layout container voltar={route('admin.pedidos.index')} titlePage="Consfigurações de Pedidos"
                menu="pedidos" submenu="config">

            <Typography variant={"h6"} className={"mb-4"}>Prazos dos Status de Enegia Solar (dias)</Typography>
            <form onSubmit={submit}>
                <Row>
                    <Col lg="3" className="mb-5">
                        <TextField required type="number" value={data.novo} label="Revisar"
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
                    <Col lg="3" className="mb-5">
                        <TextField required type="number" value={data.acompanhamento} label="Acompanhamento"
                                   onChange={e => setData('acompanhamento', e.target.value)}></TextField>
                    </Col>
                </Row>
                <div className="text-center">
                    <Button color={"primary"}>Atualizar Prazos</Button>
                </div>
            </form>

            {/*Cores Pedidos*/}
            <form onSubmit={atualizarCoresPedidos} className="border-top pt-4 mt-4">
                <h6>Cores das Abas dos PEDIDOS</h6>
                <div className="row">
                    <div className="col-md-3 mt-3">
                        <TextField type="color" label="Reprovados" fullWidth defaultValue={data.cor_reprovado}
                                   onChange={e => setData('cor_reprovado', e.target.value)}/>
                    </div>
                    <div className="col-md-3 mt-3">
                        <TextField type="color" label="Conferência" fullWidth defaultValue={data.cor_conferencia}
                                   onChange={e => setData('cor_conferencia', e.target.value)}/>
                    </div>
                    <div className="col-md-3 mt-3">
                        <TextField type="color" label="Lançado" fullWidth defaultValue={data.cor_lancado}
                                   onChange={e => setData('cor_lancado', e.target.value)}/>
                    </div>
                    <div className="col-md-3 mt-3">
                        <TextField type="color" label="Aguard. Nota/Boleto" fullWidth defaultValue={data.cor_nota}
                                   onChange={e => setData('cor_nota', e.target.value)}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-3 mt-3">
                        <TextField type="color" label="Aguard. Pagamento" fullWidth defaultValue={data.cor_pagamento}
                                   onChange={e => setData('cor_pagamento', e.target.value)}/>
                    </div>
                    <div className="col-md-3 mt-3">
                        <TextField type="color" label="Aguard. Faturamento" fullWidth defaultValue={data.cor_faturamento}
                                   onChange={e => setData('cor_faturamento', e.target.value)}/>
                    </div>
                    <div className="col-md-3 mt-3">
                        <TextField type="color" label="Faturado" fullWidth defaultValue={data.cor_faturado}
                                   onChange={e => setData('cor_faturado', e.target.value)}/>
                    </div>
                    <div className="col-md-3 mt-3">
                        <TextField type="color" label="Acompanhamento" fullWidth defaultValue={data.cor_acompanhamento}
                                   onChange={e => setData('cor_acompanhamento', e.target.value)}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-3 mt-3">
                        <TextField type="color" label="Entregue" fullWidth defaultValue={data.cor_entregue}
                                   onChange={e => setData('cor_entregue', e.target.value)}/>
                    </div>
                    <div className="col-md-3 mt-3">
                        <TextField type="color" label="Cancelados" fullWidth defaultValue={data.cor_cancelados}
                                   onChange={e => setData('cor_cancelados', e.target.value)}/>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-auto mx-auto">
                        <button type="submit" className="btn btn-primary">Atualizar Cores</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
