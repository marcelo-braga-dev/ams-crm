import React, {useState} from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Money from '@mui/icons-material/AttachMoneyRounded';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import TruckIcon from '@mui/icons-material/LocalShippingOutlined';
import HandymanIcon from '@mui/icons-material/Handyman';

// import EmailIcon from './IconsCard/EmailIconPopover';
// import TelefoneIcon from './IconsCard/TelefoneIcon';

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';

import PaymentIcon from "@mui/icons-material/Payment";
import {usePage} from "@inertiajs/react";

export default function CardPedidos({dados, menuMore, btnAvancaStatus, alerts, border}) {
    const goCard = usePage().props.goCard

    const [pin, setPin] = useState(dados.pin)

    function armazenarPin() {
        axios.post(route('geral.pins.pedidos'), {pedido_id: dados.id})
    }

    return (
        <div className="pesquisar-card shadow bg-white m-2 py-2 px-3 rounded" id={"card-id-" + dados.id}
             style={{
                 width: 300,
                 border: (goCard === dados.id.toString()) ? ('3px solid ' + border) : '',
                 borderLeft: '3px solid ' + border
             }}>

            {/* Body */}
            <div className='row justify-content-between'>
                <table>
                    <tbody>
                    <tr>
                        <td className="col-1 px-2"><PersonIcon sx={{fontSize: 22}}/></td>
                        <td><b>{dados.cliente.toUpperCase()}</b></td>
                        <td className="col-1 px-0">{menuMore}</td>
                    </tr>
                    <tr>
                        <td className="col-1 px-2"><Money sx={{fontSize: 22}}/></td>
                        <td>R$ {dados.preco}</td>
                    </tr>
                    <tr>
                        <td className="col-1 px-2"><PaymentIcon className='mr-2' sx={{fontSize: 20}}/></td>
                        <td>{dados.forma_pagamento.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td className="col-1 px-2"><TruckIcon className='mr-2' sx={{fontSize: 20}}/></td>
                        <td>{dados.fornecedor}</td>
                    </tr>
                    <tr>
                        <td className="col-1 px-2"><HandymanIcon className='mr-2' sx={{fontSize: 20}}/></td>
                        <td>{dados.integrador.toUpperCase()}</td>
                    </tr>
                    <tr>
                        <td className="col-1 px-2"></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="col-1 px-2"></td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
                <div className='col'></div>
                <div className='col-auto pt-1 text-right'>
                    {btnAvancaStatus}
                </div>
            </div>

            {/*Icons Buttons*/}
            <div className="row pt-2 justify-content-between">
                <div className="col-auto cursor-pointer">
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
                <div className="col-auto text-right">
                    <span>ID: #{dados.id}</span>
                </div>
            </div>

            {/* Pills */}
            <Stack className='py-2' direction="row" spacing={1}>
                {!!dados.infos.sac &&
                    <a href={route('consultor.chamados.index')}>
                        <Chip style={{cursor: 'pointer'}} icon={<SpeakerNotesIcon className='ml-2'/>} label="SAC"
                              color="warning" size="small"/>
                    </a>}
            </Stack>

            <div className='row'>
                {/* Alerts */}
                {alerts}
            </div>

            {/* Datas */}
            <div className='row border-top justify-content-between'>
                <div className='col-auto'>
                    <CalendarMonthIcon sx={{fontSize: 15}} className='mr-1'></CalendarMonthIcon>
                    <span style={{fontSize: 12}}>{dados.prazos.data_status}</span>
                </div>
                <div className='col-auto'>
                    <AlarmOutlinedIcon sx={{fontSize: 15}} className='mr-1'></AlarmOutlinedIcon>
                    <span style={{fontSize: 12}}>{dados.prazos.data_prazo}</span>
                </div>
            </div>
        </div>
    )
}
