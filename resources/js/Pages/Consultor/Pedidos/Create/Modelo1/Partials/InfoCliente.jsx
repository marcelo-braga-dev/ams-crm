import {Col} from "reactstrap";
import {FormControl, MenuItem, Radio, RadioGroup, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import pesquisaCep from '@/Helpers/pesquisaCep';

import maskJquery from "@/Helpers/maskJquery";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {Person} from "react-bootstrap-icons";

export default function InfoCliente({data, setData}) {

    maskJquery()

    return (
        <CardContainer>
            <CardTitle title="Informações do Cliente" icon={<Person size={22} color="back"/>}/>
            <CardBody>
                <div className="row">
                    {/*Check Pessoa*/}
                    <div className="col">
                        <FormControl>
                            <RadioGroup
                                row aria-labelledby="pessoa" defaultValue="Pessoa Física"
                                name="row-radio-buttons-group" onChange={e => setData('pessoa', e.target.value)}>
                                <FormControlLabel value="Pessoa Física" control={<Radio/>} label="Pessoa Física"/>
                                <FormControlLabel value="Jurídica" control={<Radio/>} label="Jurídica"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="row mt-3">
                    {data.pessoa === 'Pessoa Física' && (
                        <div className="col-md-6 mb-4">
                            <TextField required label="Nome" id="nome" fullWidth defaultValue={data.nome}
                                       onChange={e => setData('nome', e.target.value)}/>
                        </div>)}
                    {data.pessoa === 'Jurídica' && (
                        <div className="col-md-6 mb-4">
                            <TextField label="Razão Social" id="razao_social" required defaultValue={data.razao_social}
                                       onChange={e => setData('razao_social', e.target.value)} fullWidth/>
                        </div>)}
                </div>
                <div className="row">
                    {data.pessoa === 'Pessoa Física' && (<Col className={"mb-4"} lg={"4"}>
                        <TextField label={'CPF'} required fullWidth className="cpf" defaultValue={data.cpf}
                                   onBlur={e => setData('cpf', e.target.value)}/>
                    </Col>)}
                    {data.pessoa === 'Pessoa Física' && (<Col className={"mb-4"} lg={"4"}>
                        <TextField label={'RG'} required fullWidth className="rg" defaultValue={data.rg}
                                   onBlur={e => setData('rg', e.target.value)}/>
                    </Col>)}

                    {data.pessoa === 'Jurídica' && (<Col className={"mb-4"} lg={"4"}>
                        <TextField label={'CNPJ'} required fullWidth className="cnpj" defaultValue={data.cnpj}
                                   onBlur={e => setData('cnpj', e.target.value)}/>
                    </Col>)}
                    {data.pessoa === 'Jurídica' && (<Col className={"mb-4"} lg={"4"}>
                        <TextField label={'Inscrição Estadual'} required fullWidth defaultValue={data.inscricao_estadual}
                                   onBlur={e => setData('inscricao_estadual', e.target.value)}/>
                    </Col>)}
                </div>
                <div className="row">
                    <Col className={"mb-4"} lg={"4"}>
                        <TextField label="Data Nascimento" id="nascimento" required defaultValue={data.nascimento}
                                   onBlur={e => setData('nascimento', e.target.value)} type={'date'}
                                   fullWidth InputLabelProps={{shrink: true}}></TextField>
                    </Col>
                    <Col className={"mb-4"} lg={"4"}>
                        <TextField label={'Telefone'} required fullWidth className="phone" defaultValue={data.telefone}
                                   onBlur={e => setData('telefone', e.target.value)}/>
                    </Col>
                    <Col className="mb-4">
                        <TextField label="Email" type="email" defaultValue={data.email}
                                   onBlur={e => setData('email', e.target.value)} fullWidth>
                        </TextField>
                    </Col>
                </div>
                <div className="row">
                    <Col className="mb-4 col-6 col-md-2">
                        <TextField label='Cep' InputLabelProps={{shrink: true}} required fullWidth className="cep"
                                   defaultValue={data.endereco.cep}
                                   onChange={e => setData('endereco', {...data.endereco, cep: e.target.value})}
                                   onBlur={e => pesquisaCep(e.target.value, setData, data)}/>

                    </Col>
                    <Col className="mb-4 col-12 col-md-10">
                        <TextField label="Rua/Av." fullWidth required defaultValue={data.endereco.rua}
                                   InputLabelProps={{shrink: true}} id="rua"
                                   onChange={e => setData('endereco', {...data.endereco, rua: e.target.value})}/>
                    </Col>
                    <Col className="mb-4 col-6 col-md-2">
                        <TextField label="Número" fullWidth required defaultValue={data.endereco.numero}
                                   InputLabelProps={{shrink: true}}
                                   onChange={e => setData('endereco', {...data.endereco, numero: e.target.value})}/>
                    </Col>
                    <Col className="mb-4 col-6 col-md-4">
                        <TextField label="Complemento" fullWidth defaultValue={data.endereco.complemento}
                                   InputLabelProps={{shrink: true}}
                                   onChange={e => setData('endereco', {
                                       ...data.endereco,
                                       complemento: e.target.value
                                   })}/>
                    </Col>
                    <Col className="mb-4 col-12 col-md-6">
                        <TextField label="Bairro" fullWidth required
                                   InputLabelProps={{shrink: true}} id="bairro" defaultValue={data.endereco.bairro}
                                   onChange={e => setData('endereco', {...data.endereco, bairro: e.target.value})}/>
                    </Col>
                </div>
                <div className="row">
                    <Col>
                        <TextField label="Cidade" fullWidth required id="cidade" defaultValue={data.endereco.cidade}
                                   InputLabelProps={{shrink: true}}
                                   onChange={e => setData('endereco', {...data.endereco, cidade: e.target.value})}/>
                    </Col>
                    <Col>
                        <TextField label="Estado" fullWidth required id="estado"
                                   InputLabelProps={{shrink: true}} defaultValue={data.endereco.estado}
                                   onChange={e => setData('endereco', {...data.endereco, estado: e.target.value})}/>
                    </Col>
                </div>
            </CardBody>
        </CardContainer>
    )
}
