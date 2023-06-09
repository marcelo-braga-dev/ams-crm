import Layout from "@/Layouts/Consultor/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/react";
import {router} from '@inertiajs/react'
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function Show({dados, status, contatos, historicos}) {
    const {data, setData, post} = useForm({
        msg: '',
        classificacao: dados.cliente.classificacao
    });

    function onSubmit(e) {
        e.preventDefault();
        router.post(route('consultor.leads.atendimento.update', dados.id), {
            _method: 'put',
            ...data
        })
    }

    function updateClassificacao(id, valor) {
        post(route('consultor.leads.update-classificacao', {id: id, valor: valor}), {
            preserveScroll: true
        })
        setData('classificacao', valor)
    }

    return (
        <Layout container voltar={route('consultor.leads.main.index')} titlePage="Lead - Ativo">
            <LeadsDados dados={dados}/>
            <div className="row mt-3">
                <div className="col-auto">
                    <a href={route('consultor.pedidos.create', {lead: dados.id})} className="btn btn-primary">
                        Lançar Pedido
                    </a>
                </div>
            </div>
            <div className="row justify-content-between">
                <div className="col-auto pt-4">
                    Classificação:
                    <span
                        className={'mx-1 cursor-pointer' + (data.classificacao === '❌' ? " border p-2 rounded bg-dark" : '')}
                        onClick={() => updateClassificacao(dados.id, '❌')}>❌</span>
                    <span
                        className={'mx-1 cursor-pointer' + (data.classificacao === '☹️' ? " border p-2 rounded bg-dark" : '')}
                        onClick={() => updateClassificacao(dados.id, '☹️')}>☹️</span>
                    <span
                        className={'mx-1 cursor-pointer' + (data.classificacao === '😐' ? " border p-2 rounded bg-dark" : '')}
                        onClick={() => updateClassificacao(dados.id, '😐')}>😐</span>
                    <span
                        className={'mx-1 cursor-pointer' + (data.classificacao === '🙂' ? " border p-2 rounded bg-dark" : '')}
                        onClick={() => updateClassificacao(dados.id, '🙂')}>🙂</span>
                    <span
                        className={'mx-1 cursor-pointer' + (data.classificacao === '😁' ? " border p-2 rounded bg-dark" : '')}
                        onClick={() => updateClassificacao(dados.id, '😁')}>😁</span>
                </div>
            </div>
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
            </div>
            <form onSubmit={onSubmit}>
                <h6>Atualizar Status</h6>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <TextField label="Status" select fullWidth required defaultValue=""
                                   onChange={e => setData('status', e.target.value)}>
                            {status.map((option, index) => (
                                <MenuItem key={index} value={option.status}>
                                    {option.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-md-4 mb-4">
                        <TextField label="Meio Contato" select fullWidth required defaultValue=""
                                   onChange={e => setData('meio_contato', e.target.value)}>
                            {contatos.map((option, index) => (
                                <MenuItem key={index} value={option.key}>
                                    {option.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col">
                        <TextField label="Anotações" multiline rows="4" fullWidth
                                   onChange={e => setData('msg', e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col"></div>
                    <div className="col mb-3">
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={() => setData('salvar_msg', true)}
                                    type="submit">
                                Enviar Anotações
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
