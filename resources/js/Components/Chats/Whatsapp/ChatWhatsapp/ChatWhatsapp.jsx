import React, { useEffect, useState, useCallback, useContext, useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import { CircularProgress } from '@mui/material';
import { WhatsappButton } from './WhatsappButton';
// import { fetchCadastrarContatoNoWhatsapp } from './fetchUtils';
import axios from 'axios';
import AlertError from '@/Components/Alerts/AlertError.jsx';
import { useWhatsapp } from '@/Hooks/useWhatsapp.jsx';
import { useFunilVendas } from '@/Pages/Admin/Leads/Kanban/FunilVendasContext.jsx';
import ButtonWhatsapp from '@/Components/Chats/Whatsapp/ChatWhatsapp/ButtonWhatsapp.jsx';

const ChatWhatsapp = ({ telefones }) => {
    return <ButtonWhatsapp telefones={telefones} />;
};

export default ChatWhatsapp;
