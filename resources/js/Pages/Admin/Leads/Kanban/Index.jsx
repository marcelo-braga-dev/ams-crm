import Layout from "@/Layouts/Layout.jsx";
import AbertoCards from "@/Pages/Admin/Leads/Relatorios/Cards/Cards/AbertoCards.jsx";
import AtendimentoCards from "@/Pages/Admin/Leads/Relatorios/Cards/Cards/AtendimentoCard.jsx";
import AtivoCard from "@/Pages/Admin/Leads/Relatorios/Cards/Cards/AtivoCard.jsx";
import FinalizadoCard from "@/Pages/Admin/Leads/Relatorios/Cards/Cards/FinalizadoCard.jsx";
import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {Typography} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import {ArrowUpShort, CardList, Headset, Pen, PersonFill, PinAngle, PinAngleFill, Telephone} from "react-bootstrap-icons";
import EmailIcon from "@mui/icons-material/Email.js";
import PinDropIcon from "@mui/icons-material/PinDrop.js";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth.js";

const styleCard = 'p-2 mx-1 text-white row justify-content-between rounded-top'

const Page = ({registros}) => {
    const [leads, setRegistros] = useState([])
    const [carregandoRegistros, setCarregandoRegistros] = useState(true)
    const fetchLeads = async () => {
        setCarregandoRegistros(true);
        try {
            const res = await axios.get(route('admin.leads.registros', {id: 1}));
            setRegistros(res.data.registros);

        } finally {
            setCarregandoRegistros(false);
        }
    };

    useEffect(() => {
        fetchLeads();
    }, []);

    function leadsSelecionados(idLead) {
        const index = idLeads.indexOf(idLead)
        if (index >= 0) idLeads.splice(index)
        else idLeads.push(idLead)
    }

    return (
        <Layout titlePage="Funil de Vendas" menu="leads" submenu="leads-kanban">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <TextField label="Representante" select fullWidth>
                        <MenuItem value={1}>Vendedor 1</MenuItem>
                        <MenuItem value={2}>Vendedor 2</MenuItem>
                        <MenuItem value={3}>Vendedor 3</MenuItem>
                    </TextField>
                </div>
            </div>

            {!carregandoRegistros &&
                <table>
                    <thead>
                    <tr>
                        {Object.values(registros).map(item => (
                            <th className="sticky-top" id="th-3">
                                <div className={styleCard} style={{backgroundColor: item.status_dados?.status_cor ?? 'black'}}>
                                    <div className='col-auto'>
                                        {item.status_dados?.status_nome}
                                    </div>
                                    <div className='col-auto'>Qdt: {leads.aberto.length}</div>
                                </div>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="align-top bg-white">

                        {Object.keys(registros).map(statusKey => {
                                const statusGroup = registros[statusKey];

                                return (
                                    <td id="td-3" style={{minWidth: 300}}>
                                        {statusGroup.items?.map(item =>
                                            <div className="pesquisar-card card m-2 mb-3" style={{width: 300}}>

                                                <div className="card-body pb-0 pt-0">
                                                    <div className="row border-bottom justify-content-between mb-2">
                                                        <div className="col-1 text-dark">
                                                            {/*<Checkbox size="small" key={item.id} onChange={() => leadsSelecionados(dados.id)}/>*/}
                                                        </div>
                                                        {/*<div className="col-auto pt-2">*/}
                                                        {/*    {pin ?*/}
                                                        {/*        <PinAngleFill color="red" onClick={() => {*/}
                                                        {/*            setPin(e => !e)*/}
                                                        {/*            armazenarPin()*/}
                                                        {/*        }} sx={{fontSize: 20}}/>*/}
                                                        {/*        : <PinAngle onClick={() => {*/}
                                                        {/*            setPin(e => !e)*/}
                                                        {/*            armazenarPin()*/}
                                                        {/*        }}/>}*/}
                                                        {/*</div>*/}
                                                    </div>

                                                    <div className="row border-bottom pb-2 mb-2">
                                                        <div className="col-1 text-dark">
                                                            <PersonFill size="18"/>
                                                        </div>
                                                        <div className="col-9 text-dark text-truncate">
                                                            {/*{dados.cliente.classificacao} <Typography variant="body1"*/}
                                                            {/*                                          fontWeight="bold">{dados.cliente.nome.toUpperCase()}</Typography>*/}
                                                        </div>
                                                    </div>

                                                    <div className="row border-bottom mb-2">
                                                        {/*VENDEDOR*/}
                                                        {/*{dados.consultor &&*/}
                                                        {/*    <div className="row">*/}
                                                        {/*        <div className="col-1 mb-2">*/}
                                                        {/*            <Pen size="14"/>*/}
                                                        {/*        </div>*/}
                                                        {/*        <div className="col-10 text-dark text-truncate">*/}
                                                        {/*            <Typography variant="body1">{dados.consultor}</Typography>*/}
                                                        {/*        </div>*/}
                                                        {/*    </div>*/}
                                                        {/*}*/}

                                                        {/*SDR*/}
                                                        {/*{dados.sdr_nome &&*/}
                                                        {/*    <div className="row">*/}
                                                        {/*        <div className="col-1 mb-2">*/}
                                                        {/*            <Headset size="17"/>*/}
                                                        {/*        </div>*/}
                                                        {/*        <div className="col-10 text-dark text-truncate">*/}
                                                        {/*            <Typography variant="body1">{dados.sdr_nome}</Typography>*/}
                                                        {/*        </div>*/}
                                                        {/*    </div>*/}
                                                        {/*}*/}
                                                    </div>

                                                    {/*Status Periodo*/}
                                                    {/*{dados.infos.status_dias &&*/}
                                                    {/*    <div className="row">*/}
                                                    {/*        <div className="col-1 text-center">*/}
                                                    {/*            <ArrowUpShort size="25"/>*/}
                                                    {/*        </div>*/}
                                                    {/*        <div className="col-10 text-dark text-truncate">*/}
                                                    {/*            <Typography variant="body1">{dados.infos.status_data} há {dados.infos.status_dias}</Typography>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*}*/}

                                                    {/*CNPJ*/}
                                                    {/*{dados.cliente.cnpj &&*/}
                                                    {/*    <div className="row">*/}
                                                    {/*        <div className="col-1">*/}
                                                    {/*            <CardList size="17"/>*/}
                                                    {/*        </div>*/}
                                                    {/*        <div className="col-10 text-dark text-truncate">*/}
                                                    {/*            <Typography variant="body1">{dados.cliente.cnpj}</Typography>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*}*/}

                                                    {/*TELEFONE*/}
                                                    {/*{dados.contato.telefone &&*/}
                                                    {/*    <div className="row">*/}
                                                    {/*        <div className="col-1 mb-2">*/}
                                                    {/*            <Telephone size="15"/>*/}
                                                    {/*        </div>*/}
                                                    {/*        <div className="col-10 text-dark text-truncate">*/}
                                                    {/*            <Typography variant="body1">{dados.contato.telefone}</Typography>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*}*/}

                                                    {/*EMAIL*/}
                                                    {/*{dados.contato.email &&*/}
                                                    {/*    <div className="row">*/}
                                                    {/*        <div className="col-1 mb-2">*/}
                                                    {/*            <EmailIcon sx={{fontSize: 18}}/>*/}
                                                    {/*        </div>*/}
                                                    {/*        <div className="col-10 text-dark text-truncate">*/}
                                                    {/*            <Typography variant="body1">{dados.contato.email}</Typography>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*}*/}

                                                    {/*LOCALIZACAO*/}
                                                    {/*{dados.cliente.cidade &&*/}
                                                    {/*    <div className="row">*/}
                                                    {/*        <div className="col-1 mb-2">*/}
                                                    {/*            <PinDropIcon sx={{fontSize: 18}}/>*/}
                                                    {/*        </div>*/}
                                                    {/*        <div className="col-10 text-dark text-truncate">*/}
                                                    {/*            <Typography variant="body1">{dados.cliente.cidade} / {dados.cliente.estado}</Typography>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*}*/}

                                                    {/*{!!dados?.infos?.pedido_dias && <div className="row mt-3">*/}
                                                    {/*    <div className={dados?.infos?.pedido_dias < 15*/}
                                                    {/*        ? ''*/}
                                                    {/*        : (dados?.infos?.pedido_dias > 30 ? "alert bg-danger text-white" : "alert bg-info text-white")}>*/}
                                                    {/*        <small>Último Pedido: {dados.infos.pedido_dias} dias atrás</small>*/}
                                                    {/*    </div>*/}
                                                    {/*</div>}*/}
                                                    {/*{dados?.infos?.pedido_dias === 0 && <div className="row mt-3"><small>Último Pedido: Hoje</small></div>}*/}


                                                    {/*BOTAO*/}
                                                    {/*{btn && <div className="row justify-content-end my-3">*/}
                                                    {/*    <div className="col-auto">*/}
                                                    {/*        {btn}*/}
                                                    {/*    </div>*/}
                                                    {/*</div>}*/}

                                                    {/*DATA*/}
                                                    {/*<div className="row border-top justify-content-between">*/}
                                                    {/*    <div className="col-auto">*/}
                                                    {/*        <span className="text-sm text-muted">ID: #{dados.id}</span>*/}
                                                    {/*    </div>*/}
                                                    {/*    <div className="col-auto mb-2">*/}
                                                    {/*        <div className="row justify-content-end">*/}
                                                    {/*            <div className="col-1 mb-2">*/}
                                                    {/*                <CalendarMonthIcon sx={{fontSize: 18}}/>*/}
                                                    {/*            </div>*/}

                                                    {/*            <div className="col-10 text-truncate">*/}
                                                    {/*                <span className="text-sm text-muted">{dados.infos.status_data}</span>*/}
                                                    {/*            </div>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>)}
                                    </td>
                                )
                            }
                        )}


                        {/*<td id="td-3" style={{minWidth: 300}}>*/}
                        {/*    {leads.aberto.map((dado) => {*/}
                        {/*        return <AbertoCards key={dado.id} dados={dado} leadsSelecionados={leadsSelecionados}/>*/}
                        {/*    })}*/}
                        {/*</td>*/}
                        {/*<td id="td-4" style={{minWidth: 300}}>*/}
                        {/*    {leads.atendimento.map((dado) => {*/}
                        {/*        return <AtendimentoCards key={dado.id} dados={dado} leadsSelecionados={leadsSelecionados}/>*/}
                        {/*    })}*/}
                        {/*</td>*/}
                        {/*<td id="td-5" style={{minWidth: 300}}>*/}
                        {/*    {leads.ativo.map((dado) => {*/}
                        {/*        return <AtivoCard key={dado.id} dados={dado} leadsSelecionados={leadsSelecionados}/>*/}
                        {/*    })}*/}
                        {/*</td>*/}
                        {/*<td id="td-6" style={{minWidth: 300}}>*/}
                        {/*    {leads.finalizado.map((dado) => {*/}
                        {/*        return <FinalizadoCard key={dado.id} dados={dado} leadsSelecionados={leadsSelecionados}/>*/}
                        {/*    })}*/}
                        {/*</td>*/}
                    </tr>
                    </tbody>
                </table>
            }
        </Layout>
    )
}
export default Page
