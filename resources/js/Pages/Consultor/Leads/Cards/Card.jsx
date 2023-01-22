import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import PinDropIcon from '@mui/icons-material/PinDrop';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CardLeads({dados, btnUrl}) {
    return (
        <div className="card m-2 mb-3" style={{width: 300}}>
            <div className="card-body pb-0">
                <div className="row border-bottom pb-2 mb-2">
                    <div className="col-1 text-dark">
                        <PersonIcon sx={{fontSize: 22}}/>
                    </div>
                    <div className="col-10 text-dark text-truncate">
                        <b>{dados.cliente.nome.toUpperCase()}</b>
                    </div>
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
                {dados.cliente.cidade &&
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

                {/*BOTAO*/}
                {btnUrl && <div className="row justify-content-end mt-3">
                    <div className="col-auto">
                        <a href={btnUrl}
                           className="btn btn-primary btn-sm">
                            ABRIR
                            <ArrowForwardIcon/>
                        </a>
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
