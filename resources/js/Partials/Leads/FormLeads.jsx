import maskJquery from "@/Helpers/maskJquery";
import {FormControl, Grid2, Radio, RadioGroup, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

import pesquisaCep from "@/Helpers/pesquisaCep";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {GeoAlt, Person, Phone, Telephone} from "react-bootstrap-icons";

const estados = [{id: 'AC', nome: 'Acre'}, {id: 'AL', nome: 'Alagoas'}, {id: 'AP', nome: 'Amapá'}, {id: 'AM', nome: 'Amazonas'}, {id: 'BA', nome: 'Bahia'}, {
    id: 'CE', nome: 'Ceará'
}, {id: 'DF', nome: 'Distrito Federal'}, {id: 'ES', nome: 'Espírito Santo'}, {id: 'GO', nome: 'Goiás'}, {id: 'MA', nome: 'Maranhão'}, {
    id: 'MT', nome: 'Mato Grosso'
}, {id: 'MS', nome: 'Mato Grosso do Sul'}, {id: 'MG', nome: 'Minas Gerais'}, {id: 'PA', nome: 'Pará'}, {id: 'PB', nome: 'Paraíba'}, {id: 'PR', nome: 'Paraná'}, {
    id: 'PE', nome: 'Pernambuco'
}, {id: 'PI', nome: 'Piauí'}, {id: 'RJ', nome: 'Rio de Janeiro'}, {id: 'RN', nome: 'Rio Grande do Norte'}, {id: 'RS', nome: 'Rio Grande do Sul'}, {
    id: 'RO', nome: 'Rondônia'
}, {id: 'RR', nome: 'Roraima'}, {id: 'SC', nome: 'Santa Catarina'}, {id: 'SP', nome: 'São Paulo'}, {id: 'SE', nome: 'Sergipe'}, {id: 'TO', nome: 'Tocantins'}]

export default function FormLeads({data, setData, required}) {

    const [isPj, setIsPj] = useState('pj')

    useEffect(() => {
        maskJquery()
    }, [isPj]);


    const [novoTelefone, setNovoTelefone] = useState(''); // Estado para o novo telefone
    const [novoContato, setNovoContato] = useState('');

    // Função para atualizar o telefone existente
    const handleTelefoneChange = (index, value) => {
        const novosTelefones = [...data.telefones];
        novosTelefones[index].numero = value;
        setData('telefones', novosTelefones);
    };

    // Função para adicionar um novo telefone diretamente quando o usuário termina de digitar
    const handleAdicionarTelefone = () => {
        if (novoTelefone.trim()) {
            const novo = {id: Date.now(), numero: novoTelefone, contato_nome: novoContato};
            setData('telefones', [...data.telefones, novo]); // Adiciona o novo telefone ao estado
            setNovoTelefone(''); // Limpa o campo de entrada
            setNovoContato('');
        }
    };

    // Função para atualizar o novo telefone no estado `data` enquanto o usuário digita
    const handleNovoTelefoneChange = (value) => {
        setNovoTelefone(value);
    };

    const handleNovoContatoChange = (value) => {
        setNovoContato(value);
    };

    return (<>
        <CardContainer>
            <CardTitle title="Dados do Lead" icon={<Person size={22}/>}/>
            <CardBody>
                <div className="row">
                    {/*Check Pessoa*/}
                    <div className="col">
                        <FormControl>
                            <RadioGroup
                                row aria-labelledby="pessoa" defaultValue={isPj}
                                name="row-radio-buttons-group" onChange={e => setIsPj(e.target.value)}>
                                <FormControlLabel value="pf" control={<Radio/>} label="Pessoa Física"/>
                                <FormControlLabel value="pj" control={<Radio/>} label="Jurídica"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className="row mt-3">
                    {isPj === 'pf' && (<div className="col-md-6 mb-4">
                        <TextField required label="Nome" id="nome" fullWidth defaultValue={data?.nome}
                                   onChange={e => setData('nome', e.target.value)}/>
                    </div>)}
                    {isPj === 'pj' && (<>
                        <div className="col-md-6 mb-4">
                            <TextField label="Nome Fantasia" id="nome" fullWidth defaultValue={data?.nome}
                                       onChange={e => setData('nome', e.target.value)}/>
                        </div>
                        <div className="col-md-6 mb-4">
                            <TextField label="Razão Social" id="razao_social" required defaultValue={data?.razao_social}
                                       onChange={e => setData('razao_social', e.target.value)} fullWidth/>
                        </div>
                    </>)}
                </div>
                <div className="row">
                    {isPj === 'pf' && (<div className="col-md-4 mb-4">
                        <TextField label={'CPF'} required fullWidth className="cpf" defaultValue={data?.cpf}
                                   onBlur={e => setData('cpf', e.target.value)}/>
                    </div>)}
                    {isPj === 'pf' && (<div className="col-md-4 mb-4">
                        <TextField label={'RG'} required={required} fullWidth className="rg" defaultValue={data?.rg}
                                   onBlur={e => setData('rg', e.target.value)}/>
                    </div>)}
                    {isPj === 'pj' && (<div className="col-md-4 mb-4">
                        <TextField label={'CNPJ'} required fullWidth className="cnpj" defaultValue={data?.cnpj}
                                   onBlur={e => setData('cnpj', e.target.value)}/>
                    </div>)}
                    {isPj === 'pj' && (<div className="col-md-4 mb-4">
                        <TextField label={'Inscrição Estadual'} required={required} fullWidth defaultValue={data?.inscricao_estadual}
                                   onBlur={e => setData('inscricao_estadual', e.target.value)}/>
                    </div>)}
                </div>
                <div className="row">
                    <div className="col-md-3 mb-4">
                        <TextField label={isPj === 'pj' ? 'Data Abertura Empresa' : "Data Nascimento"} id="nascimento" required={required}
                                   defaultValue={data?.nascimento}
                                   onBlur={e => setData('nascimento', e.target.value)} type={'date'}
                                   fullWidth InputLabelProps={{shrink: true}}></TextField>
                    </div>
                    {/*<div className="col-md-3 mb-4">*/}
                    {/*    <TextField label={'Atendente'} required={required} fullWidth defaultValue={data?.atendente}*/}
                    {/*               onBlur={e => setData('atendente', e.target.value)}/>*/}
                    {/*</div>*/}
                    <div className="col-md-3 mb-4">
                        <TextField label="Email" type="email" defaultValue={data?.email}
                                   onBlur={e => setData('email', e.target.value)} fullWidth>
                        </TextField>
                    </div>
                </div>
            </CardBody>
        </CardContainer>

        <CardContainer>
            <CardTitle title="Telefones" icon={<Telephone size={20}/>}/>
            <CardBody>
                <div className="row row-cols-5">
                    {data?.telefones?.map((item, i) => (
                        <Grid2 container>
                            <Grid2 item>
                                <TextField
                                    label="Nome do Contato"
                                    fullWidth
                                    value={item.contato_nome}
                                    onChange={(e) => handleContatoChange(i, e.target.value)}
                                />
                            </Grid2>
                            <Grid2 item>
                                <div key={item.id} className="col mb-3">
                                    <TextField
                                        label={`Telefone ${i + 1}:`}
                                        required={i < 1}
                                        fullWidth
                                        className="phone"
                                        value={item.numero}
                                        onChange={(e) => handleTelefoneChange(i, e.target.value)}
                                    />
                                </div>
                            </Grid2>
                        </Grid2>

                    ))}


                </div>
                <Grid2 container spacing={2}>
                    <Grid2 item size={{md: 3}}>
                        <TextField
                            label="Nome do Contato"
                            fullWidth
                            value={novoContato}
                            onChange={(e) => handleNovoContatoChange(e.target.value)}
                        />
                    </Grid2>
                    <Grid2 item>
                        <TextField
                            label="Adicionar Telefone"
                            fullWidth
                            className="phone"
                            value={novoTelefone}
                            onChange={(e) => handleNovoTelefoneChange(e.target.value)}
                            onBlur={handleAdicionarTelefone} // Adiciona o telefone ao desfocar do campo
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleAdicionarTelefone(); // Adiciona o telefone ao pressionar Enter
                                    e.preventDefault(); // Evita a submissão do formulário ou outros comportamentos indesejados
                                }
                            }}
                        />
                    </Grid2>
                </Grid2>
            </CardBody>

        </CardContainer>

        <CardContainer>
            <CardTitle title="Endereço" icon={<GeoAlt size={20}/>}/>
            <CardBody>
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
                                       ...data?.endereco, complemento: e.target.value
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
                        <TextField label="Estado" fullWidth required={required} id="estado" select
                                   value={data?.endereco?.estado}
                                   defaultValue={data?.endereco?.estado ?? ''}
                                   onChange={e => setData('endereco', {...data?.endereco, estado: e.target.value})}>
                            {estados.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                        </TextField>
                    </div>
                </div>
            </CardBody>
        </CardContainer>

    </>)
}
