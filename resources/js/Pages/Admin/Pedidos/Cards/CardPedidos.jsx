import React, {useState} from 'react';
import Stack from '@mui/material/Stack';
import {usePage} from "@inertiajs/react";

import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import TruckIcon from '@mui/icons-material/LocalShippingOutlined';
import {Alarm, BoxSeam, CalendarEvent, Coin, Pen, PersonFill, PinAngle, PinAngleFill, Shop, Wallet2} from "react-bootstrap-icons";
import {Typography} from "@mui/material";
import convertFloatToMoney from "@/Helpers/converterDataHorario";

export default function CardPedidos({dados, menuMore, btnAvancaStatus, alerts, border}) {

    const goCard = usePage().props.goCard
    const [pin, setPin] = useState(dados.pin)

    function armazenarPin() {
        axios.post(route('geral.pins.pedidos'), {pedido_id: dados.id})
    }

    return (
        <div className="pesquisar-card shadow-sm bg-white m-2 py-2 px-3 rounded mb-4" id={`card-id-${dados.id}`}
             style={{
                 width: 300,
                 border: (goCard === dados.id.toString()) ? ('2px solid ' + border) : '',
                 borderLeft: '2px solid ' + border
             }}
        >
            <div className="row">
                <table>
                    <tbody>
                    <tr>
                        <td className="col-1 px-2"><PersonFill size="18"/></td>
                        <td><Typography><b>{(dados.cliente ?? dados.integrador)?.toUpperCase()}</b></Typography></td>
                        <td className="col-1 px-0">{menuMore}</td>
                    </tr>
                    <tr>
                        <td className="col-1 px-2"><Pen size="15"/></td>
                        <td><Typography>{dados.consultor.toUpperCase()}</Typography></td>
                    </tr>
                    <tr>
                        <td className="col-1 px-2"><Coin size="15" sx={{fontSize: 22}}/></td>
                        <td><Typography>R$ {convertFloatToMoney(dados.preco)}</Typography></td>
                        <td className="col-1 px-2 cursor-pointer">
                            {pin ?
                                <PinAngleFill color="red" onClick={() => {
                                    setPin(e => !e)
                                    armazenarPin()
                                }} sx={{fontSize: 20}}/>
                                : <PinAngle sx={{fontSize: 20}} onClick={() => {
                                    setPin(e => !e)
                                    armazenarPin()
                                }}/>
                            }
                        </td>
                    </tr>
                    <tr>
                        <td className="col-1 px-2"><Wallet2 size="15" sx={{fontSize: 20}}/></td>
                        <td><Typography>{dados.forma_pagamento.toUpperCase()}</Typography></td>
                    </tr>
                    {dados.fornecedor && <tr>
                        <td className="col-1 px-2"><TruckIcon sx={{fontSize: 20}}/></td>
                        <td><Typography>{dados.fornecedor}</Typography></td>
                    </tr>}
                    {dados.integrador && <tr>
                        <td className="col-1 px-2"><Shop size="15" sx={{fontSize: 20}}/></td>
                        <td><Typography>{dados.integrador.toUpperCase()}</Typography></td>
                    </tr>}
                    {dados.prazos.rastreio_data && <tr>
                        <td className="col-1 px-2"><BoxSeam size="15" sx={{fontSize: 20}}/></td>
                        <td><Typography>{dados.prazos.rastreio_data}</Typography></td>
                    </tr>}
                    </tbody>
                </table>
            </div>

            {/* Body */}
            <div className='row justify-content-between mb-3'>
                <div className='col-9 pt-2'>
                    <span className="badge p-1 px-2" style={{backgroundColor: dados.setor_cor}}><small>{dados.setor_nome}</small></span>
                </div>
                {/* Btn Avanca Status */}
                <div className='col-3 text-right'>
                    {btnAvancaStatus}
                </div>
            </div>

            {/*Icons Buttons*/}
            <div className="row mb-2 justify-content-between">
                <div className="col-auto cursor-pointer">
                </div>
                <div className="col-auto text-right">
                    <Typography variant="body2">ID: #{dados.id}</Typography>
                </div>
            </div>

            {/* Pills */}
            <Stack direction="row" spacing={1}>
                {dados.infos.sac ? <a href={route('admin.chamado.pedido.show', dados.id)}>
                    <span className="badge rounded-pill bg-warning mb-2">
                        <SpeakerNotesIcon className="ml-2"/> SAC
                    </span>
                </a> : ''}
            </Stack>

            <div className='row'>
                {/* Alerts */}
                {alerts}
            </div>

            {/* Datas */}
            <div className='row border-top justify-content-between'>
                <div className='col-auto'>
                    <CalendarEvent size="12"></CalendarEvent>
                    <span className="ps-1" style={{fontSize: 11}}>
                    {dados.prazos.data_status}
                    </span>
                </div>
                <div className='col-auto'>
                    <Alarm size="12" />
                    <span className="ps-1" style={{fontSize: 11}}>
                    {dados.prazos.data_prazo}
                    </span>
                </div>
            </div>
        </div>)
}
