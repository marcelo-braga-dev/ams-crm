import React from 'react';
import Money from '@mui/icons-material/AttachMoneyRounded';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import TruckIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentIcon from '@mui/icons-material/Payment';

import EmailIcon from './Partials/IconsCard/EmailIconPopover';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import {Alert} from '@mui/material';
import TelefoneIcon from "./Partials/IconsCard/TelefoneIcon";
import HandymanIcon from "@mui/icons-material/Handyman";

export default function CardPedidos({dados, menuMore, btnAvancaStatus, border}) {

    return (
        <div className="pesquisar-card shadow bg-white m-2 py-2 px-3 rounded"
             style={{width: 300, borderLeft: '3px solid ' + border}}>

            {/* Nome e MenuMore */}
            <div className='row'>
                <div className='col-10'>
                    {/*Nome Cliente*/}
                    <div className="row">
                        <div className="col-1 px-1 mx-1 mr-2">
                            <PersonOutlineOutlinedIcon sx={{fontSize: 22}}/>
                        </div>
                        <div className="col-10 ps-2  p-0 pt-1 text-truncate">
                            <b>{dados.cliente.toUpperCase()}</b>
                        </div>
                    </div>
                    {/*Nome Consultor*/}
                    <div className="row">
                        <div className="col-1 px-1 mx-1 mr-2">
                            <NoteAltOutlinedIcon sx={{fontSize: 22}}/>
                        </div>
                        <div className="col-10 ps-2  p-0 pt-1 text-truncate">
                            {dados.consultor.toUpperCase()}
                        </div>
                    </div>
                </div>
                <div className='col-2 text-right align-items-start'>
                    {menuMore}
                </div>
            </div>

            {/* Body */}
            <div className='row justify-content-between'>
                <div className='col-9'>
                    {/*Preco*/}
                    <div className="row">
                        <div className="col-1 px-1 mx-1 mr-2"><Money sx={{fontSize: 22}}/></div>
                        <div className="col-10 p-0 ps-2 pt-1 text-truncate">R$ {dados.preco}</div>
                    </div>
                    {/*Forma Pagamento*/}
                    <div className="row">
                        <div className="col-1 px-1 mx-1 mr-2"><PaymentIcon className='mr-2' sx={{fontSize: 20}}/></div>
                        <div className="col-10 p-0 ps-2 pt-1 text-truncate">{dados.forma_pagamento.toUpperCase()}</div>
                    </div>
                    {/*Fornecedor*/}
                    <div className="row">
                        <div className="col-1 px-1 mx-1 mr-2"><TruckIcon className='mr-2' sx={{fontSize: 20}}/></div>
                        <div className="col-10 p-0 ps-2  pt-1 text-truncate">{dados.fornecedor}</div>
                    </div>
                    {/*Integrador*/}
                    <div className="row">
                        <div className="col-1 px-1 mx-1 mr-2"><HandymanIcon className='mr-2' sx={{fontSize: 20}}/></div>
                        <div className="col-10 p-0 ps-2 pt-1 text-truncate">{dados.integrador.toUpperCase()}</div>
                    </div>
                </div>
                {/* Btn Avanca Status */}
                <div className='col-3 pt-4 text-right'>
                    {btnAvancaStatus}
                </div>
            </div>

            {/*Icons Buttons*/}
            <div className="row justify-content-between pt-2">
                <div className="col-auto">
                    {/*<PinIcon dados={dados} />*/}
                    <TelefoneIcon dados={dados}/>
                    <EmailIcon dados={dados}/>
                </div>
                <div className="col-auto text-right">
                    <span className="text-sm text-muted">ID: #{dados.id}</span>
                </div>
            </div>

            {/* Pills */}
            <Stack className='py-2' direction="row" spacing={1}>
                {dados.infos.sac ? <a href={route('admin.chamados.pedido.show', dados.id)}>
                    <Chip icon={<SpeakerNotesIcon className="ml-2"/>} label="SAC" color="warning"
                          size="small"/></a> : ''}
            </Stack>

            {/* Alerts */}
            <div className='row'>
                {dados.infos.alerta && <Alert severity='warning' className='mb-2'>{dados.infos.alerta}</Alert>}
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
