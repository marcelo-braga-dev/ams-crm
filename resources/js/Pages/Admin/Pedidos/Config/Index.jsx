import Layout from '@/Layouts/Layout';
import Typography from "@mui/material/Typography";

import {useForm} from '@inertiajs/react'
import {TextField} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";

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
        'encomenda': prazos.encomenda,

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
        'cor_encomenda': coresPedidos.encomenda,
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
        <Layout container titlePage="Consfigurações de Pedidos" menu="pedidos" submenu="pedidos-config">
            <CardContainer>
                <CardBody>
                    <Typography variant={"h6"} className={"mb-4"}>Prazos dos Status de Enegia Solar (dias)</Typography>
                    <form onSubmit={submit}>
                        <div className="row row-cols-5">
                            <div className="col mb-3">
                                <TextField required type="number" value={data.novo} label="Revisar"
                                           onChange={e => setData('novo', e.target.value)}></TextField>
                            </div>
                            <div className="col mb-3">
                                <TextField required type="number" value={data.conferencia} label="Conferência"
                                           onChange={e => setData('conferencia', e.target.value)}></TextField>
                            </div>
                            <div className="col mb-3">
                                <TextField required type="number" value={data.lancado} label="Lançamento"
                                           onChange={e => setData('lancado', e.target.value)}></TextField>
                            </div>
                            <div className="col mb-3">
                                <TextField required type="number" value={data.boleto} label="Aguardando Nota/Boleto"
                                           onChange={e => setData('boleto', e.target.value)}></TextField>
                            </div>
                            <div className="col mb-3">
                                <TextField required type="number" value={data.pagamento} label="Aguardando Pagamento"
                                           onChange={e => setData('pagamento', e.target.value)}></TextField>
                            </div>
                            <div className="col mb-3">
                                <TextField required type="number" value={data.faturando} label="Aguardando Faturamento"
                                           onChange={e => setData('faturando', e.target.value)}></TextField>
                            </div>
                            <div className="col mb-3">
                                <TextField required type="number" value={data.faturado} label="Faturado"
                                           onChange={e => setData('faturado', e.target.value)}></TextField>
                            </div>
                            <div className="col mb-3">
                                <TextField required type="number" value={data.acompanhamento} label="Acompanhamento"
                                           onChange={e => setData('acompanhamento', e.target.value)}></TextField>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" type="submit">Atualizar Prazos</button>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    {/*Cores Pedidos*/}
                    <form onSubmit={atualizarCoresPedidos}>
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
                            <div className="col-md-3 mt-3">
                                <TextField type="color" label="Encomenda" fullWidth defaultValue={data.cor_encomenda}
                                           onChange={e => setData('cor_encomenda', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-auto mx-auto">
                                <button type="submit" className="btn btn-primary">Atualizar Cores</button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>
        </Layout>
    )
}
