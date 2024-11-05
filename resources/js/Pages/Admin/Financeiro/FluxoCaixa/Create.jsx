import Layout from "@/Layouts/Layout";
import {FormControl, Radio, RadioGroup, Stack, TextField} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {router, useForm} from "@inertiajs/react";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {CurrencyDollar, FileEarmarkPlus, Files, FileText} from "react-bootstrap-icons";
import PagamentosEntrada from "@/Pages/Admin/Financeiro/FluxoCaixa/Components/PagamentosEntrada.jsx";
import PagamentosSaida from "@/Pages/Admin/Financeiro/FluxoCaixa/Components/PagamentosSaida.jsx";

export default function ({dados}) {

    const bancos = dados.bancos ?? []

    const [tipo, setTipo] = useState()
    const [qtdPagamentos, setQtdPagamentos] = useState(1)
    const [pagamentos, setPagamentos] = useState({})

    const {data, setData} = useForm({
        empresa: '',
        franquia: '',
        fornecedor: '',
        nota_fiscal: '',
        emissao: '',
        anexo: '',
        descricao: '',
        pagamentos: {}
    });

    function submit(e) {
        e.preventDefault()
        router.post(route('admin.financeiro.fluxo-caixa.store'), {...data, pagamentos, tipo})
    }

    const handleTipo = (valor) => {
        setTipo(valor)
        setPagamentos({})
    }

    return (
        <Layout titlePage="Inserir Informações" menu="financeiro" submenu="fluxo-caixa"
                voltar={route('admin.financeiro.fluxo-caixa.index')}>
            <CardContainer>
                <CardTitle title="Tipo de Nota" icon={<FileEarmarkPlus size={22}/>}/>
                <CardBody>
                    <FormControl>
                        <RadioGroup onChange={e => handleTipo(e.target.value)}>
                            <Stack direction="row" spacing={4}>
                                {dados.permissaoEntradas && <FormControlLabel value="entrada" control={<Radio size="small"/>} label="Entrada"/>}
                                {dados.permissaoSaidas && <FormControlLabel value="saida" control={<Radio size="small"/>} label="Saída"/>}
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    {!dados.permissaoEntradas && <small className="d-block">Você não tem permissão para cadastros de entradas.</small>}
                    {!dados.permissaoSaidas && <small>Você não tem permissão para cadastros de saídas.</small>}
                </CardBody>
            </CardContainer>

            {tipo &&
                <form onSubmit={submit}>
                    <CardContainer>
                        <CardTitle title="Informações" icon={<Files size={22}/>}/>
                        <CardBody>
                            <div className="row mb-4">
                                <div className="col-md-3">
                                    <TextField select label="Empresa" fullWidth required
                                               onChange={e => setData('empresa', e.target.value)}>
                                        {dados.empresas.map(item =>
                                            <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
                                        )}
                                    </TextField>
                                </div>
                                <div className="col-md-3">
                                    <TextField select label="Franquia" fullWidth required
                                               onChange={e => setData('franquia', e.target.value)}>
                                        {dados.franquias.map(item =>
                                            <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
                                        )}
                                    </TextField>
                                </div>
                                <div className="col-md-3">
                                    <TextField select label="Fornecedor" fullWidth required
                                               onChange={e => setData('fornecedor', e.target.value)}>
                                        {dados.fornecedores.map(item => <MenuItem key={item.id} value={item.id}>{item.valor}</MenuItem>)}
                                    </TextField>
                                </div>
                                <div className="col-md-3">
                                    <TextField select label="Origem do Gasto" fullWidth required
                                               onChange={e => setData('origem', e.target.value)}>
                                        <MenuItem value="outros">Outros</MenuItem>
                                        <MenuItem value="escritorio">Escritório</MenuItem>
                                        <MenuItem value="servicos">Serviços</MenuItem>
                                    </TextField>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <TextField label="Descrição" multiline rows="3" fullWidth required
                                               onChange={e => setData('descricao', e.target.value)}/>
                                </div>
                            </div>
                        </CardBody>
                    </CardContainer>

                    <CardContainer>
                        <CardTitle title="Nota Fiscal" icon={<FileText size={22}/>}/>
                        <CardBody>
                            <div className="row">
                                <div className="col">
                                    <TextField fullWidth label="N° da Nota Fiscal" onChange={e => setData('nota_fiscal', e.target.value)}/>
                                </div>
                                <div className="col">
                                    <TextField type="date" label="Data de Emissão da Nota" fullWidth InputLabelProps={{shrink: true}}
                                               onChange={e => setData('emissao', e.target.value)}/>
                                </div>
                                <div className="col">
                                    <TextField label="Anexo" type="file" InputLabelProps={{shrink: true}}
                                               onChange={e => setData('anexo', e.target.files[0])}/>
                                </div>
                            </div>
                        </CardBody>
                    </CardContainer>

                    <CardContainer>
                        <CardTitle title="Pagamentos" icon={<CurrencyDollar size={22}/>}/>
                        <CardBody>
                            <div className="row border-bottom mb-4">
                                <div className="col-md-2 mb-3">
                                    <TextField label="Qtd de Parcelas" type="number" value={qtdPagamentos} required fullWidth
                                               onChange={e => setQtdPagamentos(e.target.value)}/>
                                </div>
                            </div>
                            {tipo === 'entrada'
                                ? <PagamentosEntrada qtdPagamentos={qtdPagamentos} pagamentos={pagamentos} setPagamentos={setPagamentos} bancos={bancos}/>
                                : <PagamentosSaida qtdPagamentos={qtdPagamentos} pagamentos={pagamentos} setPagamentos={setPagamentos} bancos={bancos}/>}
                        </CardBody>
                    </CardContainer>

                    <CardContainer>
                        <CardBody>
                            <div className="row justify-content-center">
                                <div className="col-auto">
                                    <button className="btn btn-success">Salvar</button>
                                </div>
                            </div>
                        </CardBody>
                    </CardContainer>
                </form>
            }
        </Layout>
    )
}
