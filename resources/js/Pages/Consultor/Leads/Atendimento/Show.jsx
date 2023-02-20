import Layout from "@/Layouts/Consultor/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/react";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {router} from '@inertiajs/react'

export default function Show({dados, status, contatos, historicos}) {
    const {data, setData} = useForm();

    function onSubmit(e) {
        e.preventDefault();
        router.post(route('consultor.leads.atendimento.update', dados.id), {
            _method: 'put',
            ...data
        })
    }

    return (
        <Layout container voltar={route('consultor.leads.main.index')} titlePage="Lead - Em Atendimento">
            <div className="mb-4 border-bottom">
                <div className="row justify-content-between">
                    <div className="col-auto"><h6>Lead em Atendimento</h6></div>
                    <div className="col-auto">
                        <a href={route('consultor.leads.main.edit', dados.id)}
                           className="btn btn-primary btn-sm">Editar Dados</a>
                    </div>
                </div>
                <LeadsDados dados={dados}/>
                <div className="row mt-4">
                    {historicos.map((dado, index) => (
                        <div key={index} className="card mb-3 border">
                            <div className="card-body">
                                <h6 className="card-subtitle text-muted">
                                    {index + 1}. {dado.status}
                                </h6>
                                <span className="d-block"><b>Meio de Contato:</b> {dado.meio_contato}</span>
                                <span className="d-block"><b>Anotações:</b> {dado.msg}</span>

                                <span className="small">Data: {dado.data_criacao}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <form onSubmit={onSubmit}>
                <h6>Atualizar Status</h6>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <TextField label="Status" select fullWidth required
                                   onChange={e => setData('status', e.target.value)}>
                            {status.map((option, index) => (
                                <MenuItem key={index} value={option.status}>
                                    {option.nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-md-4 mb-4">
                        <TextField label="Meio Contato" select fullWidth required
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
                    <div className="col mb-3">
                        <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                            Finalizar Atendimento
                        </button>
                    </div>
                </div>
            </form>
            <div className="modal fade" id="exampleModal" tabIndex="10" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-dialog-center ed">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Finalizar Atendimento</h5>
                            <button type="button" className="btn-close bg-dark" data-bs-dismiss="modal"
                                    aria-label="Close"/>
                        </div>
                        <div className="modal-body">
                            Confirmar finalização do atendimento?
                        </div>
                        <div className="modal-footer">

                            <div className="row">
                                <div className="col">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Voltar
                                    </button>
                                </div>
                                <div className="col">
                                    <form onSubmit={onSubmit}>
                                        <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                            Finalizar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}
