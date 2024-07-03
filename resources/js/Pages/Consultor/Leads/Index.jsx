import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import {InputAdornment, TextField} from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Layout from "@/Layouts/Layout";
import pesquisaCards from "@/Helpers/pesquisaCards";
import NovoCards from './Cards/NovoCard';
import PreAtendimentoCard from './Cards/PreAtendimentoCard';
import AbertoCards from './Cards/AbertoCards';
import AtendimentoCards from './Cards/AtendimentoCard';
import FinalizadoCard from "./Cards/FinalizadoCard";
import AtivoCard from "./Cards/AtivoCard";
import CardContainer from "@/Components/Cards/CardContainer";

const styleCard = 'p-2 mx-1 text-white row justify-content-between rounded-top';

const TableHeader = ({isSdr, leads}) => (
    <thead>
    <tr>
        {isSdr && <HeaderColumn color="blue" title="Iniciar Atendimento" count={leads.novo.length}/>}
        {isSdr && <HeaderColumn color="orange" title="Pré Atendimento" count={leads.pre_atendimento.length}/>}
        <HeaderColumn color="green" title="Em Aberto" count={leads.aberto.length}/>
        <HeaderColumn color="yellowgreen" title="Em Atendimento" count={leads.atendimento.length}/>
        <HeaderColumn color="brown" title="Ativo" count={leads.ativo.length}/>
        <HeaderColumn color="black" title="Finalizados" count={leads.finalizado.length}/>
    </tr>
    </thead>
);

const HeaderColumn = ({color, title, count}) => (
    <th className="sticky-top">
        <div className={styleCard} style={{backgroundColor: color}}>
            <div className="col-auto">{title}</div>
            <div className="col-auto">Qdt: {count}</div>
        </div>
    </th>
);

const TableBody = ({isSdr, leads}) => (
    <tbody>
    <tr className="align-top">
        {isSdr && <TableColumn leads={leads.novo} CardComponent={NovoCards}/>}
        {isSdr && <TableColumn leads={leads.pre_atendimento} CardComponent={PreAtendimentoCard}/>}
        <TableColumn leads={leads.aberto} CardComponent={AbertoCards}/>
        <TableColumn leads={leads.atendimento} CardComponent={AtendimentoCards}/>
        <TableColumn leads={leads.ativo} CardComponent={AtivoCard}/>
        <TableColumn leads={leads.finalizado} CardComponent={FinalizadoCard}/>
    </tr>
    </tbody>
);

const TableColumn = ({leads, CardComponent}) => (
    <td style={{minWidth: 300}}>
        {leads.map((dado) => (
            <CardComponent key={dado.id} dados={dado}/>
        ))}
    </td>
);

export default function Dashboard({isSdr}) {
    const [leads, setLeads] = useState(null);

    const fetchLeads = useCallback(async () => {
        try {
            const response = await axios.get(route('consultor.leads.get-leads'));
            setLeads(response.data);
        } catch (error) {
            console.error("Error fetching leads: ", error);
        }
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    return (
        <Layout titlePage="Lista de Clientes" menu="leads" submenu="leads-quadros">

            <div className="row justify-content-between mb-4">
                <div className="col-md-3">
                    <TextField
                        fullWidth
                        label="Pesquisar..."
                        onChange={(e) => pesquisaCards(e.target.value)}
                        InputProps={{endAdornment: <InputAdornment position="start"><SearchOutlinedIcon/></InputAdornment>}}
                    />
                </div>
            </div>

            {!leads ? <LinearProgress className="my-4"/> : (
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <div className="overflow-scroll bg-white" style={{height: '78vh'}}>
                            <table>
                                <TableHeader isSdr={isSdr} leads={leads}/>
                                <TableBody isSdr={isSdr} leads={leads}/>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}
