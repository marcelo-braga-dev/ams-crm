import Layout from "@/Layouts/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {router, useForm} from "@inertiajs/react";
import HistoricoLista from "@/Components/Leads/HistoricoLista";
import * as React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import HistoricoPedidos from "@/Partials/Leads/HistoricoPedidos";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";

export default function Show({dados, consultores, historicos, historicoPedidos, isSdr, isInativar, emitePedido, cardEmitePedido, isEditar, contatos}) {
    const {data, setData, post} = useForm({
        lead: dados.id,
        consultor: dados.consultor.id
    });

    function enviarComentario(tag, id) {
        post(route('admin.leads.adicionar-comentarios', {id: id, msg: data[tag]}));
        window.location.reload()
    }

    function remover() {
        post(route('admin.leads.limpar-consultor', {id: dados.id, consultor: dados.consultor.id}))
    }

    function voltarStatus() {
        post(route('admin.leads.ativo-voltar', dados.id))
    }

    function avancarStatus() {
        post(route('admin.leads.ativo-avancar', dados.id))
    }

    function nomeConsultorSelecionado() {
        const nome = consultores[consultores.findIndex(i => i.id === data.novo_consultor)]?.name;
        return nome ? <>
            <b>TROCAR</b> o consultor(a) do Lead para:<br/>
            <h5>{nome}</h5>
        </> : <div className="alert alert-danger text-white">Selecione o Consultor</div>
    }

    function alterarConsultor() {
        post(route('admin.leads.update-consultor'))
    }

    function inativarLead() {
        router.post(route('admin.clientes.leads.inativar-lead'), {id: dados.id, _method: 'PUT'})
    }

    function onSubmit(e) {
        e.preventDefault();
        post(route('admin.leads.atualizar-status'))
        window.location.reload()
    }

    function reativarLead() {
        router.post(route('admin.clientes.leads.reativar-lead'), {id: dados.id, _method: 'PUT'})
    }

    return (
        <Layout empty titlePage="Ativo - Lead" menu="leads" submenu="leads-cards"
                voltar={route('admin.leads.cards-leads.index', {id: dados.consultor.id})}>
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col">
                            <Typography variant="body2">Consultor(a)</Typography>
                            <Typography>{dados.consultor.nome ? dados.consultor.nome : '-'}</Typography>
                        </div>
                        <div className="col">
                            <Typography variant="body2">SDR</Typography>
                            <Typography>{dados.sdr.nome ? dados.sdr.nome : '-'}</Typography>
                        </div>
                        <div className="col">
                            <Typography variant="body2">Setor</Typography>
                            <Typography>{dados.infos.setor.nome}</Typography>
                        </div>
                    </div>

                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Dados do Lead">
                    {isEditar &&
                        <IconButton className="mb-0" color="success" href={route('admin.clientes.leads.leads-main.edit', dados.id)}>
                            <EditIcon className="mb-0"/>
                        </IconButton>}
                </CardTitle>
                <CardBody>
                    <LeadsDados dados={dados}/>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardBody>
                    <div className="row justify-content-between">
                        <div className="col">
                            {emitePedido && cardEmitePedido &&
                                <a className="btn btn-warning mb-0" href={route('admin.pedidos.emitir.create', {lead: dados.id})}>Emitir Pedido</a>
                            }
                        </div>
                        {/*{isInativar && <div className="col-auto">*/}
                        {/*    <button className="btn btn-danger mb-0" data-bs-toggle="modal" data-bs-target="#inativarLead">Inativar Lead</button>*/}
                        {/*</div>}*/}
                        {isInativar && <div className="col text-end">
                            {dados.infos.status === 'ativo' &&
                                <button className="btn btn-danger mb-0" data-bs-toggle="modal" data-bs-target="#inativarLead">Inativar Lead</button>}
                            {dados.infos.status === 'inativo' &&
                                <button className="btn btn-success mb-0" onClick={() => reativarLead()}>Reativar Lead</button>}
                        </div>}
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Atualizar Status do Lead"/>
                <CardBody>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-md-3 mb-4">
                                <TextField label="Meio Contato" select fullWidth required defaultValue="" size="small"
                                           onChange={e => setData('meio_contato', e.target.value)}>
                                    {contatos.map((option, index) => <MenuItem key={index} value={option.key}>{option.nome}</MenuItem>)}
                                </TextField>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col">
                                <TextField label="Anotações" multiline rows="2" fullWidth
                                           onChange={e => setData('msg', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="text-center">
                                    <button className="btn btn-primary" type="submit" onClick={() => setData('salvar_msg', true)}>
                                        Enviar Anotações
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>

            <div className="row">
                <div className="col-8">
                    <CardContainer>
                        <CardTitle title="Histórico de Atendimento"/>
                        <CardBody>
                            <HistoricoLista
                                historicos={historicos} enviarComentario={enviarComentario}
                                setData={setData} urlPedidos="admin.pedidos.show"
                            />
                        </CardBody>
                    </CardContainer>
                </div>
                <div className="col">
                    <CardContainer>
                        <CardTitle title="Histórico de Pedidos"/>
                        <CardBody>
                            <HistoricoPedidos historicos={historicoPedidos}/>
                        </CardBody>
                    </CardContainer>
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

            {/*Limpar Lead*/}
            <div className="modal fade mt-5" id="limparLead" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Limpar LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Remover esse Lead deste consultor(a)?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => remover()}>Remover</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Voltar Status*/}
            <div className="modal fade mt-5" id="statusVoltar" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Limpar LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Voltar Status deste leads para "EM ATENDIMENTO"?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => voltarStatus()}>Confirmar</button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Avancar Status*/}
            <div className="modal fade mt-5" id="statusAvancar" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Limpar LEAD</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Avançar Status deste leads para "Finalizado"?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-success" data-bs-dismiss="modal"
                                    onClick={() => avancarStatus()}>Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/*Alterar consultor*/}
            <div className="modal fade mt-5" id="alterarConsultor" tabIndex="-1" aria-labelledby="limparLeadLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="limparLeadLabel">Alterar consultor</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {nomeConsultorSelecionado()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => alterarConsultor()}>Alterar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
