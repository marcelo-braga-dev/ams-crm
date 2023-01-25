import Layout from "@/Layouts/Consultor/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/inertia-react";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function Edit({dados, historicos, status, contatos}) {
    const {put, setData} = useForm();

    function onSubmit(e) {
        console.log('xx')
        e.preventDefault();
        put(route('consultor.leads.atendimento.update', dados.id));
    }

    return (
        <Layout titlePage="Lead - Em Atendimento">

            <form onSubmit={onSubmit}>
                <div className="bg-white px-lg-6 py-lg-5 mb-4">
                    <LeadsDados dados={dados}/>
                </div>
                <div className="bg-white px-lg-6 py-lg-5 mb-4">
                    <div className="row">
                        {historicos.map((dados) => (
                            <div className="card mb-3 border">
                                <div className="card-body">
                                    <h6 className="card-subtitle text-muted">
                                        {dados.status}
                                    </h6>
                                    <p>{dados.msg}</p>
                                    <span className="small">Data: {dados.data_criacao}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white px-lg-6 py-lg-5 mb-2">
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
                                        type="submit">Enviar
                                    Anotações
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
