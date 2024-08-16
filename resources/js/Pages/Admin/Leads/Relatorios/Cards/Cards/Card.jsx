import React, {useState} from "react";
import PinDropIcon from '@mui/icons-material/PinDrop';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import Checkbox from '@mui/material/Checkbox';
import {ArrowUpShort, CardList, Headset, Pen, PersonFill, PinAngle, PinAngleFill, Telephone} from "react-bootstrap-icons";
import {Typography} from "@mui/material";

export default function CardLeads({dados, btn, leadsSelecionados}) {
    const [pin, setPin] = useState(dados.pin)

    function armazenarPin() {
        axios.post(route('geral.pins.leads'), {lead_id: dados.id})
    }

    return (
        <div className="pesquisar-card card m-2 mb-3" style={{width: 300}}>

            <div className="card-body pb-0 pt-0">
                <div className="row border-bottom justify-content-between mb-2">
                    <div className="col-1 text-dark">
                        <Checkbox size="small" key={dados.id} onChange={() => leadsSelecionados(dados.id)}/>
                    </div>
                    <div className="col-auto pt-2">
                        {pin ?
                            <PinAngleFill color="red" onClick={() => {
                                setPin(e => !e)
                                armazenarPin()
                            }} sx={{fontSize: 20}}/>
                            : <PinAngle onClick={() => {
                                setPin(e => !e)
                                armazenarPin()
                            }}/>}
                    </div>
                </div>

                <div className="row border-bottom pb-2 mb-2">
                    <div className="col-1 text-dark">
                        <PersonFill size="18"/>
                    </div>
                    <div className="col-9 text-dark text-truncate">
                        {dados.cliente.classificacao} <Typography variant="body1" fontWeight="bold">{dados.cliente.nome.toUpperCase()}</Typography>
                    </div>
                </div>

                <div className="row border-bottom mb-2">
                    {/*VENDEDOR*/}
                    {dados.consultor &&
                        <div className="row">
                            <div className="col-1 mb-2">
                                <Pen size="14"/>
                            </div>
                            <div className="col-10 text-dark text-truncate">
                                <Typography variant="body1">{dados.consultor}</Typography>
                            </div>
                        </div>
                    }

                    {/*SDR*/}
                    {dados.sdr_nome &&
                        <div className="row">
                            <div className="col-1 mb-2">
                                <Headset size="17"/>
                            </div>
                            <div className="col-10 text-dark text-truncate">
                                <Typography variant="body1">{dados.sdr_nome}</Typography>
                            </div>
                        </div>
                    }
                </div>

                {/*Status Periodo*/}
                {dados.infos.status_dias &&
                    <div className="row">
                        <div className="col-1 text-center">
                            <ArrowUpShort size="25"/>
                        </div>
                        <div className="col-10 text-dark text-truncate">
                            <Typography variant="body1">{dados.infos.status_data} há {dados.infos.status_dias}</Typography>
                        </div>
                    </div>
                }

                {/*CNPJ*/}
                {dados.cliente.cnpj &&
                    <div className="row">
                        <div className="col-1">
                            <CardList size="17"/>
                        </div>
                        <div className="col-10 text-dark text-truncate">
                            <Typography variant="body1">{dados.cliente.cnpj}</Typography>
                        </div>
                    </div>
                }

                {/*TELEFONE*/}
                {dados.contato.telefone &&
                    <div className="row">
                        <div className="col-1 mb-2">
                            <Telephone size="15"/>
                        </div>
                        <div className="col-10 text-dark text-truncate">
                            <Typography variant="body1">{dados.contato.telefone}</Typography>
                        </div>
                    </div>
                }

                {/*EMAIL*/}
                {dados.contato.email &&
                    <div className="row">
                        <div className="col-1 mb-2">
                            <EmailIcon sx={{fontSize: 18}}/>
                        </div>
                        <div className="col-10 text-dark text-truncate">
                            <Typography variant="body1">{dados.contato.email}</Typography>
                        </div>
                    </div>
                }

                {/*LOCALIZACAO*/}
                {dados.cliente.cidade &&
                    <div className="row">
                        <div className="col-1 mb-2">
                            <PinDropIcon sx={{fontSize: 18}}/>
                        </div>
                        <div className="col-10 text-dark text-truncate">
                            <Typography variant="body1">{dados.cliente.cidade} / {dados.cliente.estado}</Typography>
                        </div>
                    </div>
                }

                {!!dados?.infos?.pedido_dias && <div className="row mt-3">
                    <div className={dados?.infos?.pedido_dias < 15
                        ? ''
                        : (dados?.infos?.pedido_dias > 30 ? "alert bg-danger text-white" : "alert bg-info text-white")}>
                        <small>Último Pedido: {dados.infos.pedido_dias} dias atrás</small>
                    </div>
                </div>}
                {dados?.infos?.pedido_dias === 0 && <div className="row mt-3"><small>Último Pedido: Hoje</small></div>}


                {/*BOTAO*/}
                {btn && <div className="row justify-content-end my-3">
                    <div className="col-auto">
                        {btn}
                    </div>
                </div>}

                {/*DATA*/}
                <div className="row border-top justify-content-between">
                    <div className="col-auto">
                        <span className="text-sm text-muted">ID: #{dados.id}</span>
                    </div>
                    <div className="col-auto mb-2">
                        <div className="row justify-content-end">
                            <div className="col-1 mb-2">
                                <CalendarMonthIcon sx={{fontSize: 18}}/>
                            </div>

                            <div className="col-10 text-truncate">
                                <span className="text-sm text-muted">{dados.infos.status_data}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
