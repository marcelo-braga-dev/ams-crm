import * as React from 'react';
import {router} from '@inertiajs/react'
import Layout from '@/Layouts/Layout';
import Typography from "@mui/material/Typography";

import {useForm} from '@inertiajs/react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Alert, InputAdornment, TextField} from "@mui/material";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import BoxShadow from "@/Components/Layout/BoxShadow";
import DadosProdutosCompleta from "@/Components/Pedidos/DadosProdutosCompleta.jsx";
import LeadsDados from "@/Components/Leads/LeadsDados.jsx";

export default function Pedidos({pedido, lead, produtos}) {

    const {data, setData} = useForm({
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
        router.post(route('admin.modelo-2.pedidos.conferencia.update', pedido.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout container titlePage="Pedido em ConferênciaXX" menu="pedidos" submenu="lista"
                voltar={route('admin.pedidos.index', {id_card: pedido.pedido.id})}>
            <BoxShadow>
                {pedido.pedido.alerta && <Alert severity="info">
                    <b>PEDIDO PASSOU POR REVISÃO</b><br/>
                    {pedido.pedido.alerta}
                </Alert>}


                <DadosPedido dados={pedido}/>
                <LeadsDados dados={lead}/>

                <DadosPedidoCliente dados={pedido}/>


                <div className="row">
                    <div className="col">
                        <DadosProdutosCompleta dados={produtos} isFinanceiro={pedido.financeiro.is_financeiro}/>
                    </div>
                </div>
            </BoxShadow>

            <BoxShadow>
                <form onSubmit={submit}>
                    <div className="row mt-4 text-center">
                        <div className="col">
                            <button type="button" className="btn btn-info" data-bs-toggle="modal"
                                    data-bs-target="#modalEncomenda">
                                Enviar para Encomenda
                            </button>
                        </div>
                        <div className="col">
                            <button className="btn btn-success text-dark" type="submit">Aprovar Pedido</button>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-danger" onClick={handleOpen}>Reprovar Pedido</button>
                        </div>
                    </div>
                </form>
            </BoxShadow>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style} className="rounded">
                    <Typography className="mb-4" id="modal-modal-title" variant="h6" component="h2">
                        Reprovar Pedido
                    </Typography>
                    <form onSubmit={submit}>
                        <TextField
                            className="mb-4" label="Motivos da reprovação"
                            multiline fullWidth rows={6} required
                            onChange={event => setData('reprovado', event.target.value)}/>
                        <div className="text-center">
                            <button className="btn btn-primary" type="submit">Salvar</button>
                        </div>
                    </form>
                </Box>
            </Modal>

            <div className="modal fade mt-5" id="modalEncomenda" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Encomenda</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>

                        <form onSubmit={submit}>
                            <div className="modal-body">
                                Prazo para a encomenda do pedido?
                                <div className="row mt-3">
                                    <div className="col-4">
                                        <TextField label="Prazo" size="small" type="number" required
                                                   InputProps={{
                                                       endAdornment: <InputAdornment
                                                           position="start">dias</InputAdornment>
                                                   }}
                                                   onChange={e => setData('prazo', e.target.value)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Fechar
                                </button>
                                <button type="submit" className="btn btn-primary"
                                        data-bs-dismiss={data.prazo ? "modal" : ''}
                                        onClick={event => setData('encomenda', true)}>
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
