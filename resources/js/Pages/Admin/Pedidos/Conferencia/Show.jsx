import * as React from 'react';
import {router} from '@inertiajs/react'
import Layout from '@/Layouts/Layout';
import Typography from "@mui/material/Typography";

import {useForm} from '@inertiajs/react'
import Modal from "@mui/material/Modal";
import {Alert, InputAdornment, TextField} from "@mui/material";
import DadosPedido from "@/Components/Pedidos/DadosPedido";
import DadosPedidoCliente from "@/Components/Pedidos/DadosPedidoCliente";
import DadosPedidoClienteFiles from "@/Components/Pedidos/DadosPedidoClienteFiles";
import DadosPedidoFiles from "@/Components/Pedidos/DadosPedidoFiles";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import DadosProdutosCompleta from "@/Components/Pedidos/DadosProdutosCompleta.jsx";
import CardTable from "@/Components/Cards/CardTable.jsx";
import {Box} from "react-bootstrap-icons";
import DadosPedidoFinanceiroFiles from "@/Components/Pedidos/DadosPedidoFinanceiroFiles.jsx";

export default function Pedidos({pedido, produtos}) {

    const {data, put, setData} = useForm({
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
        router.post(route('admin.conferencia.update', pedido.pedido.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout container voltar={route('admin.pedidos.index', {id_card: pedido.pedido.id})}
                titlePage="Pedido em Conferência" menu="pedidos" submenu="pedidos-lista">

            {pedido.pedido.alerta && <Alert severity="info">
                <b>PEDIDO PASSOU POR REVISÃO</b><br/>
                {pedido.pedido.alerta}
            </Alert>}
            <div className="row">
                <div className="col">
                    <CardContainer>
                        <CardBody>
                            <DadosPedido dados={pedido}/>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col">
                    <CardContainer>
                        <CardBody>
                            <DadosPedidoCliente dados={pedido}/>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>

            {!!produtos.length &&
                <CardContainer>
                    <CardTable title="Produtos do Pedido" icon={<Box size={20}/>}>
                        <DadosProdutosCompleta dados={produtos} isFinanceiro={pedido.financeiro.is_financeiro}/>
                    </CardTable>
                </CardContainer>
            }

            <CardContainer>
                <CardBody>
                    <form onSubmit={submit}>
                        <div className="row text-center">
                            <div className="col">
                                <button type="button" className="btn btn-info" data-bs-toggle="modal"
                                        data-bs-target="#modalEncomenda">
                                    Enviar para Encomenda
                                </button>
                            </div>
                            <div className="col">
                                <button className="btn btn-success" type="submit">Aprovar Pedido</button>
                            </div>
                            <div className="col">
                                <button className="btn btn-danger" type="button" onClick={handleOpen}>Reprovar Pedido</button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <DadosPedidoFiles dados={pedido}/>
                    <DadosPedidoFinanceiroFiles dados={pedido}/>
                    <DadosPedidoClienteFiles dados={pedido}/>
                </CardBody>
            </CardContainer>

            {/*MODAL*/
            }
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
            {/*MODAL - fim*/
            }
        </Layout>)
        ;
}
