import React from 'react';
import Money from '@mui/icons-material/AttachMoneyRounded';
import Stack from '@mui/material/Stack';
import SpeakerNotesIcon from '@mui/icons-material/SpeakerNotes';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import TruckIcon from '@mui/icons-material/LocalShippingOutlined';
import PaymentIcon from '@mui/icons-material/Payment';

import EmailIcon from './Partials/IconsCard/EmailIconPopover';
import NoteAltOutlinedIcon from '@mui/icons-material/NoteAltOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

import TelefoneIcon from "./Partials/IconsCard/TelefoneIcon";
import HandymanIcon from "@mui/icons-material/Handyman";
import PersonIcon from "@mui/icons-material/Person";

export default function CardPedidos({dados, menuMore, btnAvancaStatus, alerts, border}) {

    return (
        <div className="pesquisar-card shadow bg-white m-2 py-2 px-3 rounded" id={'card-id-' + dados.id}
             style={{width: 300, borderLeft: '3px solid ' + border}}>

            <div className='row'>
                <table>
                    <tbody>
                    <tr>
                        <td className="col-1 px-2"><PersonIcon sx={{fontSize: 22}}/></td>
                        <td><b>{dados.cliente.toUpperCase()}</b></td>
                        <td className="col-1 px-0">{menuMore}</td>
                    </tr>
                    <tr>
                        <td className="col-1 px-2"><NoteAltOutlinedIcon sx={{fontSize: 22}}/></td>
                        <td>{dados.consultor.toUpperCase()}</td>
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
                    </tbody>
                </table>
            </div>

            {/* Body */}
            <div className='row justify-content-between mb-3'>
                <div className='col-9 pt-2'>
                    <span className="badge" style={{backgroundColor: dados.setor.cor}}>{dados.setor.nome}</span>
                </div>
                {/* Btn Avanca Status */}
                <div className='col-3 text-right'>
                    {btnAvancaStatus}
                </div>
            </div>
            {/*Icons Buttons*/}
            <div className="row justify-content-between mb-2">
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
            <Stack direction="row" spacing={1}>
                {dados.infos.sac ? <a href={route('admin.chamados.pedido.show', dados.id)}>
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
        </div>)
}
