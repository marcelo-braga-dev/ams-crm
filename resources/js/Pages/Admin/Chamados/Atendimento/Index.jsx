import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import ImagePdf from "@/Components/Elementos/ImagePdf";
import React, {useState} from "react";
import {TextField} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {useForm} from "@inertiajs/inertia-react";
import {router} from "@inertiajs/react";
import SacDados from "@/Partials/SAC/SacDados";

export default function Create({sac, pedido}) {
    const [qtdAnexos, setQtdAnexos] = useState(2)

    const {data, setData, reset} = useForm({
        msg: null,
        anexos: []
    })

    const anesxos = () => {
        let a = [];
        for (let i = 1; i <= qtdAnexos; i++) {
            a.push(
                <div key={i} className="col-md-4 mb-4">
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
        <Layout empty titlePage="Informações do SAC" menu="sac" submenu="sac-chamados" voltar={route('admin.chamados.index')}>
            <div className="card card-body mb-4">
                <SacDados sac={sac} pedido={pedido}/>
            </div>

            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary mb-0" data-bs-toggle="modal" data-bs-target="#exampleModal">Finalizar SAC</button>
                    </div>
                </div>
            </div>

            {
                sac.mensagens.map((dado) => {
                    return (
                        <div key={dado.id} className="card card-body mb-4">
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
                                        <div className="col">
                                            <ImagePdf url={item.url} urlRaiz/>
                                        </div>
                                    ))}
                                </div>
                            }
                        </div>
                    )
                })
            }


            <form onSubmit={submit}>
                <div className="card card-body mb-4">
                    <h6>Adicionar Mensagem</h6>
                    <div className="row mb-4">
                        <div className="col">
                            <TextField label="Mensagem" multiline rows="4" fullWidth required
                                       onChange={e => setData('msg', e.target.value)}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-auto"><span className="me-4">Anexos</span></div>
                        <div className="col-auto"><RemoveIcon sx={{fontSize: 18}} onClick={() => setQtdAnexos(e => e > 1 ? --e : 1)}/></div>
                        <div className="col-auto"><span><b>{qtdAnexos}</b></span></div>
                        <div className="col-auto"><AddIcon sx={{fontSize: 18}} onClick={() => setQtdAnexos(e => ++e)}/></div>
                    </div>
                    <div className="row row-cols-3 mb-4">
                        {anesxos()}
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <button className="btn btn-success d-block">Atualizar SAC</button>
                        </div>
                    </div>
                </div>
            </form>

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
