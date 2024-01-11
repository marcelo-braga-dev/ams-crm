import {Col} from "reactstrap";
import {FormControl, MenuItem, Radio, RadioGroup, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import pesquisaCep from '@/Helpers/pesquisaCep';

import maskJquery from "@/Helpers/maskJquery";

export default function InfoCliente({data, setData}) {

    maskJquery()

    return (
        <>
            <div className="row mt-4">
                {/*Check Pessoa*/}
                <div className="col">
                    <FormControl>
                        <RadioGroup
                            row aria-labelledby="pessoa" defaultValue={data.pessoa}
                            name="row-radio-buttons-group" onChange={e => setData('pessoa', e.target.value)}>
                            <FormControlLabel value="Pessoa Física" control={<Radio/>} label="Pessoa Física"/>
                            <FormControlLabel value="Jurídica" control={<Radio/>} label="Jurídica"/>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
            <div className="row mt-3">
                {data.pessoa === 'Pessoa Física' && (
                    <div className="col-md-6 mb-3">
                        <TextField required label="Nome" id="nome" fullWidth defaultValue={data.nome}
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>)}
                {data.pessoa === 'Jurídica' && (<>
                    <div className="col-md-6 mb-3">
                        <TextField required label="Nome Fantasia" id="nome" fullWidth defaultValue={data.nome}
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>
                    <div className="col-md-6 mb-3">
                        <TextField label="Razão Social" id="razao_social" required defaultValue={data.razao_social}
                                   onChange={e => setData('razao_social', e.target.value)} fullWidth/>
                    </div>
                </>)}
            </div>
            <div className="row">
                {data.pessoa === 'Pessoa Física' && (<Col className={"mb-3"} lg={"4"}>
                    <TextField label={'RG'} required fullWidth className="rg" defaultValue={data.rg}
                               onBlur={e => setData('rg', e.target.value)}/>
                </Col>)}
                {data.pessoa === 'Pessoa Física' && (<Col className={"mb-3"} lg={"4"}>
                    <TextField label={'CPF'} required fullWidth className="cpf" defaultValue={data.cpf}
                               onBlur={e => setData('cpf', e.target.value)}/>
                </Col>)}
                {data.pessoa === 'Jurídica' && (<Col className={"mb-3"} lg={"4"}>
                    <TextField label={'CNPJ'} required fullWidth className="cnpj" defaultValue={data.cnpj}
                               onBlur={e => setData('cnpj', e.target.value)}/>
                </Col>)}
                {data.pessoa === 'Jurídica' && (<Col className={"mb-3"} lg={"4"}>
                    <TextField label={'Inscrição Estadual'} required fullWidth defaultValue={data.inscricao_estadual}
                               onBlur={e => setData('inscricao_estadual', e.target.value)}/>
                </Col>)}
            </div>
            <div className="row">
                <Col className={"mb-3"} lg={"4"}>
                    <TextField label="Data Nascimento" id="nascimento" required defaultValue={data.nascimento}
                               onBlur={e => setData('nascimento', e.target.value)} type={'date'}
                               fullWidth InputLabelProps={{shrink: true}}></TextField>
                </Col>
                <Col className={"mb-3"} lg={"4"}>
                    <TextField label={'Telefone'} required fullWidth className="phone" defaultValue={data.telefone}
                               onBlur={e => setData('telefone', e.target.value)}/>
                </Col>
                <Col className="mb-3">
                    <TextField label="Email" type="email" defaultValue={data.email}
                               onBlur={e => setData('email', e.target.value)} fullWidth>
                    </TextField>
                </Col>
            </div>
            <div className="row">
                <Col className="mb-3 col-6 col-md-2">
                    <TextField label='Cep' InputLabelProps={{shrink: true}} required fullWidth className="cep"
                               defaultValue={data.endereco.cep}
                               onChange={e => setData('endereco', {...data.endereco, cep: e.target.value})}
                               onBlur={e => pesquisaCep(e.target.value, setData, data)}/>

                </Col>
                <Col className="mb-3 col-12 col-md-10">
                    <TextField label="Rua/Av." fullWidth required defaultValue={data.endereco.rua}
                               InputLabelProps={{shrink: true}} id="rua"
                               onChange={e => setData('endereco', {...data.endereco, rua: e.target.value})}/>
                </Col>
                <Col className="mb-3 col-6 col-md-2">
                    <TextField label="Número" fullWidth required defaultValue={data.endereco.numero}
                               InputLabelProps={{shrink: true}}
                               onChange={e => setData('endereco', {...data.endereco, numero: e.target.value})}/>
                </Col>
                <Col className="mb-3 col-6 col-md-4">
                    <TextField label="Complemento" fullWidth defaultValue={data.endereco.complemento}
                               InputLabelProps={{shrink: true}}
                               onChange={e => setData('endereco', {
                                   ...data.endereco,
                                   complemento: e.target.value
                               })}/>
                    {/*'complemento', e.target.value)}/>*/}
                </Col>
                <Col className="mb-3 col-12 col-md-6">
                    <TextField label="Bairro" fullWidth required
                               InputLabelProps={{shrink: true}} id="bairro" defaultValue={data.endereco.bairro}
                               onChange={e => setData('endereco', {...data.endereco, bairro: e.target.value})}/>
                </Col>
            </div>
            <div className="row">
                <Col>
                    <TextField label="Cidade" fullWidth required id="cidade" defaultValue={data.endereco.cidade}
                               InputLabelProps={{shrink: true}}
                               onChange={e => setData('cidade', e.target.value)}/>
                </Col>
                <Col>
                    <TextField label="Estado" fullWidth required id="estado"
                               InputLabelProps={{shrink: true}} defaultValue={data.endereco.estado}
                               onChange={e => setData('estado', e.target.value)}/>
                </Col>
            </div>
        </>
    )
}
