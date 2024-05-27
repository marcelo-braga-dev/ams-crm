import {FormControl, Radio, RadioGroup, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import pesquisaCep from '@/Helpers/pesquisaCep';

import maskJquery from "@/Helpers/maskJquery";

export default function InfoCliente({setData, data}) {

    maskJquery()

    return <>
        <h6>Cliente</h6>
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
                <div className={"col mb-3"}>
                    <TextField required label="Nome" id="nome" fullWidth
                               onChange={e => setData('nome', e.target.value)}/>
                </div>
            )}
            {data.pessoa === 'Jurídica' && (
                <div className={"col mb-3"}>
                <TextField label="Razão Social" id="razao_social" required
                           onChange={e => setData('razao_social', e.target.value)} fullWidth/>
            </div>
            )}
        </div>
        <div className="row">
            {data.pessoa === 'Pessoa Física' && (<div className="col mb-3">
                <TextField label={'RG'} required fullWidth className="rg"
                           onBlur={e => setData('rg', e.target.value)}/>
            </div>)}
            {data.pessoa === 'Pessoa Física' && (<div className="col mb-3">
                <TextField label={'CPF'} required fullWidth className="cpf"
                           onBlur={e => setData('cpf', e.target.value)}/>
            </div>)}
            {data.pessoa === 'Jurídica' && (<div className="col mb-3">
                <TextField label={'CNPJ'} required fullWidth className="cnpj"
                           onBlur={e => setData('cnpj', e.target.value)}/>
            </div>)}
            {data.pessoa === 'Jurídica' && (<div className="col mb-3">
                <TextField label={'Inscrição Estadual'} required fullWidth
                           onBlur={e => setData('inscricao_estadual', e.target.value)}/>
            </div>)}
        </div>
        <div className="row mb-4">
            <div className="col mb-3">
                <TextField label="Data Nascimento" id="nascimento" required
                           onBlur={e => setData('nascimento', e.target.value)} type={'date'}
                           fullWidth InputLabelProps={{shrink: true}}></TextField>
            </div>
            <div className="col mb-3">
                <TextField label={'Telefone'} required fullWidth className="phone"
                           onBlur={e => setData('telefone', e.target.value)}/>
            </div>
            <div className="col mb-3">
                <TextField label="Email" type="email"
                           onBlur={e => setData('email', e.target.value)} fullWidth>
                </TextField>
            </div>
        </div>
        <div className="row">
            <div className="col mb-3 col-6 col-md-2">
                <TextField label='Cep' InputLabelProps={{shrink: true}} required fullWidth className="cep"
                           onChange={e => setData('endereco', {...data.endereco, cep: e.target.value})}
                           onBlur={e => pesquisaCep(e.target.value, setData, data)}/>

            </div>
            <div className="col mb-3 col-12 col-md-10">
                <TextField label="Rua/Av." fullWidth required
                           InputLabelProps={{shrink: true}} id="rua"
                           onChange={e => setData('endereco', {...data.endereco, rua: e.target.value})}/>
            </div>
            <div className="col mb-3 col-6 col-md-2">
                <TextField label="Número" fullWidth required
                           InputLabelProps={{shrink: true}}
                           onChange={e => setData('endereco', {...data.endereco, numero: e.target.value})}/>
            </div>
            <div className="col mb-3 col-6 col-md-4">
                <TextField label="Complemento" fullWidth
                           InputLabelProps={{shrink: true}}
                           onChange={e => setData('endereco', {...data.endereco, complemento: e.target.value})}/>
                {/*'complemento', e.target.value)}/>*/}
            </div>
            <div className="col mb-3 col-12 col-md-6">
                <TextField label="Bairro" fullWidth required
                           InputLabelProps={{shrink: true}} id="bairro"
                           onChange={e => setData('endereco', {...data.endereco, bairro: e.target.value})}/>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <TextField label="Cidade" fullWidth required id="cidade"
                           InputLabelProps={{shrink: true}}
                           onChange={e => setData('endereco', {...data.endereco, cidade: e.target.value})}/>
            </div>
            <div className="col">
                <TextField label="Estado" fullWidth required id="estado"
                           InputLabelProps={{shrink: true}}
                           onChange={e => setData('endereco', {...data.endereco, estado: e.target.value})}/>
            </div>
        </div>
    </>
}
