import React, {useState} from "react";
import PersonIcon from "@mui/icons-material/Person";
import PinDropIcon from '@mui/icons-material/PinDrop';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import Checkbox from '@mui/material/Checkbox';
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

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
                            <PushPinIcon color="error" onClick={() => {
                                setPin(e => !e)
                                armazenarPin()
                            }} sx={{fontSize: 20}}/>
                            : <PushPinOutlinedIcon sx={{fontSize: 20}} onClick={() => {
                                setPin(e => !e)
                                armazenarPin()
                            }}/>}
                    </div>
                </div>

                <div className="row border-bottom pb-2 mb-2">
                    <div className="col-1 text-dark">
                        <PersonIcon sx={{fontSize: 22}}/>
                    </div>
                    <div className="col-9 text-dark text-truncate">
                        <b>{dados.cliente.nome.toUpperCase()}</b>
                    </div>
                </div>

                {dados.cliente.classificacao && <><small>Classificação: </small>{dados.cliente.classificacao}</>}

                <div className="row border-bottom mb-2">
                    {/*VENDEDOR*/}
                    {dados.consultor &&
                        <div className="row">
                            <div className="col-1 mb-2">
                                <NoteAltOutlinedIcon sx={{fontSize: 22}}/>
                            </div>
                            <div className="col-10 text-dark text-truncate">
                                {dados.consultor}
                            </div>
                        </div>
                    }

                    {/*SDR*/}
                    {dados.sdr_nome &&
                        <div className="row">
                            <div className="col-1 mb-2">
                                <HeadsetMicIcon sx={{fontSize: 20}}/>
                            </div>
                            <div className="col-10 text-dark text-truncate">
                                {dados.sdr_nome}
                            </div>
                        </div>
                    }
                </div>

                {/*TELEFONE*/}
                {dados.cliente.cidade &&
                    <div className="row">
                        <div className="col-1 mb-2">
                            <PhoneIcon sx={{fontSize: 18}}/>
                        </div>
                        <div className="col-10 text-dark text-truncate">
                            {dados.contato.telefone}
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
                            {dados.contato.email}
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
                            {dados.cliente.cidade} / {dados.cliente.estado}
                        </div>
                    </div>
                }

                {dados?.infos?.pedido_dias && <div className="row mt-3">
                    <div className={dados?.infos?.pedido_dias < 15
                        ? ''
                        : (dados?.infos?.pedido_dias > 30 ? "alert bg-danger text-white" : "alert bg-info text-white")}>
                        <small>Último Pedido: {dados.infos.pedido_dias} dias atrás</small>
                    </div>
                </div>}

                {/*BOTAO*/}
                {btn && <div className="row justify-content-end mt-3">
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
