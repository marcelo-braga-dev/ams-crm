import Layout from "@/Layouts/Layout";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import React, {useState} from "react";
import {Stack, TextField} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";
import SacDados from "@/Partials/SAC/SacDados";
import CardBody from "@/Components/Cards/CardBody";
import CardContainer from "@/Components/Cards/CardContainer";
import CardTitle from "@/Components/Cards/CardTitle";
import {ChatLeftText, Dash, Plus} from "react-bootstrap-icons";

export default function Create({sac, pedido}) {
    const [qtdAnexos, setQtdAnexos] = useState(2)

    const {data, setData, reset} = useForm({
        msg: null,
        pedido_id: pedido.id,
        anexos: []
    })

    const anesxos = () => {
        let a = [];
        for (let i = 1; i <= qtdAnexos; i++) {
            a.push(
                <div key={i} className="col mb-4">
                    <TextField type="file" label="Anexos" InputLabelProps={{shrink: true}} fullWidth
                               onChange={e => setData('anexos', {...data?.anexos, [i]: e.target.files[0]})}/>
                </div>
            )
        }
        return a
    }

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.chamados.update', sac.id), {...data, _method: 'PUT'})
    }

    router.on('success', () => window.location.reload())

    function avancaStatus() {
        router.post(route('admin.chamado.atendimento.avancar'), {id: sac.id})
    }

    return (
        <Layout empty titlePage="Informações do SAC - Atendimento" menu="sac" submenu="sac-chamados" voltar={route('admin.chamados.index')}>
            <SacDados sac={sac} pedido={pedido} urlPedido={route('admin.pedidos.show', sac.pedido_id)}/>

            <CardContainer>
                <CardBody>
                    <button className="btn btn-primary mb-0" data-bs-toggle="modal" data-bs-target="#exampleModal">Finalizar SAC</button>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle icon={<ChatLeftText size={25}/>} title="Mensagens"/>
                <CardBody>
                    {sac.mensagens.map((dado) => {
                        return (
                            <CardContainer key={dado.id}>
                                <CardBody>
                                    <div>
                                        <div className="row">
                                            <div className="col mb-2">
                                                <span><b>Autor:</b> {dado.autor}</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col mb-2">
                                                <small className="d-block">
                                                    <b>Data:</b> {dado.data}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col">
                                                <span><b>Mensagem:</b> {dado.msg}</span>
                                            </div>
                                        </div>
                                        {!!dado.anexos.length &&
                                            <div className="row row-cols-4 mt-3">
                                                {dado.anexos.map(item => (
                                                    <div key={item.url} className="col">
                                                        <ImagePdf url={item.url} urlRaiz/>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                </CardBody>
                            </CardContainer>
                        )
                    })}
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <form onSubmit={submit}>
                        <h6>Adicionar Mensagem</h6>
                        <div className="row mb-4">
                            <div className="col">
                                <TextField label="Mensagem" multiline rows="4" fullWidth required
                                           onChange={e => setData('msg', e.target.value)}/>
                            </div>
                        </div>
                        <Stack direction="row" spacing={4} marginBottom={2}>
                            <span>Anexos</span>
                            <Stack direction="row" spacing={2} marginBottom={2}>
                                <Dash sx={{fontSize: 18}} className="mt-1 cursor-pointer" onClick={() => setQtdAnexos(e => e > 1 ? --e : 1)}/>
                                <span>{qtdAnexos}</span>
                                <Plus sx={{fontSize: 18}} className="mt-1 cursor-pointer" onClick={() => setQtdAnexos(e => ++e)}/>
                            </Stack>
                        </Stack>

                        <div className="row row-cols-4 mb-4">
                            {anesxos()}
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <button className="btn btn-success d-block">Atualizar SAC</button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>

            <div className="modal fade mt-6" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Finalizar SAC</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja realmente finalizar este SAC?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => avancaStatus()}>Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
