import {useState} from 'react';
import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import {FormControl, Radio, RadioGroup, TextField} from "@mui/material";
import {useForm} from "@inertiajs/react";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import maskJquery from "@/Helpers/maskJquery";
import pesquisaCep from "@/Helpers/pesquisaCep";

export default function Create({setores}) {
    const [alertSetor, setAlertSetor] = useState(false);
    const {data, setData, post} = useForm({
        pessoa: 'Jurídica'
    });

    maskJquery()

    function onSubmit(e) {
        e.preventDefault()
        if (data.setor) {
            post(route('admin.clientes.leads.leads-main.store'))
            return;
        }
        setAlertSetor(true)
    }

    return (
        <Layout container titlePage="Cadastro de Leads" menu="leads" submenu="leads-cadastrar">
            <div className="shadow p-3 mb-4">
                <div className="row">
                    {alertSetor && <div className="alert alert-danger mb-4 text-white">Selecione o SETOR</div>}

                    <div className="col-6">
                        {/*Setores*/}
                        <TextField label="Setor" select required fullWidth
                                   defaultValue={data.setor}
                                   onChange={e => setData('setor', e.target.value)}>
                            {setores.map((setor, index) =>
                                <MenuItem key={index} value={setor.id}>{setor.nome}</MenuItem>
                            )}
                        </TextField>
                    </div>
                </div>
            </div>

            <form onSubmit={onSubmit}>
                <div className="row mt-4">
                    {/*Check Pessoa*/}
                    <div className="col">
                        <FormControl>
                            <RadioGroup
                                row aria-labelledby="pessoa" defaultValue={data.pessoa}
                                name="row-radio-buttons-group" onChange={e => setData('pessoa', e.target.value)}>
                                <FormControlLabel value="Jurídica" control={<Radio/>} label="Jurídica"/>
                                <FormControlLabel value="Pessoa Física" control={<Radio/>} label="Pessoa Física"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="row mt-3">
                    {data.pessoa === 'Pessoa Física' && (
                        <div className="col-md-6 mb-4">
                            <TextField required label="Nome" id="nome" fullWidth
                                       onChange={e => setData('nome', e.target.value)}/>
                        </div>)}
                    {data.pessoa === 'Jurídica' && (<>
                        <div className="col-md-6 mb-4">
                            <TextField required label="Nome Fantasia" id="nome" fullWidth
                                       onChange={e => setData('nome', e.target.value)}/>
                        </div>
                        <div className="col-md-6 mb-4">
                            <TextField label="Razão Social" id="razao_social"
                                       onChange={e => setData('razao_social', e.target.value)} fullWidth/>
                        </div>
                    </>)}
                </div>
                <div className="row">
                    {data.pessoa === 'Pessoa Física' && (
                        <div className="col mb-4">
                            <TextField label={'RG'} fullWidth className="rg"
                                       onBlur={e => setData('rg', e.target.value)}/>
                        </div>
                    )}
                    {data.pessoa === 'Pessoa Física' && (
                        <div className="col mb-4">
                            <TextField label={'CPF'} fullWidth className="cpf"
                                       onBlur={e => setData('cpf', e.target.value)}/>
                        </div>
                    )}
                    {data.pessoa === 'Jurídica' && (
                        <div className="col mb-4">
                            <TextField label={'CNPJ'} fullWidth className="cnpj"
                                       onBlur={e => setData('cnpj', e.target.value)}/>
                        </div>
                    )}
                    {data.pessoa === 'Jurídica' && (
                        <div className="col mb-4">
                            <TextField label={'Inscrição Estadual'} fullWidth
                                       onBlur={e => setData('inscricao_estadual', e.target.value)}/>
                        </div>
                    )}
                </div>
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <TextField label="Data Nascimento" id="nascimento"
                                   onBlur={e => setData('nascimento', e.target.value)} type={'date'}
                                   fullWidth InputLabelProps={{shrink: true}}></TextField>
                    </div>
                    <div className="col-md-3 mb-4">
                        <TextField label={'Telefone'} fullWidth className="phone"
                                   onBlur={e => setData('telefone', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField label="Email" type="email"
                                   onBlur={e => setData('email', e.target.value)} fullWidth>
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-4 col-6 col-md-2">
                        <TextField label='Cep' InputLabelProps={{shrink: true}} fullWidth className="cep"
                                   onChange={e => setData('endereco', {...data.endereco, cep: e.target.value})}
                                   onBlur={e => pesquisaCep(e.target.value, setData, data)}/>

                    </div>
                    <div className="mb-4 col-12 col-md-10">
                        <TextField label="Rua/Av." fullWidth
                                   InputLabelProps={{shrink: true}} id="rua"
                                   onChange={e => setData('endereco', {...data.endereco, rua: e.target.value})}/>
                    </div>
                    <div className="mb-4 col-6 col-md-2">
                        <TextField label="Número" fullWidth
                                   InputLabelProps={{shrink: true}}
                                   onChange={e => setData('endereco', {...data.endereco, numero: e.target.value})}/>
                    </div>
                    <div className="mb-4 col-6 col-md-4">
                        <TextField label="Complemento" fullWidth
                                   InputLabelProps={{shrink: true}}
                                   onChange={e => setData('endereco', {
                                       ...data.endereco,
                                       complemento: e.target.value
                                   })}/>
                        {/*'complemento', e.target.value)}/>*/}
                    </div>
                    <div className="mb-4 col-12 col-md-6">
                        <TextField label="Bairro" fullWidth
                                   InputLabelProps={{shrink: true}} id="bairro"
                                   onChange={e => setData('endereco', {...data.endereco, bairro: e.target.value})}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col mb-4">
                        <TextField label="Cidade" fullWidth id="cidade"
                                   InputLabelProps={{shrink: true}}
                                   onChange={e => setData('cidade', e.target.value)}/>
                    </div>
                    <div className="col mb-4">
                        <TextField label="Estado" fullWidth id="estado"
                                   InputLabelProps={{shrink: true}}
                                   onChange={e => setData('estado', e.target.value)}/>
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
