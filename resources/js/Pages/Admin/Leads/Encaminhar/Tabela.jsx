import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import {Grid, TextField} from '@mui/material';
import CardContainer from '@/Components/Cards/CardContainer';
import {People} from 'react-bootstrap-icons';
import CardTable from '@/Components/Cards/CardTable';
import MenuItem from '@mui/material/MenuItem';
import LinearProgress from '@mui/material/LinearProgress';
import CardLeadGerenciar from "@/Pages/Admin/Leads/Encaminhar/CardLeadGerenciar.jsx";

export default function Tabela({
                                   leads, setPaginate, paginate, paginateDados, setOrdenar, setFiltroFiltroOrdenarBy, carregando,
                                   leadsChecked, setLeadsChecked, checkedPage, adicionarLeadsCheck, setFiltroQtdPagina, filtroQtdPagina,
                               }) {

    const linhas = leads.map(function (items) {
        return {
            id: items.id,
            nome: items.cliente.nome,
            sdr: items.sdr.nome,
            cnpj: items.cliente.cnpj,
            razao_social: items.cliente.razao_social,
            status: items.infos.status,
            status_nome: items.infos.status_nome,
            status_data: items.infos.status_data,
            consultor: items.consultor.nome,
            consultor_avatar: items.consultor.avatar,
            data_criacao: items.infos.data_criacao,
            telefone: items.contato.telefone,
            setor: items.infos.setor,
            pedido_emitido: items.infos.pedido_emitido > 0,
            data_encaminhado: items.infos.encaminhado_data,
            cidade_estado: `${items?.cliente?.cidadeEstado?.cidade ?? '-'}/${items?.cliente?.cidadeEstado?.estado ?? '-'}`,
            telefones: items.cliente.telefones,
            enriquecido: items.enriquecido.qtd > 0,
            classificacao: items.cliente.classificacao,
            pedido_periodo: items.infos.pedido_periodo,

            status_periodo: items.infos.status_periodo,
            pedido_data: items.infos.pedido_data,
        };
    });

    function handleToggle(value) {
        const currentIndex = leadsChecked.indexOf(value);
        const newChecked = [...leadsChecked];

        if (currentIndex === -1) newChecked.push(value);
        else newChecked.splice(currentIndex, 1);

        setLeadsChecked(newChecked);
    }

    return (
        <>
            <CardContainer>
                <CardTable title="Leads" icon={<People size="23"/>} paginate={paginate} paginateDados={paginateDados} setPaginate={setPaginate}/>

                <Grid container justifyContent="space-between">
                    <Grid xs={12} md={3} textAlign="center">
                        <Checkbox
                            edge="start"
                            checked={checkedPage || false}
                            onChange={e => adicionarLeadsCheck(e.target.checked)}/>
                        Leads: {leadsChecked.length} selecionados
                    </Grid>
                    <Grid xs={12} md={5}>
                        <Grid container justifyContent="end">
                            <Grid xs={12} md={3}>
                                <TextField label={<small>Ordenar</small>} select size="small" fullWidth
                                           onChange={e => setOrdenar(e.target.value)}>
                                    <MenuItem value="">Padrão</MenuItem>
                                    <MenuItem value="id">ID</MenuItem>
                                    <MenuItem value="nome">Nome/Nome Fantasia</MenuItem>
                                    <MenuItem value="razao_social">Nome/Razão Social</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid xs={12} md={3}>
                                <TextField select label={<small> </small>} size="small" defaultValue="" sx={{width: 100}}
                                           onChange={e => setFiltroFiltroOrdenarBy(e.target.value)}>
                                    <MenuItem value="">Padrão</MenuItem>
                                    <MenuItem value="asc">Ordem Crescente</MenuItem>
                                    <MenuItem value="desc">Ordem Decrescente</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid xs={12} md={3}>
                                <TextField label={<small>Qtd. por Página</small>} size="small" defaultValue={filtroQtdPagina} sx={{width: 100}}
                                           onChange={e => setFiltroQtdPagina(e.target.value)}>
                                </TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContainer>

            {carregando && <LinearProgress/>}

            {!carregando && linhas.map(lead => (
                <CardLeadGerenciar lead={lead} leadsChecked={leadsChecked} handleToggle={handleToggle}/>
            ))}
        </>
    )
}
