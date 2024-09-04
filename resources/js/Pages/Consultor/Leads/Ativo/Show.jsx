import Layout from "@/Layouts/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/react";
import {router} from '@inertiajs/react';
import {TextField, MenuItem} from "@mui/material";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import React, {useCallback} from "react";
import HistoricoLista from "@/Components/Leads/HistoricoLista";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import Link from "@/Components/Link";
import CardTitle from "@/Components/Cards/CardTitle";
import {Person} from "react-bootstrap-icons";

export default function Show({dados, contatos, historicos, permissaoPedido, historicoPedidos, modeloSetor}) {
    const {data, setData, post, reset} = useForm({
        msg: '',
        classificacao: dados.cliente.classificacao,
        idLead: dados.id,
        meio_contato: ''
    });

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        router.post(route('consultor.leads.atualizar-status'), {...data}, {preserveScroll: true})
        reset('msg', 'meio_contato')
    }, [data]);

    const updateClassificacao = useCallback((id, valor) => {
        router.post(route('consultor.leads.update-classificacao'), {
            id, valor
        }, {preserveScroll: true});
        setData('classificacao', valor);
    }, [post, setData]);

    const enviarComentario = useCallback((tag, id) => {
        router.post(route('consultor.leads.add-comentarios'), {id, comentario: data[tag]});
    }, [post, data]);

    return (
        <Layout empty voltar={route('consultor.leads.main.index')} titlePage="Lead - Ativo" menu="leads">
            <div className="row">
                <div className="col">
                    <LeadsDados dados={dados}/>
                    <Classificacao
                        classificacao={data.classificacao}
                        updateClassificacao={updateClassificacao}
                        leadId={dados.id}
                    />
                </div>
                <div className="col-auto text-end">
                    <a href={route('consultor.leads.main.edit', dados.id)} className="btn btn-primary btn-sm mb-0">Editar Dados</a>
                </div>
            </div>

            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col">
                            {permissaoPedido ? <PedidoButton dados={dados} modeloSetor={modeloSetor}/> : 'Você não tem permissão para emitir pedidos.'}
                        </div>
                        {/*<div className="col">*/}
                        {/*    <button className="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">Criar Conta para o Lead</button>*/}
                        {/*</div>*/}
                    </div>
                </CardBody>
            </CardContainer>

            <CardContainer>
                <CardTitle title="Atualizar Status"/>
                <CardBody>
                    <form onSubmit={onSubmit}>
                        <div className="row">
                            <div className="col-md-3 mb-4">
                                <TextField label="Meio Contato" select fullWidth required defaultValue="" value={data.meio_contato}
                                           onChange={e => setData('meio_contato', e.target.value)}>
                                    {contatos.map((option, index) => <MenuItem key={index} value={option.key}>{option.nome}</MenuItem>)}
                                </TextField>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col">
                                <TextField label="Anotações" multiline rows="2" fullWidth value={data.msg}
                                           onChange={e => setData('msg', e.target.value)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="text-center">
                                    <button className="btn btn-primary" type="submit">
                                        Enviar Anotações
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>

            <div className="row mb-6">
                <div className="col">
                    <HistoricoSection historicos={historicos} enviarComentario={enviarComentario} setData={setData}/>
                </div>
                <div className="col">
                    <PedidosSection historicoPedidos={historicoPedidos}/>
                </div>
            </div>
            <ModalCriarConta/>
        </Layout>
    );
}

const Classificacao = ({classificacao, updateClassificacao, leadId}) => (
    <div className="mt-4">
        <span className="text-bold pe-2">Classificação:</span>
        {['❌', '☹️', '😐', '🙂', '😁'].map((emoji, index) => (
            <span
                key={index}
                className={`mx-1 cursor-pointer${classificacao === emoji ? " border border-dark p-1" : ""}`}
                onClick={() => updateClassificacao(leadId, emoji)}
            >
                {emoji}
            </span>
        ))}
    </div>
);

const PedidoButton = ({dados, modeloSetor}) => (
    <div>
        {modeloSetor === 3 && <Link label="Emitir Orçamento" icon={<RequestPageOutlinedIcon/>} variant="warning"
                                    href={route('consultor.orcamentos.create', {lead: dados.id})}>
        </Link>}
        {modeloSetor !== 3 && <Link label="Lançar Pedido" icon={<RequestPageOutlinedIcon/>} variant="warning"
                                    href={route('consultor.pedidos.create', {lead: dados.id})}>
        </Link>}
        {!(dados?.cliente?.cnpj || dados?.cliente?.cpf) &&
            <span className="text-danger h6 d-block">
                Cadastre <a href={route('consultor.leads.main.edit', dados.id)}>aqui</a> o CNPJ ou CPF do cliente para emitir pedidos!
            </span>}
    </div>
);

const HistoricoSection = ({historicos, enviarComentario, setData}) => (
    <HistoricoLista historicos={historicos} enviarComentario={enviarComentario} setData={setData} urlPedidos="consultor.pedidos.show"/>
);

const PedidosSection = ({historicoPedidos}) => (
    <CardContainer>
        <CardTitle title="Histórico de Pedidos"/>
        <CardBody>
            <div style={{maxHeight: 700, overflow: 'auto'}}>
                {historicoPedidos.map(item => (
                    <CardContainer key={item.id}>
                        <CardBody>
                            <div className="row justify-content-between">
                                <div className="col">
                                    <span className="d-block"><b>ID do Pedido:</b> #{item.id}</span>
                                    <span className="d-block"><b>Status:</b> {item.status}</span>
                                    <span className="d-block"><b>Valor:</b> R$ {item.valor}</span>
                                    <span className="d-block"><b>Data do Pedido:</b> {item.data_criacao}</span>
                                </div>
                                <div className="col-auto">
                                    <a className="btn btn-primary btn-sm" href={route('consultor.pedidos.show', item.id)}>Ver Pedido</a>
                                </div>
                            </div>
                        </CardBody>
                    </CardContainer>
                ))}
                {historicoPedidos.length === 0 && <div className="row text-center">
                    <span>Não há histórico de pedidos.</span>
                </div>}
            </div>
        </CardBody>
    </CardContainer>
);

const ModalCriarConta = () => (
    <div className="modal fade mt-6" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Criar Conta</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    Deseja criar uma conta para este cliente acessar a plataforma?
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Criar Conta</button>
                </div>
            </div>
        </div>
    </div>
);
