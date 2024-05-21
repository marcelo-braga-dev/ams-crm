import LeadsDados from "@/Components/Leads/LeadsDados";
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {useState} from "react";
import {router} from "@inertiajs/react";
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function Show({dados, historicos, usuarios}) {
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

    return (
        <Layout titlePage="Informações do Lead" menu="leads" submenu="cadastrados">
            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col">
                        <LeadsDados dados={dados}/>
                    </div>
                    <div className="col-auto">
                        <div className="row">
                            <div className="col-12">
                                <IconButton color="success"
                                            href={route('admin.clientes.leads.leads-main.edit', dados.id)}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton color="success" data-bs-toggle="modal" data-bs-target="#modalExcluir">
                                    <DeleteIcon color="error"/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card card-body mb-4">
                <div className="row">
                <div className="col">
                    Consultor(a): {dados.consultor.nome}
                </div>
                <div className="col">
                    SDR:  {dados.sdr.nome}
                </div>
                <div className="col">
                    Status do Lead: {dados.infos.status_nome}
                </div>
                </div>
            </div>

            <div className="card card-body">
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col-6 ml-4 mb-0">
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
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary"
                                data-bs-toggle="modal" data-bs-target="#modalRemoverConsultor">Remover Vendedor
                        </button>
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalRemoverSDR">Remover SDR</button>
                    </div>
                </div>

            </div>
            <div className="mb-4">
                <div className="mt-4 p-4">
                    <h6 className="mb-3">Histórico de Atendimento</h6>
                    {historicos.map((dado, index) => (
                        <div key={index} className="row shadow p-2 mb-3 rounded">
                            <div className="col">
                                <h6 className="mb-2">{index + 1}. {dado.status}</h6>
                                <span className="d-block"><b>Autor:</b> {dado.nome}</span>
                                <span className="d-block"><b>Meio de Contato:</b> {dado.meio_contato}</span>
                                <span className="d-block"><b>Anotações:</b> {dado.msg}</span>
                                <span className="small">Data: {dado.data_criacao}</span>
                            </div>
                        </div>
                    ))}
                    {historicos.length === 0 && <div className="row text-center">
                        <span>Não há histórico de atendimentos.</span>
                    </div>}
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
        </Layout>
    )
}
