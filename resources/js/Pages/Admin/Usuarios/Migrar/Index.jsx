import Layout from "@/Layouts/Admin/Layout";
import {Button, Table} from "reactstrap";
import * as React from "react";
import {FormLabel, Radio, RadioGroup, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from '@mui/material/FormControl';
import {useForm} from "@inertiajs/react";
import MenuItem from "@mui/material/MenuItem";

export default function ({dados}) {

    const {data, setData, post} = useForm()

    function submit() {
        post(route('admin.usuarios.migrar.store'))
        window.location.reload()
    }

    return (
        <Layout container titlePage="Migrar Conteúdo de Consultor(a)"
                menu="usuarios" submenu="migrar">
            <h6 className="text-danger d-block mb-3">ESSA OPERAÇÃO É IRREVERSÍVEL!</h6>

            <form>
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <span className="d-block">Enviar dados de Consultor(a) </span>
                        <TextField label="Selecione o Consultor..." select
                                   fullWidth required size="small" defaultValue=""
                                   onChange={e => setData('consultor_antigo', e.target.value)}>
                            {dados.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    #{option.id} - {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-md-4 mb-4">
                        <span className="d-block">Para Consultor(a) Recebedor</span>
                        <TextField label="Selecione o Consultor..." select
                                   fullWidth required size="small" defaultValue=""
                                   onChange={e => setData('novo_consultor', e.target.value)}>
                            {dados.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    #{option.id} - {option.name}
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

            {/*MODAL ENVIAR*/}
            <div className="modal fade" id="modalEnviar" tabIndex="-1" aria-labelledby="exampleModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Migrar Dados</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Confirmar Migração de <b>TODOS</b> os dados de um consultor para o outro.</p>
                            <h6 className="text-danger d-block mb-3">ESSA OPERAÇÃO É IRREVERSÍVEL!</h6>


                            <b>{dados[dados.findIndex(i => i.id == data.consultor_antigo)]?.name} </b>
                            >>>
                            <b> {dados[dados.findIndex(i => i.id == data.novo_consultor)]?.name}</b>

                            {(!data.consultor_antigo || !data.novo_consultor) &&
                                <div className="alert alert-danger text-white">Selecione os Consultores</div>}
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
