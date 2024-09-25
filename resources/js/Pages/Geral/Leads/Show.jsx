import Layout from "@/Layouts/Layout";

import {MenuItem, TextField, Stack, Typography} from "@mui/material";
import {ArrowRight, BoxSeam, ListUl, Tag, TrashFill} from "react-bootstrap-icons";

import * as React from "react";
import {useState} from "react";
import {router} from "@inertiajs/react";

import LeadsDados from "@/Components/Leads/LeadsDados";
import HistoricoAtendimento from "@/Partials/Leads/HistoricoAtendimento";
import HistoricoPedidos from "@/Partials/Leads/HistoricoPedidos";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import HistoricoStatus from "@/Partials/Leads/HistoricoStatus.jsx";
import EditModal from "@/Pages/Geral/Leads/EditModal.jsx";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function Show({dados, usuarios, historicos, permissoes}) {

    const [consultorSelecionado, setConsultorSelecionado] = useState();

    const {status, pedidos, atendimento} = historicos;
    const {encaminhar, limpar, editar, excluir, inativar} = permissoes;

    function nomeConsultorSelecionado() {
        const nome = usuarios[usuarios.findIndex(i => i.id === consultorSelecionado)]?.name;
        return nome ? <>
            <b>TROCAR</b> o consultor(a) dos Leads para:<br/>
            <h6>{nome}</h6>
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>
    }

    function submit() {
        if (consultorSelecionado) {
            router.post(route('admin.clientes.leads.update-consultor', {leadsSelecionados: [dados.id], consultor: consultorSelecionado}))
        }
    }

    function deletarLead() {
        router.post(route('admin.clientes.leads.delete', {lead: dados.id}))
    }

    function removerVendedor() {
        router.post(route('admin.clientes.leads.remover-consultor', {lead: dados.id}))
    }

    function removerSdr() {
        router.post(route('admin.clientes.leads.remover-sdr', {lead: dados.id}))
    }

    function inativarLead() {
        router.post(route('admin.clientes.leads.inativar-lead'), {id: dados.id, _method: 'PUT'})
    }

    function reativarLead() {
        router.post(route('admin.clientes.leads.reativar-lead'), {id: dados.id, _method: 'PUT'})
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Layout empty titlePage="Informações do Lead" menu="leads" submenu="leads-cadastrados"
                voltar={route('admin.clientes.leads.leads-cadastrados')}>

            <LeadsDados dados={dados} acoes={
                <Stack direction="row" spacing={2}>
                    {(encaminhar || limpar) && <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalEncaminhar">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <ArrowRight size={20}/>
                            <Typography>Encaminhar</Typography>
                        </Stack>
                    </button>}
                    {editar && <EditModal lead={dados}/>}
                    {excluir && <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#modalExcluir">
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <TrashFill size={15}/>
                            <Typography>Excluir</Typography>
                        </Stack>
                    </button>}
                </Stack>
            }/>

            <CardContainer>
                <CardTitle title={(
                    <Tabs
                        value={value}
                        onChange={handleChange}
                    >
                        <Tab icon={<ListUl size={24}/>} iconPosition="start" label="Histórico de Atendimento" />
                        <Tab icon={<BoxSeam size={22}/>} iconPosition="start" label="Histórico de Pedidos" />
                        <Tab icon={<Tag size={22}/>} iconPosition="start" label="Histórico dos Status" />
                    </Tabs>
                )} />
                <CardBody>
                    {value === 0 && <HistoricoAtendimento historicos={atendimento}/>}

                    {value === 1 && <HistoricoPedidos historicos={pedidos}/>}

                    {value === 2 && <HistoricoStatus historicos={status}/>}
                </CardBody>
            </CardContainer>

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

            {/*MODAL Encaminhar*/}
            <div className="modal fade mt-6" id="modalEncaminhar" tabIndex="-1"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Encaminhar Lead</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            {encaminhar && <div className="row">
                                <div className="col-md-8">
                                    <TextField label="Selecione o Consultor..." select
                                               value={consultorSelecionado ?? ''}
                                               fullWidth required
                                               onChange={e => setConsultorSelecionado(e.target.value)}>
                                        {usuarios.map((option) => (<MenuItem key={option.id} value={option.id}>
                                            #{option.id} - {option.name}
                                        </MenuItem>))}
                                    </TextField>
                                </div>
                                <div className="col-2">
                                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEncaminhar">
                                        ENVIAR
                                    </button>
                                </div>
                            </div>}


                            <div className="row">
                                {limpar && <>
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
                                {inativar && <div className="col text-end">
                                    {dados.infos.status === 'ativo' &&
                                        <button className="btn btn-danger mb-0" data-bs-toggle="modal" data-bs-target="#inativarLead">Inativar Lead</button>}
                                    {dados.infos.status === 'inativo' && <button className="btn btn-success mb-0" onClick={() => reativarLead()}>Reativar Lead</button>}
                                </div>}
                            </div>
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
