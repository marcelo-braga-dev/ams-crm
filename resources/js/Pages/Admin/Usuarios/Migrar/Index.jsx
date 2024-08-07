import Layout from "@/Layouts/Layout";
import * as React from "react";
import {TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import MenuItem from "@mui/material/MenuItem";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import {ExclamationCircle} from "react-bootstrap-icons";

export default function ({dados}) {

    const {data, setData, post} = useForm()

    function submit() {
        post(route('admin.usuarios.migrar.store'))
        window.location.reload()
    }

    return (
        <Layout container titlePage="Migrar Conteúdo de Usuários" menu="usuarios" submenu="usuarios-migrar">
            <CardContainer>
                <CardTitle title={<h6 className="text-danger d-block mb-3">ESSA OPERAÇÃO É IRREVERSÍVEL!</h6>} icon={<ExclamationCircle color="red" size={22}/>}/>
                <CardBody>
                    <form>
                        <div className="row">
                            <div className="col-md-4 mb-4">
                                <span className="d-block">Enviar dados do Usuário</span>
                                <TextField label="Selecione o Usuário..." select
                                           fullWidth required size="small" defaultValue=""
                                           onChange={e => setData('consultor_antigo', e.target.value)}>
                                    {dados.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            #{option.id} - {option.nome}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                            <div className="col-md-4 mb-4">
                                <span className="d-block">Para Usuário Recebedor</span>
                                <TextField label="Selecione o Usuário..." select
                                           fullWidth required size="small" defaultValue=""
                                           onChange={e => setData('novo_consultor', e.target.value)}>
                                    {dados.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            #{option.id} - {option.nome}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-4">

                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-auto">
                                <button type="button" className="btn btn-dark" data-bs-toggle="modal"
                                        data-bs-target="#modalEnviar">
                                    ENVIAR
                                </button>
                            </div>
                        </div>
                    </form>
                </CardBody>
            </CardContainer>

            {/*MODAL ENVIAR*/}
            <div className="modal fade mt-5" id="modalEnviar" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Migrar Dados</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Confirmar Migração de <b>TODOS</b> os dados de um usuário para o outro.</p>
                            <h6 className="text-danger d-block mb-3">ESSA OPERAÇÃO É IRREVERSÍVEL!</h6>

                            <b>{dados[dados.findIndex(i => i.id == data.consultor_antigo)]?.nome} </b>
                            para
                            <b> {dados[dados.findIndex(i => i.id == data.novo_consultor)]?.nome}</b>

                            {(!data.consultor_antigo || !data.novo_consultor) &&
                                <div className="alert alert-danger text-white">Selecione o Usuário</div>}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-secondary me-4"
                                    data-bs-dismiss="modal">
                                Fechar
                            </button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal"
                                    onClick={() => submit()} disabled={!data.consultor_antigo || !data.novo_consultor}>
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
