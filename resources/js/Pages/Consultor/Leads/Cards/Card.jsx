import React, {useState} from "react";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';

export default function CardLeads({dados, btn}) {
    const [pin, setPin] = useState(dados.pin)

    function armazenarPin() {
        axios.post(route('geral.pins.leads'), {lead_id: dados.id})
    }

    return (
        <div className="pesquisar-card card m-3" style={{width: 300}}>
            <div className="card-body pb-0">
                <div className="row border-bottom g-0 pb-2 mb-2 justify-content-between">
                    <div className="col-1 text-dark">
                        <PersonIcon sx={{fontSize: 22}}/>
                    </div>
                    <div className="col-9 text-dark text-truncate m-0">
                        <b>{dados.cliente.nome.toUpperCase()}</b>
                    </div>
                    <div className="col-auto p-0 m-0 cursor-pointer">
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
                {dados.cliente.classificacao && <><small>Classificação: </small>{dados.cliente.classificacao}</>}

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

                {/*CNPJ*/}
                {dados.cliente.cnpj &&
                    <div className="row">
                        <div className="col-1 mb-2">
                            <ArticleOutlinedIcon sx={{fontSize: 18}}/>
                        </div>
                        <div className="col-10 text-dark text-truncate">
                            {dados.cliente.cnpj}
                        </div>
                    </div>
                }

                {/*TELEFONE*/}
                {dados.contato.telefone &&
                    <div className="row">
                        <div className="col-1 mb-2">
                            <LocalPhoneOutlinedIcon sx={{fontSize: 18}}/>
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
                            <FmdGoodOutlinedIcon sx={{fontSize: 18}}/>
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
                {dados?.infos?.pedido_dias === 0 && <div className="row mt-3"><small>Último Pedido: Hoje</small></div>}


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
