import Layout from "@/Layouts/Layout";
import LeadsDados from "@/Components/Leads/LeadsDados";
import {useForm} from "@inertiajs/react";
import {router} from '@inertiajs/react'
import HistoricoLista from "@/Components/Leads/HistoricoLista";
import * as React from "react";
import {TextField} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";

export default function Show({dados, historicos, status, contatos, isSdr}) {
    const {data, setData, post} = useForm({
        msg: '',
        classificacao: dados.cliente.classificacao
    });

    function onSubmit(e) {
        e.preventDefault();

        router.post(route('consultor.leads.aberto.update', dados.id), {
            _method: 'put',
            ...data
        })
    }

    function enviarComentario(tag, id) {

        post(route('consultor.leads.add-comentarios', {id: id, comentario: data[tag]}));
        window.location.reload()
    }

    return (
        <Layout empty titlePage="Em Aberto - Lead" voltar={route('consultor.leads.main.index')}
                menu="leads">
            <LeadsDados dados={dados}/>

            {!isSdr && <CardContainer>
                <CardBody>
                    <div className="row mb-4">
                        <div className="col">
                            <form onSubmit={onSubmit}>
                                <h6>Iniciar Atendimento</h6>
                                <div className="row">
                                    <div className="col-md-3 mb-3">
                                        <TextField label="Meio Contato" select fullWidth required
                                                   defaultValue=""
                                                   size="small"
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
                                        <TextField label="Anotações" multiline rows="2" fullWidth
                                                   onChange={e => setData('msg', e.target.value)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="text-center">
                                            <button className="btn btn-primary" type="submit"
                                                    onClick={() => setData('salvar_msg', true)}>
                                                Iniciar Atendimento
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>
            }

            <div className="row mt-4">
                <div className="col">
                    <HistoricoLista
                        historicos={historicos} enviarComentario={enviarComentario}
                        setData={setData} urlPedidos="consultor.pedidos.show"
                    />
                </div>
            </div>
        </Layout>
    )
}
