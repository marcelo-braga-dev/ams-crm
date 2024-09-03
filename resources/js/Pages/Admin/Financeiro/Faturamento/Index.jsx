import Layout from "@/Layouts/Layout.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Divider, Stack, TextField, Typography} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import SelectMesesMultiples from "@/Components/Inputs/SelectMesesMultiples.jsx";
import convertFloatToMoney from "@/Helpers/converterDataHorario.jsx";
import LinearProgress from "@mui/material/LinearProgress";
import CardTable from "@/Components/Cards/CardTable.jsx";
import * as React from "react";
import {useState} from "react";
import {sum} from "lodash";
import {router} from "@inertiajs/react";
import {Check, Download, Eye, PencilSquare, Trash} from "react-bootstrap-icons";
import Link from "@/Components/Link.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import Checkbox from "@mui/material/Checkbox";
import Switch from "@mui/material/Switch";

const Page = ({vendas, setores, setor, planilhasGeradas, mes, ano, empresas, distribuidoras, distribuidora, isFaturado}) => {
    const [mesesSelecionado, setMesesSelecionado] = useState(mes)
    const [anoSelecionado, setAnoSelecionado] = useState(ano)
    const [setorSelecionado, setSetorSelecionado] = useState(setor)
    const [distribuidoraSelecionado, setDistribuidoraSelecionado] = useState(distribuidora)

    const [pedidosSelecionado, setPedidosSelecionados] = useState([])
    const [nota, setNota] = useState()
    const [empresa, setEmpresa] = useState()
    const [anotacoes, setAnotacoes] = useState()
    const [addAnotacoesBtn, setAddAnotacoesBtn] = useState(false)
    const [addNovaAnotacao, setAddNovaAnotacao] = useState('')
    const [distribuidoraPlanilha, setDistribuidora] = useState()

    const total = sum(vendas.map(item => item.valor))
    const [carregando, setCarregando] = useState(false)
    const [filtroFaturados, setFiltroFaturados] = useState(isFaturado >= 1)

    function pesquisar() {
        setCarregando(true)
        router.get(route('admin.financeiro.faturamento.index',
            {
                mes: mesesSelecionado, ano: anoSelecionado, setor: setorSelecionado, distribuidora: distribuidoraSelecionado,
                faturados: filtroFaturados
            }))
    }

    const gerarPlanilha = (e) => {
        e.preventDefault()
        router.post(route('admin.financeiro.faturamento.planilha'),
            {pedidos: pedidosSelecionado, nota, empresa, anotacoes, vendas: vendas, distribuidora: distribuidoraPlanilha})
    }

    const handleSetor = (setor) => {
        setSetorSelecionado(setor)
    }

    const handleDistribuidora = (id) => {
        setDistribuidoraSelecionado(id)
    }
    const handleAddAnotacaoes = (id) => {
        setAddAnotacoesBtn(id)
        setAddNovaAnotacao('')
    }

    const planilhaDistribuidora = (id) => {
        setDistribuidora(id)
    }

    const atualizarAnotacoes = (id) => {
        router.post(route('admin.financeiro.faturamento.atualizar-anotacao', {id, anotacao: addNovaAnotacao}), {}, {preserveScroll: true})
        setAddAnotacoesBtn()
        setAddNovaAnotacao('')

    }

    const handleCheckboxChange = (id) => {
        setPedidosSelecionados(prevState => {
            if (prevState.includes(id)) {
                return prevState.filter(pedidoId => pedidoId !== id);
            } else {
                return [...prevState, id];
            }
        });
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            setPedidosSelecionados(vendas.map(item => item.id));
        } else {
            setPedidosSelecionados([]);
        }
    };

    const removerNotaDistribuidora = (id) => {
        router.post(route('admin.financeiro.faturamento.remover-distribuidora'), {id}, {preserveScroll: true})
    }

    const allChecked = pedidosSelecionado.length === vendas.length;

    router.on('success', () => {
        setPedidosSelecionados([])
        setNota('')
        setAnotacoes('')
        setAddNovaAnotacao('')
    })

    return (
        <Layout titlePage="Faturamento de Pedidos" menu="financeiro" submenu="financeiro-faturamento">
            <CardContainer>
                <CardBody>
                    <div className="row">
                        <div className="col-md-2">
                            <TextField
                                label="Setor" value={setorSelecionado}
                                select
                                fullWidth
                                onChange={(e) => handleSetor(e.target.value)}
                            >
                                <MenuItem value="">TODOS</MenuItem>
                                {setores.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </div>
                        <div className="col-md-2">
                            <TextField
                                label="Distribuidora" defaultValue={distribuidoraSelecionado} select fullWidth
                                onChange={(e) => handleDistribuidora(e.target.value)}>
                                <MenuItem value="">TODOS</MenuItem>
                                {distribuidoras.map(item => (<MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>))}
                            </TextField>
                        </div>
                        <div className="col-2">
                            <SelectMesesMultiples value={mesesSelecionado} useState={setMesesSelecionado}/>
                        </div>
                        <div className="col-2">
                            <TextField label="Ano" select fullWidth defaultValue={anoSelecionado}
                                       onChange={e => setAnoSelecionado(e.target.value)}>
                                <MenuItem value="2023">2023</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                            </TextField>
                        </div>
                        <div className="col-auto">
                            <Switch checked={filtroFaturados} onChange={e => setFiltroFaturados(e.target.checked)}/> Não Faturados
                        </div>
                        <div className="col-2 mt-2">
                            <button className="btn btn-primary btn-sm" onClick={() => pesquisar()}>Pesquisar</button>
                        </div>
                    </div>
                </CardBody>
            </CardContainer>

            <div className="row">
                <div className="col-md-9">
                    {carregando && <LinearProgress/>}
                    {!carregando &&
                        <CardContainer>
                            <CardTable title="Pedidos"
                                       subtitle={<Typography>{pedidosSelecionado.length} Selecionados</Typography>}
                                       btn={
                                           <Stack>
                                               <Typography>Quantidade: {vendas.length}</Typography>
                                               <Typography>Total: R$ {convertFloatToMoney(total)}</Typography>
                                           </Stack>
                                       }>
                                <table className="table-1 table-hover">
                                    <thead>
                                    <tr>
                                        <th style={{width: 20}}>
                                            <Checkbox size="small" checked={allChecked} onChange={handleSelectAll}/>
                                        </th>
                                        <th className="col-1">Nota Distribuidora</th>
                                        <th>Pedido</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {vendas.map(item => {
                                        return (
                                            <tr key={item.id}>
                                                <td className="text-center">
                                                    <Checkbox size="small"
                                                              checked={pedidosSelecionado.includes(item.id)}
                                                              onChange={() => handleCheckboxChange(item.id)}
                                                    />
                                                </td>
                                                <td>
                                                    <Stack direction="row" spacing={2} alignItems="center">
                                                        <Typography>{item.nota_distribuidora}</Typography>
                                                        {item.nota_distribuidora && <Trash size={13} color="red" cursor="pointer"
                                                                                           onClick={() => removerNotaDistribuidora(item.id)}/>}
                                                    </Stack>
                                                </td>
                                                <td>
                                                    <Stack spacing={1}>
                                                        <Typography>#{item.id}</Typography>
                                                        <Typography><b>{item.status}</b></Typography>
                                                        <Typography><b>NOTA:</b> {item.nota_faturamento ?? '-'}</Typography>
                                                        <Typography variant="body2">{item.data}</Typography>
                                                    </Stack>
                                                </td>
                                                <td>
                                                    <Stack spacing={1}>
                                                        <Typography><b>Cliente:</b> {item.cliente_nome ?? item.lead_nome}</Typography>
                                                        <Typography><b>Documento:</b> {item.cliente_documento}</Typography>
                                                        <Typography><b>Setor:</b> {item.setor_nome}</Typography>
                                                        <Typography><b>Distribuidora:</b> {item.fornecedor_nome}</Typography>
                                                        <Divider/>
                                                        <Stack direction="row" spacing={2}>
                                                            <Typography><b>Valor Pedido:</b> R$ {convertFloatToMoney(item.valor)}</Typography>
                                                        </Stack>

                                                        {item.repasse > 0 && <>
                                                            <Divider/>
                                                            <Stack direction="row" spacing={2}>
                                                            <Typography><b>Repasse:</b> R$ {convertFloatToMoney(item.repasse)}</Typography>
                                                            <Typography><b>Desconto :</b> {convertFloatToMoney(item.repasse_desconto)}%</Typography>
                                                            <Typography><b>Total:</b> R$ {convertFloatToMoney(item.repasse_total)}</Typography>
                                                        </Stack></>}
                                                        <Divider/>
                                                        <Stack direction="row" spacing={2}>
                                                            <Typography><b>Comissão:</b> R$ {convertFloatToMoney(item.lucro)}</Typography>

                                                        </Stack>
                                                        <Divider/>
                                                        <Typography><b>VALOR DA NOTA: R$ {convertFloatToMoney(item.valor_nota)}</b></Typography>
                                                    </Stack>
                                                </td>
                                                <td className="text-center">
                                                    <Link icon={<Eye size={22}/>} href={route('admin.pedidos.show', item.id)}></Link>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>
                                {!vendas.length && <span className="d-block text-center p-4">Não há pedidos!</span>}
                            </CardTable>
                        </CardContainer>
                    }
                </div>
                <div className="col">
                    <CardContainer>
                        <CardTitle title="Gerar Planilha"/>
                        <CardBody>
                            <form onSubmit={gerarPlanilha}>
                                <Stack spacing={3}>
                                    <TextField label="N. Nota Distribuidora" fullWidth required value={nota}
                                               onChange={e => setNota(e.target.value)}/>
                                    <TextField label="Empresa" fullWidth required select value={empresa}
                                               onChange={e => setEmpresa(e.target.value)}>
                                        {empresas.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                                    </TextField>
                                    <TextField
                                        label="Distribuidora" select fullWidth
                                        onChange={(e) => planilhaDistribuidora(e.target.value)}>
                                        <MenuItem value="">TODOS</MenuItem>
                                        {distribuidoras.map(item => (<MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>))}
                                    </TextField>
                                    <TextField label="Anotações" value={anotacoes} onChange={e => setAnotacoes(e.target.value)} fullWidth/>
                                    <button className="btn btn-success d-block mb-0 btn-sm">Gerar Planilha</button>
                                </Stack>
                            </form>
                        </CardBody>
                    </CardContainer>
                    <CardContainer>
                        <CardTitle title="Planilhas Geradas"/>
                        <CardBody>
                            {planilhasGeradas.map(item =>
                                <CardContainer key={item.id}>
                                    <CardBody>
                                        <div className="row">
                                            <div className="col-auto"><Typography variant="body2">#{item.id}</Typography></div>
                                            <div className="col">
                                                <Stack>
                                                    <Typography variant="body2"><b>NOTA DIST.:</b> {item.nota_distribuidora}</Typography>
                                                    <Typography variant="body2"><b>EMPRESA:</b> {item.empresa_nome}</Typography>
                                                    {item.distribuidora_nome && <Typography variant="body2"><b>DISTRIB.:</b> {item.distribuidora_nome}</Typography>}
                                                    <Typography variant="body2">{item.data}</Typography>
                                                    {item.anotacoes && <Typography marginTop={1} variant="body2"><b>ANOT.:</b>{item.anotacoes}</Typography>}
                                                    {addAnotacoesBtn !== item.id &&
                                                        <Stack marginTop={1} onClick={() => handleAddAnotacaoes(item.id)} className="cursor-pointer">
                                                            <Typography variant="body2"><PencilSquare/> Anotações</Typography>
                                                        </Stack>}
                                                </Stack>
                                            </div>
                                            <div className="col-auto">
                                                <a href={item.url}><Download size={20}/></a>
                                            </div>
                                        </div>
                                        {addAnotacoesBtn === item.id && <Stack direction="row" spacing={1} marginTop={2}>
                                            <TextField size="small" value={addNovaAnotacao}
                                                       onChange={e => setAddNovaAnotacao(e.target.value)} fullWidth/>
                                            <Check color="green" cursor="pointer" size={30} onClick={() => atualizarAnotacoes(item.id)}/>
                                        </Stack>}
                                    </CardBody>
                                </CardContainer>
                            )}
                        </CardBody>
                    </CardContainer>
                </div>
            </div>
        </Layout>
    )
}

export default Page
