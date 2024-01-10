import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";

import {FormControl, Radio, RadioGroup, TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import FormControlLabel from "@mui/material/FormControlLabel";
import maskJquery from "@/Helpers/maskJquery";

export default function Create() {
    maskJquery()
    const {data, setData, post} = useForm({
        pessoa: 'Jurídica'
    });

    function onSubmit(e) {
        e.preventDefault()
        post(route('consultor.leads.main.store'), {preserveScroll: true})
    }

    return (
        <Layout container titlePage="Cadastro de Leads" menu="clientes-cadastrar">
            <form onSubmit={onSubmit}>
                <div className="bg-white shadow p-3 mb-4">
                    <div className="row mt-4">
                        {/*Check Pessoa*/}
                        <div className="col">
                            <FormControl>
                                <RadioGroup
                                    row defaultValue="Jurídica"
                                    onChange={e => setData('pessoa', e.target.value)}>
                                    <FormControlLabel value="Jurídica" control={<Radio/>} label="Jurídica"/>
                                    <FormControlLabel value="Pessoa Física" control={<Radio/>} label="Pessoa Física"/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md-6 mb-3">
                            <TextField label={data.pessoa === 'Jurídica' ? 'Nome Fantasia:' : "Nome:"} fullWidth
                                       required
                                       onBlur={e => setData('nome', e.target.value)}/>
                        </div>
                        {data.pessoa === 'Jurídica' &&
                            <div className="col-md-6 mb-3">
                                <TextField label="Razão Social :" fullWidth
                                           onBlur={e => setData('razao_social', e.target.value)}/>
                            </div>}
                    </div>
                    {/*PJ*/}
                    {<div className="row">
                        {data.pessoa === 'Pessoa Física' &&
                            <div className="col-md-6 mb-3">
                                <TextField label="CPF:" fullWidth className="cpf"
                                           onBlur={e => setData('cpf', e.target.value)}/>
                            </div>}
                        {data.pessoa === 'Jurídica' &&
                            <div className="col-md-6 mb-3">
                                <TextField label="CNPJ:" fullWidth className="cnpj"
                                           onBlur={e => setData('cnpj', e.target.value)}/>
                            </div>}
                        {data.pessoa === 'Jurídica' &&
                            <div className="col-md-6 mb-3">
                                <TextField
                                    label="Inscrição Estadual:" fullWidth
                                    onBlur={e => setData('inscricao_estadual', e.target.value)}/>
                            </div>}
                    </div>}
                    <div className="row">
                        <div className="col mb-3">
                            <TextField label="Atendente:" fullWidth
                                       onBlur={e => setData('atendente', e.target.value
                                       )}/>
                        </div>
                        <div className="col mb-3">
                            <TextField label="Telefone:" fullWidth className="phone"
                                       onBlur={e => setData('telefone', e.target.value)}/>
                        </div>
                        <div className="col mb-3">
                            <TextField label="Email:" fullWidth
                                       onBlur={e => setData('email', e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col mb-3">
                            <TextField label="Cidade:" fullWidth
                                       onBlur={e => setData('cidade', e.target.value)}/>
                        </div>
                        <div className="col mb-3">
                            <TextField label="Estado:" fullWidth
                                       onBlur={e => setData('estado', e.target.value)}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <TextField label="Informações do Cliente:" fullWidth multiline rows="2"
                                       onBlur={e => setData('infos', e.target.value)}/>
                        </div>
                    </div>
                </div>

                <div className="">
                    <div className="text-center">
                        <button className="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}
