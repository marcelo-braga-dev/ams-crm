import maskJquery from "@/Helpers/maskJquery";
import {FormControl, Radio, RadioGroup, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import pesquisaCep from "@/Helpers/pesquisaCep";
import MenuItem from "@mui/material/MenuItem";

const estados = [
    {id: 'AC', nome: 'Acre'},
    {id: 'AL', nome: 'Alagoas'},
    {id: 'AP', nome: 'Amapá'},
    {id: 'AM', nome: 'Amazonas'},
    {id: 'BA', nome: 'Bahia'},
    {id: 'CE', nome: 'Ceará'},
    {id: 'DF', nome: 'Distrito Federal'},
    {id: 'ES', nome: 'Espírito Santo'},
    {id: 'GO', nome: 'Goiás'},
    {id: 'MA', nome: 'Maranhão'},
    {id: 'MT', nome: 'Mato Grosso'},
    {id: 'MS', nome: 'Mato Grosso do Sul'},
    {id: 'MG', nome: 'Minas Gerais'},
    {id: 'PA', nome: 'Pará'},
    {id: 'PB', nome: 'Paraíba'},
    {id: 'PR', nome: 'Paraná'},
    {id: 'PE', nome: 'Pernambuco'},
    {id: 'PI', nome: 'Piauí'},
    {id: 'RJ', nome: 'Rio de Janeiro'},
    {id: 'RN', nome: 'Rio Grande do Norte'},
    {id: 'RS', nome: 'Rio Grande do Sul'},
    {id: 'RO', nome: 'Rondônia'},
    {id: 'RR', nome: 'Roraima'},
    {id: 'SC', nome: 'Santa Catarina'},
    {id: 'SP', nome: 'São Paulo'},
    {id: 'SE', nome: 'Sergipe'},
    {id: 'TO', nome: 'Tocantins'}
]

export default function InputsDadosLead({data, setData, required}) {
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
                {data?.pessoa === 'Pessoa Física' && (
                    <div className="col-md-6 mb-4">
                        <TextField required label="Nome" id="nome" fullWidth defaultValue={data?.nome}
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>)}
                {data?.pessoa === 'Jurídica' && (<>
                    <div className="col-md-6 mb-4">
                        <TextField required label="Nome Fantasia" id="nome" fullWidth defaultValue={data?.nome}
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>
                    <div className="col-md-6 mb-4">
                        <TextField label="Razão Social" id="razao_social" required defaultValue={data?.razao_social}
                                   onChange={e => setData('razao_social', e.target.value)} fullWidth/>
                    </div>
                </>)}
            </div>
            <div className="row">
                {data?.pessoa === 'Pessoa Física' && (<div className="col-md-4 mb-4">
                    <TextField label={'RG'} required={required} fullWidth className="rg" defaultValue={data?.rg}
                               onBlur={e => setData('rg', e.target.value)}/>
                </div>)}
                {data?.pessoa === 'Pessoa Física' && (<div className="col-md-4 mb-4">
                    <TextField label={'CPF'} required={required} fullWidth className="cpf" defaultValue={data?.cpf}
                               onBlur={e => setData('cpf', e.target.value)}/>
                </div>)}
                {data?.pessoa === 'Jurídica' && (<div className="col-md-4 mb-4">
                    <TextField label={'CNPJ'} required={required} fullWidth className="cnpj" defaultValue={data?.cnpj}
                               onBlur={e => setData('cnpj', e.target.value)}/>
                </div>)}
                {data?.pessoa === 'Jurídica' && (<div className="col-md-4 mb-4">
                    <TextField label={'Inscrição Estadual'} required={required} fullWidth defaultValue={data?.inscricao_estadual}
                               onBlur={e => setData('inscricao_estadual', e.target.value)}/>
                </div>)}
            </div>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <TextField label="Data Nascimento" id="nascimento" required={required} defaultValue={data?.nascimento}
                               onBlur={e => setData('nascimento', e.target.value)} type={'date'}
                               fullWidth InputLabelProps={{shrink: true}}></TextField>
                </div>
                <div className="col-md-4 mb-4">
                    <TextField label={'Telefone'} required={required} fullWidth className="phone" defaultValue={data?.telefone}
                               onBlur={e => setData('telefone', e.target.value)}/>
                </div>
                <div className="col-md-4 mb-4">
                    <TextField label="Email" type="email" defaultValue={data?.email}
                               onBlur={e => setData('email', e.target.value)} fullWidth>
                    </TextField>
                </div>
            </div>
            <div className="row">
                <div className="mb-4 col-6 col-md-2">
                    <TextField label='Cep' InputLabelProps={{shrink: true}} required={required} fullWidth className="cep"
                               defaultValue={data?.endereco?.cep}
                               onChange={e => setData('endereco', {...data?.endereco, cep: e.target.value})}
                               onBlur={e => pesquisaCep(e.target.value, setData, data)}/>

                </div>
                <div className="mb-4 col-12 col-md-10">
                    <TextField label="Rua/Av." fullWidth required={required} defaultValue={data?.endereco?.rua}
                               InputLabelProps={{shrink: true}} id="rua"
                               onChange={e => setData('endereco', {...data?.endereco, rua: e.target.value})}/>
                </div>
                <div className="mb-4 col-6 col-md-2">
                    <TextField label="Número" fullWidth required={required} defaultValue={data?.endereco?.numero}
                               InputLabelProps={{shrink: true}}
                               onChange={e => setData('endereco', {...data?.endereco, numero: e.target.value})}/>
                </div>
                <div className="mb-4 col-6 col-md-4">
                    <TextField label="Complemento" fullWidth defaultValue={data?.endereco?.complemento}
                               InputLabelProps={{shrink: true}}
                               onChange={e => setData('endereco', {
                                   ...data?.endereco,
                                   complemento: e.target.value
                               })}/>
                </div>
                <div className="mb-4 col-md-6">
                    <TextField label="Bairro" fullWidth required={required}
                               InputLabelProps={{shrink: true}} id="bairro" defaultValue={data?.endereco?.bairro}
                               onChange={e => setData('endereco', {...data?.endereco, bairro: e.target.value})}/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <TextField label="Cidade" fullWidth required={required} id="cidade" defaultValue={data?.endereco?.cidade}
                               onChange={e => setData('endereco', {...data?.endereco, cidade: e.target.value})}/>
                </div>
                <div className="col-md-4 mb-4">
                    <TextField label="Estado" fullWidth required id="estado" select
                               value={data?.endereco?.estado}
                               defaultValue={data?.endereco?.estado}
                               onChange={e => setData('endereco', {...data?.endereco, estado: e.target.value})}>
                        {estados.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                    </TextField>
                </div>
            </div>
        </>
    )
}
