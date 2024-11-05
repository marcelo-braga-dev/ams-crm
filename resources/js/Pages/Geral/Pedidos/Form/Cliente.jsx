import { FormControl, Radio, RadioGroup, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';

import pesquisaCep from '@/Helpers/pesquisaCep';

import maskJquery from '@/Helpers/maskJquery';
import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import { Person } from 'react-bootstrap-icons';
import { useEffect } from 'react';

const Cliente = ({setData, data}) => {

    useEffect(() => {
        maskJquery();
    }, []);

    return (
        <CardContainer>
            <CardTitle title="Informações do Cliente" icon={<Person size={22} color="back" />} />
            <CardBody>
                <div className="row">
                    {/*Check Pessoa*/}
                    <div className="col">
                        <FormControl>
                            <RadioGroup
                                row aria-labelledby="pessoa"
                                name="row-radio-buttons-group" onChange={e => setData('pessoa', e.target.value)}>
                                <FormControlLabel value="Pessoa Física" control={<Radio />} label="Pessoa Física" />
                                <FormControlLabel value="Jurídica" control={<Radio />} label="Jurídica" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="row mt-3">
                    {data.pessoa === 'Pessoa Física' && (
                        <div className="col-md-6 mb-4">
                            <TextField required label="Nome" id="nome" fullWidth
                                       onChange={e => setData('nome', e.target.value)} />
                        </div>)}
                    {data.pessoa === 'Jurídica' && (
                        <div className="col-md-6 mb-4">
                            <TextField label="Razão Social" id="razao_social" required
                                       onChange={e => setData('razao_social', e.target.value)} fullWidth />
                        </div>)}
                </div>
                <div className="row">
                    {data.pessoa === 'Pessoa Física' && (<div className={'mb-4'} lg={'4'}>
                        <TextField label={'RG'} required fullWidth className="rg"
                                   onBlur={e => setData('rg', e.target.value)} />
                    </div>)}
                    {data.pessoa === 'Pessoa Física' && (<div className={'mb-4'} lg={'4'}>
                        <TextField label={'CPF'} required fullWidth className="cpf"
                                   onBlur={e => setData('cpf', e.target.value)} />
                    </div>)}
                    {data.pessoa === 'Jurídica' && (<div className={'mb-4'} lg={'4'}>
                        <TextField label={'CNPJ'} required fullWidth className="cnpj"
                                   onBlur={e => setData('cnpj', e.target.value)} />
                    </div>)}
                    {data.pessoa === 'Jurídica' && (<div className={'mb-4'} lg={'4'}>
                        <TextField label={'Inscrição Estadual'} required fullWidth
                                   onBlur={e => setData('inscricao_estadual', e.target.value)} />
                    </div>)}
                </div>
                <div className="row">
                    <div className={'mb-4'} lg={'4'}>
                        <TextField label="Data Nascimento" id="nascimento" required
                                   onBlur={e => setData('nascimento', e.target.value)} type={'date'}
                                   fullWidth InputLabelProps={{ shrink: true }}></TextField>
                    </div>
                    <div className={'mb-4'} lg={'4'}>
                        <TextField label={'Telefone'} required fullWidth className="phone"
                                   onBlur={e => setData('telefone', e.target.value)} />
                    </div>
                    <div className="mb-4">
                        <TextField label="Email" type="email"
                                   onBlur={e => setData('email', e.target.value)} fullWidth>
                        </TextField>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-4 col-6 col-md-2">
                        <TextField label="Cep" InputLabelProps={{ shrink: true }} required fullWidth className="cep"

                                   onChange={e => setData('endereco', { ...data.endereco, cep: e.target.value })}
                                   onBlur={e => pesquisaCep(e.target.value, setData, data)} />

                    </div>
                    <div className="mb-4 col-12 col-md-10">
                        <TextField label="Rua/Av." fullWidth required
                                   InputLabelProps={{ shrink: true }} id="rua"
                                   onChange={e => setData('endereco', { ...data.endereco, rua: e.target.value })} />
                    </div>
                    <div className="mb-4 col-6 col-md-2">
                        <TextField label="Número" fullWidth required
                                   InputLabelProps={{ shrink: true }}
                                   onChange={e => setData('endereco', { ...data.endereco, numero: e.target.value })} />
                    </div>
                    <div className="mb-4 col-6 col-md-4">
                        <TextField label="Complemento" fullWidth
                                   InputLabelProps={{ shrink: true }}
                                   onChange={e => setData('endereco', {
                                       ...data.endereco,
                                       complemento: e.target.value,
                                   })} />
                    </div>
                    <div className="mb-4 col-12 col-md-6">
                        <TextField label="Bairro" fullWidth required
                                   InputLabelProps={{ shrink: true }} id="bairro"
                                   onChange={e => setData('endereco', { ...data.endereco, bairro: e.target.value })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <TextField label="Cidade" fullWidth required id="cidade"
                                   InputLabelProps={{ shrink: true }}
                                   onChange={e => setData('endereco', { ...data.endereco, cidade: e.target.value })} />
                    </div>
                    <div className="col">
                        <TextField label="Estado" fullWidth required id="estado"
                                   InputLabelProps={{ shrink: true }}
                                   onChange={e => setData('endereco', { ...data.endereco, estado: e.target.value })} />
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    );
};
export default Cliente;
