import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import Money from '@mui/icons-material/AttachMoneyRounded';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import TruckIcon from '@mui/icons-material/LocalShippingOutlined';
import HandymanIcon from '@mui/icons-material/Handyman';

import EmailIcon from './IconsCard/EmailIconPopover';
import TelefoneIcon from './IconsCard/TelefoneIcon';

import PushPinIcon from '@mui/icons-material/PushPin';
import PinIcon from "./IconsCard/PinIcon";
import PaymentIcon from "@mui/icons-material/Payment";

export default function CardPedidos({dados, menuMore, btnAvancaStatus, alerts, border}) {

    return (
        <div className="pesquisar-card shadow bg-white m-2 py-2 px-3 rounded"
             style={{width: 300, borderLeft: '3px solid ' + border}}>

            {/* Nome e MenuMore */}
            <div className='row'>
                <div className='col-10'>
                    <div className="row">
                        <div className="col-1 px-1 mx-1 mr-2">
                            <PersonIcon sx={{fontSize: 22}}/>
                        </div>
                        <div className="col-10 p-0 pt-1 text-truncate">
                            <b>{dados.cliente.toUpperCase()}</b>
                        </div>
                    </div>
                </div>
                <div className='col-2 text-right'>
                    {menuMore}
                </div>
            </div>

            {/* Body */}
            <div className='row justify-content-between'>
                <div className='col'>
                    {/*Preco*/}
                    <div className="row">
                        <div className="col-1 px-1 mx-1 mr-2"><Money sx={{fontSize: 22}}/></div>
                        <div className="col-10 p-0 pt-1 text-truncate">R$ {dados.preco}</div>
                    </div>
                    {/*Forma Pagamento*/}
                    <div className="row">
                        <div className="col-1 px-1 mx-1 mr-2"><PaymentIcon className='mr-2' sx={{fontSize: 20}}/></div>
                        <div className="col-10 p-0 ps-2 pt-1 text-truncate">{dados.forma_pagamento.toUpperCase()}</div>
                    </div>
                    {/*Fornecedor*/}
                    {dados.fornecedor && <div className="row">
                        <div className="col-1 px-1 mx-1 mr-2"><TruckIcon className='mr-2' sx={{fontSize: 20}}/></div>
                        <div className="col-10 p-0 pt-1 text-truncate">{dados.fornecedor}</div>
                    </div>}
                </div>
                {/* Btn Avanca Status */}
                <div className='col-auto pt-4 text-right'>
                    {btnAvancaStatus}
                </div>
            </div>

            {/*Icons Buttons*/}
            <div className="row pt-2">
                <div className="col">
                    {/*<PinIcon dados={dados} />*/}
                    <TelefoneIcon dados={dados}/>
                    <EmailIcon dados={dados}/>
                </div>
                <div className="col text-right">
                    <span className="text-sm text-muted">ID: #{dados.id}</span>
                </div>
            </div>

            {/* Pills */}
            <Stack className='py-2' direction="row" spacing={1}>
                {dados.infos.sac ?
                    <a href={route('consultor.chamados.index')}>
                        <Chip style={{cursor: 'pointer'}} icon={<SpeakerNotesIcon className='ml-2'/>} label="SAC"
                              color="warning" size="small"/>
                    </a>
                    : ''}
            </Stack>

            <div className='row'>
                {/* Alerts */}
                {alerts}
            </div>

            {/* Datas */}
            <div className='row border-top justify-content-between'>
                <div className='col-auto'>
                    <CalendarMonthIcon sx={{fontSize: 16}} className='mr-1'></CalendarMonthIcon>
                    <span style={{fontSize: 11}}>
                    {dados.prazos.data_status}
                    </span>
                </div>
                <div className='col-auto'>
                    <AlarmOutlinedIcon sx={{fontSize: 16}} className='mr-1'></AlarmOutlinedIcon>
                    <span style={{fontSize: 11}}>
                        {dados.prazos.data_prazo}
                    </span>
                </div>
            </div>
        </div>
    )
}
