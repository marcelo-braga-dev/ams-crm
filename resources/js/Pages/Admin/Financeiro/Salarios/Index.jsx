import Layout from "@/Layouts/Layout";
import * as React from 'react';
import {InputAdornment, Stack, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useState} from "react";
import Switch from "@mui/material/Switch";
import {useForm} from "@inertiajs/react";
import convertFloatToMoney, {convertMoneyFloat} from "@/Helpers/converterDataHorario";
import "chart.js/auto";
import MetasAtingidas from "./Graficos/MetasAtingidas"
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import CardTitle from "@/Components/Cards/CardTitle";
import Avatar from "@mui/material/Avatar";
import {Calendar3, Cash, CashCoin} from "react-bootstrap-icons";
import {converterMesCompleto} from "@/Helpers/helper";

const startAdornment = {startAdornment: <InputAdornment position="start">R$</InputAdornment>}
const endAdornment = {endAdornment: <InputAdornment position="end">%</InputAdornment>}

const Page = ({usuarios, ano, mes}) => {
    const [registros, setRegistros] = useState([])
    const [anoSelecionado, setAnoSelecionado] = useState(ano)
    const [usuarioSelecionado, setUsuarioSelecionado] = useState()
    const [competenciaSelecionado, setCompetenciaSelecionado] = useState(mes)
    const [vendasMes, setVendasMes] = useState(0)
    const [metaMes, setMetaMes] = useState(0)
    const [margemAtingida, setMargemAtingida] = useState(0)
    const [margemAtingidaEquipe, setMargemAtingidaEquipe] = useState(0)
    const [vendasEquipe, setVendasEquipe] = useState(0)
    const [metasEquipe, setMetasEquipe] = useState(0)
    const [vendasMensais, setVendasMensais] = useState([])
    const [metasMensais, setMetasMensais] = useState([])
    const [campoEditar, setCampoEditar] = useState()
    const [usuario, setUsuario] = useState([])
    const {data, setData, reset} = useForm()

    const submit = (campo) => {
        setCampoEditar(undefined)
        axios.post(route('admin.financeiro.salarios.store', {
            ...data,
            campo,
            competencia: competenciaSelecionado,
            ano: anoSelecionado,
            user_id: usuarioSelecionado,
        })).then(res => {
            buscarRegistros();
        })
    }

    const buscarRegistros = async () => {
        try {
            if (usuarioSelecionado) {
                const res = await axios.get(route('admin.financeiro.salarios.registros', {
                    user_id: usuarioSelecionado,
                    ano: anoSelecionado,
                    competencia: competenciaSelecionado,
                }));
                const data = res.data;
                reset()
                setRegistros(data.registros);
                setVendasMes(data.vendas_mes.vendas);
                setMetaMes(data.meta_mes);
                setMetasEquipe(data.metas_equipe);
                setVendasEquipe(data.vendas_equipe);
                setVendasMensais(data.vendas_mensais);
                setMetasMensais(data.metas_mensais);
                setUsuario(data.usuario)
                setMargemAtingida(data.meta_mes > 0 ? (data.vendas_mes.vendas / data.meta_mes * 100) : null);
                setMargemAtingidaEquipe(data.metas_equipe > 0 ? (data.vendas_equipe / data.metas_equipe * 100) : null);
            }
        } catch (error) {
            console.error("Erro ao buscar registros:", error);
        }
    };

    useEffect(() => {
        buscarRegistros();
    }, [anoSelecionado, competenciaSelecionado, usuarioSelecionado]);

    function mascaraMoeda(valor, dig = 2) {
        let valorAlterado = valor.target.value;
        valorAlterado = valorAlterado.replace(/\D/g, "");

        valorAlterado = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: dig}).format(
            parseFloat(valorAlterado) / (10 ** dig)
        )

        valor.target.value = valorAlterado;
        return valorAlterado;
    }

    const meses = [
        {mes: 1, nome: 'Janeiro'},
        {mes: 2, nome: 'Fevereiro'},
        {mes: 3, nome: 'Março'},
        {mes: 4, nome: 'Abril'},
        {mes: 5, nome: 'Maio'},
        {mes: 6, nome: 'Junho'},
        {mes: 7, nome: 'Julho'},
        {mes: 8, nome: 'Agosto'},
        {mes: 9, nome: 'Setembro'},
        {mes: 10, nome: 'Outubro'},
        {mes: 11, nome: 'Novembro'},
        {mes: 12, nome: 'Dezembro'},
    ]

    return (
        <Layout titlePage="Salários" menu="financeiro" submenu="financeiro-salarios">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-3">
                            <TextField label="Usuário" select fullWidth onChange={e => setUsuarioSelecionado(e.target.value)}>
                                {usuarios.map(item => <MenuItem key={item.id} value={item.id}>
                                    <Stack direction="row" spacing={1}>
                                        <Avatar style={{width: 25, height: 25}} src={item.foto}/>
                                        <span>{item.nome}</span>
                                    </Stack>
                                </MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-2">
                            <TextField label="Competência" select fullWidth
                                       value={competenciaSelecionado ?? ''}
                                       onChange={e => setCompetenciaSelecionado(e.target.value)}>
                                {meses.map(item => <MenuItem key={item.mes} value={item.mes}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-2">
                            <TextField label="Ano" select fullWidth defaultValue={ano}
                                       onChange={e => setAnoSelecionado(e.target.value)}>
                                <MenuItem value="2023">2023</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                                <MenuItem value="2025">2025</MenuItem>
                            </TextField>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            {usuario?.id && <>
                <div className="row">
                    <div className="col-md-4">
                        <CardContainer>
                            <CardBody>
                                <Stack direction="row" spacing={2}>
                                    <Avatar src={usuario.foto} style={{width: 80, height: 80}}/>
                                    <Stack spacing={1}>
                                        <Typography><b>Nome: </b>{usuario.nome}</Typography>
                                        <Typography><b>Função: </b>{usuario.funcao}</Typography>
                                        <Typography><b>Setor: </b>{usuario.setor}</Typography>
                                    </Stack>
                                </Stack>
                            </CardBody>
                        </CardContainer>
                    </div>
                    <div className="col">
                        <CardContainer>
                            <CardTitle icon={<Calendar3 size={20}/>} title={`${converterMesCompleto(competenciaSelecionado)} / ${anoSelecionado}`}/>
                            <CardBody>
                                <div className="row">
                                    <div className="col">
                                        <span><b>Meta:</b> R$ {convertFloatToMoney(metaMes ?? 0)}</span>
                                    </div>
                                    <div className="col">
                                <span className={margemAtingida ? (margemAtingida >= 100 ? 'text-success' : 'text-danger') : ''}>
                                    <b>Alcançado:</b> R$ {convertFloatToMoney(vendasMes ?? 0)} {margemAtingida ? `(${convertFloatToMoney(margemAtingida ?? 0)}%)` : ''}
                                </span>
                                    </div>
                                </div>
                            </CardBody>
                        </CardContainer>
                    </div>
                </div>


                <CardContainer>
                    <CardTitle title={<>Salário Total: R$ {convertFloatToMoney(registros?.total ?? 0)}</>} icon={<CashCoin size={24}/>}/>
                    <CardBody>
                        <div className="row row-cols-4">
                            {/*Salario*/}
                            <div className="col">
                                <CardContainer>
                                    <CardTitle title="Salário Fixo"/>
                                    <CardBody>
                                        <TextField fullWidth label="Valor Salário" className="mb-4"
                                                   value={(data?.salario_fixo?.valor ?? convertFloatToMoney(registros?.salario_fixo?.valor ?? 0)) ?? ''}
                                                   InputProps={startAdornment}
                                                   onChange={e => {
                                                       setData({
                                                           'salario_fixo': {
                                                               ...data.salario_fixo,
                                                               valor: mascaraMoeda(e),
                                                           }
                                                       })
                                                       setCampoEditar('salario_fixo')
                                                   }}/>

                                        <TextField type="date" fullWidth className="mb-4"
                                                   label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                                   value={(data?.salario_fixo?.data ?? registros?.salario_fixo?.data_pagamento) ?? ''}
                                                   onChange={e => {
                                                       setData({
                                                           'salario_fixo': {
                                                               ...data.salario_fixo,
                                                               data: e.target.value,
                                                           }
                                                       })
                                                       setCampoEditar('salario_fixo')
                                                   }}/>
                                        <TextField fullWidth multiline className="mb-2"
                                                   label="Anotações"
                                                   value={(data?.salario_fixo?.anotacoes ?? registros?.salario_fixo?.anotacoes) ?? ''}
                                                   onChange={e => {
                                                       setData({
                                                           'salario_fixo': {
                                                               ...data.salario_fixo,
                                                               anotacoes: e.target.value,
                                                           }
                                                       })
                                                       setCampoEditar('salario_fixo')
                                                   }}/>
                                        <div className="row justify-content-between">
                                            <div className="col-auto">
                                                <Switch
                                                    checked={((data?.salario_fixo?.status?.toString())) ? data?.salario_fixo?.status == '1' : registros?.salario_fixo?.status == '1'}
                                                    onChange={e => {
                                                        setData({
                                                            'salario_fixo': {
                                                                ...data.salario_fixo,
                                                                status: e.target.checked,
                                                            }
                                                        })
                                                        setCampoEditar('salario_fixo')
                                                    }}/>
                                                <small>{((data?.salario_fixo?.status?.toString()) ? data?.salario_fixo?.status == '1' : registros?.salario_fixo?.status == '1') ? 'Pago' : 'Aberto'}</small>
                                            </div>
                                            <div className="col-auto">
                                                {campoEditar == 'salario_fixo' &&
                                                    <button className="p-1 px-2 m-1 mt-2 btn btn-success btn-sm"
                                                            onClick={() => submit('salario_fixo')}>Salvar</button>
                                                }
                                            </div>
                                        </div>
                                    </CardBody>
                                </CardContainer>
                            </div>

                            {/*Prêmio Mensal*/}
                            <div className="col">
                                <CardContainer>
                                    <CardTitle title="Prêmio Mensal"/>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col">
                                                <TextField fullWidth label="Valor Prêmio" InputProps={endAdornment} className="mb-4"
                                                           value={(data?.premio?.margem ?? convertFloatToMoney(registros?.premio?.margem ?? 0, 3)) ?? ''}
                                                           onChange={e => {
                                                               setData({
                                                                   'premio': {
                                                                       ...data.premio,
                                                                       margem: mascaraMoeda(e, 3),
                                                                       valor: convertMoneyFloat(mascaraMoeda(e, 3), 3) * vendasMes / 100
                                                                   }
                                                               })
                                                               setCampoEditar('premio')
                                                           }}/>
                                            </div>
                                            <div className="pt-2 col">
                                                R$ {convertFloatToMoney((data?.premio?.margem ? convertMoneyFloat(data?.premio?.margem ?? 0, 3) : registros?.premio?.margem) * vendasMes / 100)}
                                            </div>
                                        </div>
                                        <TextField type="date" fullWidth className="mb-4"
                                                   label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                                   value={(data?.premio?.data ?? registros?.premio?.data_pagamento) ?? ''}
                                                   onChange={e => {
                                                       //
                                                       setCampoEditar('premio')
                                                       setData({
                                                           'premio': {
                                                               ...data.premio,
                                                               data: e.target.value
                                                           }
                                                       })
                                                   }}/>
                                        <TextField fullWidth multiline className="mb-2"
                                                   label="Anotações"
                                                   value={(data?.premio?.anotacoes ?? registros?.premio?.anotacoes) ?? ''}
                                                   onChange={e => {
                                                       setData({
                                                           'premio': {
                                                               ...data.premio,
                                                               anotacoes: e.target.value,
                                                           }
                                                       })
                                                       setCampoEditar('premio')
                                                   }}/>
                                        <div className="col-12 text-start">
                                            <div className="row justify-content-between">
                                                <div className="col-auto">
                                                    <Switch
                                                        checked={((data?.premio?.status?.toString())) ? data?.premio?.status == '1' : registros?.premio?.status == '1'}
                                                        onChange={e => {
                                                            setData({
                                                                'premio': {
                                                                    ...data.premio,
                                                                    status: e.target.checked
                                                                }
                                                            })
                                                            setCampoEditar('premio')
                                                        }}/>
                                                    <small>{((data?.premio?.status?.toString()) ? data?.premio?.status == '1' : registros?.premio?.status == '1') ? 'Pago' : 'Aberto'}</small>
                                                </div>
                                                <div className="col-auto">
                                                    {campoEditar == 'premio' &&
                                                        <button className="p-1 px-2 m-1 mt-2 btn btn-success btn-sm"
                                                                onClick={() => submit('premio')}>Salvar</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </CardContainer>
                            </div>

                            {/*Prêmio Extra*/}
                            <div className="col">
                                <CardContainer>
                                    <CardTitle title="Prêmio Extra"/>
                                    <CardBody>
                                        <TextField fullWidth label="Valor Prêmio" className="mb-4"
                                                   value={(data?.premio_extra?.valor ?? convertFloatToMoney(registros?.premio_extra?.valor ?? 0)) ?? ''}
                                                   InputProps={startAdornment}
                                                   onChange={e => {
                                                       setData({
                                                           'premio_extra': {
                                                               ...data.premio_extra,
                                                               valor: mascaraMoeda(e),
                                                           }
                                                       })
                                                       setCampoEditar('premio_extra')
                                                   }}/>
                                        <TextField type="date" fullWidth className="mb-4"
                                                   label="Pagamento Realizado Dia" InputLabelProps={{shrink: true}}
                                                   value={(data?.premio_extra?.data ?? registros?.premio_extra?.data_pagamento) ?? ''}
                                                   onChange={e => {
                                                       setData({
                                                           'premio_extra': {
                                                               ...data.premio_extra,
                                                               data: e.target.value
                                                           }
                                                       })
                                                       setCampoEditar('premio_extra')
                                                   }}/>
                                        <TextField fullWidth multiline className="mb-2"
                                                   label="Anotações"
                                                   value={(data?.premio_extra?.anotacoes ?? registros?.premio_extra?.anotacoes) ?? ''}
                                                   onChange={e => {
                                                       setData({
                                                           'premio_extra': {
                                                               ...data.premio_extra,
                                                               anotacoes: e.target.value,
                                                           }
                                                       })
                                                       setCampoEditar('premio_extra')
                                                   }}/>
                                        <div className="col-12 text-start">
                                            <div className="row justify-content-between">
                                                <div className="col-auto">
                                                    <Switch
                                                        checked={((data?.premio_extra?.status)?.toString()) ? data?.premio_extra?.status == '1' : registros?.premio_extra?.status == '1'}
                                                        onChange={e => {
                                                            setData({
                                                                'premio_extra': {
                                                                    ...data.premio_extra,
                                                                    status: e.target.checked
                                                                }
                                                            })
                                                            setCampoEditar('premio_extra')
                                                        }}/>
                                                    <small>{((data?.premio_extra?.status)?.toString() ? data?.premio_extra?.status == '1' : registros?.premio_extra?.status == '1') ? 'Pago' : 'Aberto'}</small>
                                                </div>
                                                <div className="col-auto">
                                                    {campoEditar == 'premio_extra' &&
                                                        <button className="p-1 px-2 m-1 mt-2 btn btn-success btn-sm"
                                                                onClick={() => submit('premio_extra')}>Salvar</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </CardBody>
                                </CardContainer>
                            </div>

                            {/*Bonus*/}
                            <div className="col">
                                <CardContainer>
                                    <CardTitle title="Prêmio Mensal"/>
                                    <CardBody>
                                        <TextField fullWidth label="Valor do Prêmio" className="mb-4"
                                                   value={(data?.bonus?.valor ?? convertFloatToMoney(registros?.bonus?.valor ?? 0)) ?? ''}
                                                   InputProps={startAdornment}
                                                   onChange={e => {
                                                       setData({
                                                           'bonus': {
                                                               ...data.bonus,
                                                               valor: mascaraMoeda(e),
                                                           }
                                                       })
                                                       setCampoEditar('bonus')
                                                   }}/>
                                        <TextField type="date" fullWidth className="mb-4"
                                                   label="Pagamento Realizado Dia"
                                                   InputLabelProps={{shrink: true}}
                                                   value={(data?.bonus?.data ?? registros?.bonus?.data_pagamento) ?? ''}
                                                   onChange={e => {
                                                       setData({
                                                           'bonus': {
                                                               ...data.bonus,
                                                               data: e.target.value,
                                                           }
                                                       })
                                                       setCampoEditar('bonus')
                                                   }}/>
                                        <TextField fullWidth multiline className="mb-2"
                                                   label="Anotações"
                                                   value={(data?.bonus?.anotacoes ?? registros?.bonus?.anotacoes) ?? ''}
                                                   onChange={e => {
                                                       setData({
                                                           'bonus': {
                                                               ...data.bonus,
                                                               anotacoes: e.target.value,
                                                           }
                                                       })
                                                       setCampoEditar('bonus')
                                                   }}/>
                                        <div className="row justify-content-between">
                                            <div className="col-auto">
                                                <Switch
                                                    checked={((data?.bonus?.status)?.toString()) ? data?.bonus?.status == '1' : registros?.bonus?.status == '1'}
                                                    onChange={e => {
                                                        setData({
                                                            'bonus': {
                                                                ...data.bonus,
                                                                status: e.target.checked
                                                            }
                                                        })
                                                        setCampoEditar('bonus')
                                                    }}/>
                                                <small>{((data?.bonus?.status)?.toString() ? data?.bonus?.status == '1' : registros?.bonus?.status == '1') ? 'Pago' : 'Aberto'}</small>
                                            </div>
                                            <div className="col-auto">
                                                {campoEditar == 'bonus' &&
                                                    <button className="p-1 px-2 m-1 mt-2 btn btn-success btn-sm"
                                                            onClick={() => submit('bonus')}>Salvar</button>
                                                }
                                            </div>
                                        </div>
                                    </CardBody>
                                </CardContainer>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>

                <CardContainer>
                    <CardBody>
                        <div className="row">
                            <div className="col">
                                <h6>Meta x Vendas de {ano} de {usuario.nome}</h6>
                                <MetasAtingidas metasMensais={metasMensais} vendasMensais={vendasMensais}/>
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>
            </>}
        </Layout>
    )
}
export default Page
