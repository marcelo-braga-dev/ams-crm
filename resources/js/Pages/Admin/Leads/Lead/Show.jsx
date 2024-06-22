import LeadsDados from "@/Components/Leads/LeadsDados";
import Layout from "@/Layouts/Layout";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useState} from "react";
import {router} from "@inertiajs/react";
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import HistoricoAtendimento from "@/Partials/Leads/HistoricoAtendimento";
import HistoricoPedidos from "@/Partials/Leads/HistoricoPedidos";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import {BoxSeam, ListUl, PersonBoundingBox} from "react-bootstrap-icons";

export default function Show({
                                 dados,
                                 historicos,
                                 usuarios,
                                 historicoPedidos,
                                 isLeadsEncaminhar,
                                 isLeadsLimpar,
                                 isEditar,
                                 isExcluir,
                                 isInativar
                             }) {
    const [consultorSelecionado, setConsultorSelecionado] = useState();

    function nomeConsultorSelecionado() {
        const nome = usuarios[usuarios.findIndex(i => i.id === consultorSelecionado)]?.name;
        return nome ? <>
            <b>TROCAR</b> o consultor(a) dos Leads para:<br/>
            <h6>{nome}</h6>
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>
    }

    function submit() {
        if (consultorSelecionado) {
            router.post(route('admin.clientes.leads.update-consultor',
                {leadsSelecionados: [dados.id], consultor: consultorSelecionado}))
        }
    }

    function deletarLead() {
        router.post(route('admin.clientes.leads.delete',
            {lead: dados.id}))
    }

    function removerVendedor() {
        router.post(route('admin.clientes.leads.remover-consultor',
            {lead: dados.id}))
    }

    function removerSdr() {
        router.post(route('admin.clientes.leads.remover-sdr',
            {lead: dados.id}))
    }

    function inativarLead() {
        router.post(route('admin.clientes.leads.inativar-lead'), {id: dados.id, _method: 'PUT'})
    }

    function reativarLead() {
        router.post(route('admin.clientes.leads.reativar-lead'), {id: dados.id, _method: 'PUT'})
    }

    return (
        <Layout empty titlePage="Informações do Lead" menu="leads" submenu="leads-cadastrados"
                voltar={route('admin.clientes.leads.leads-cadastrados')}>
            <CardContainer>
                <CardTitle title="Informações do Lead" icon={<PersonBoundingBox size="22"/>}/>
                <CardBody>
                    <div className="row">
                        <div className="col">
                            <LeadsDados dados={dados}/>
                        </div>
                        <div className="col-auto">
                            <div className="row">
                                <div className="col-12">
                                    {isEditar &&
                                        <IconButton color="success"
                                                    href={route('admin.clientes.leads.leads-main.edit', dados.id)}>
                                            <EditIcon/>
                                        </IconButton>}
                                    {isExcluir &&
                                        <IconButton color="success" data-bs-toggle="modal" data-bs-target="#modalExcluir">
                                            <DeleteIcon color="error"/>
                                        </IconButton>}
                                </div>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col">
                            <b>Consultor(a):</b> {dados.consultor.nome}
                        </div>
                        <div className="col">
                            <b>SDR:</b> {dados.sdr.nome}
                        </div>
                        <div className="col">
                            <b> Status do Lead:</b> {dados.infos.status_nome}
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            {(isLeadsEncaminhar || isLeadsLimpar) &&
                <CardContainer>
                    <CardBody>
                        <div className="row">
                            {isLeadsEncaminhar && <div className="col-md-5">
                                <div className="row">
                                    <div className="col-8 ml-4 mb-0">
                                        <TextField label="Selecione o Consultor..." select
                                                   value={consultorSelecionado ?? ''}
                                                   fullWidth required
                                                   onChange={e => setConsultorSelecionado(e.target.value)}>
                                            {usuarios.map((option) => (
                                                <MenuItem key={option.id} value={option.id}>
                                                    #{option.id} - {option.name}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </div>
                                    <div className="col-2">
                                        <button type="button" className="btn btn-dark" data-bs-toggle="modal"
                                                data-bs-target="#modalEnviar">
                                            ENVIAR
                                        </button>
                                    </div>
                                </div>
                            </div>}
                            {isLeadsLimpar && <>
                                <div className="col-auto">
                                    <button className="btn btn-link text-dark" data-bs-toggle="modal" data-bs-target="#modalRemoverConsultor">
                                        Remover Vendedor
                                    </button>
                                </div>
                                <div className="col-auto">
                                    <button className="btn btn-link text-dark" data-bs-toggle="modal" data-bs-target="#modalRemoverSDR">
                                        Remover SDR
                                    </button>
                                </div>
                            </>}
                            {isInativar && <div className="col text-end">
                                {dados.infos.status === 'ativo' &&
                                    <button className="btn btn-danger mb-0" data-bs-toggle="modal" data-bs-target="#inativarLead">Inativar Lead</button>}
                                {dados.infos.status === 'inativo' &&
                                    <button className="btn btn-success mb-0" onClick={() => reativarLead()}>Reativar Lead</button>}
                            </div>}
                        </div>
                    </CardBody>
                </CardContainer>
            }

            <div className="row">
                <div className="col-md-8">
                    <CardContainer>
                        <CardTitle title="Histórico de Atendimento" icon={<ListUl size={24}/>}/>
                        <CardBody>
                            <HistoricoAtendimento historicos={historicos}/>
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col">
                    <CardContainer>
                        <CardTitle title="Histórico de Pedidos" icon={<BoxSeam size="22"/> }/>
                        <CardBody>
                            <HistoricoPedidos historicos={historicoPedidos}/>
                        </CardBody>
                    </CardContainer>
                </div>
            </div>


            {/*MODAL ENVIAR*/}
            <div className="modal fade mt-5" id="modalEnviar" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">ALTERAR CONSULTOR</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {nomeConsultorSelecionado()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => submit()}>
                                Alterar Consultor(a).
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*MODAL EXCLUIR*/}
            <div className="modal fade mt-5" id="modalExcluir" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Excluir Lead</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja realmente EXCLUIR este leads?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => deletarLead()}>
                                Excluir Lead
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/*MODAL REMOVER CONSULTOR*/}
            <div className="modal fade mt-5" id="modalRemoverConsultor" tabIndex="-1"
                 aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Remover Consultor(a)</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja REMOVER O CONSULTOR(A) deste lead?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => removerVendedor()}>
                                Remover
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*MODAL REMOVER SDR*/}
            <div className="modal fade mt-5" id="modalRemoverSDR" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Remover SDR</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja REMOVER O SDR deste lead?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => removerSdr()}>
                                Remover
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Inativar Lead*/}
            <div className="modal fade mt-5" id="inativarLead" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Inativar LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Deseja inativar este leads?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => inativarLead()}>Inativar</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
