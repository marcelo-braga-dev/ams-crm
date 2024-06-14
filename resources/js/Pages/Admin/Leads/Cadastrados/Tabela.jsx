import React, {useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import {Box, Stack, TextField, Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import Chip from "@mui/material/Chip";
import {Eye, Trash} from "react-bootstrap-icons";
import CardTable from "@/Components/Cards/CardTable";
import MenuItem from "@mui/material/MenuItem";

export default function Tabela({
                                   leads, setPaginate, paginate, paginateDados, setOrdenar, setFiltroFiltroOrdenarBy,
                                   leadsChecked, setLeadsChecked, checkedPage, adicionarLeadsCheck
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
            data_criacao: items.infos.data_criacao,
            telefone: items.contato.telefone,
            cidade: items.cliente.cidade,
            estado: items.cliente.estado,
            pedido_emitido: items.infos.pedido_emitido,
            data_encaminhado: items.infos.encaminhado_data,
            setor: items.infos.setor
        }
    });

    function handleToggle(value) {
        const currentIndex = leadsChecked.indexOf(value);
        const newChecked = [...leadsChecked];

        if (currentIndex === -1) newChecked.push(value);
        else newChecked.splice(currentIndex, 1);

        setLeadsChecked(newChecked);
    }

    return (
        <CardContainer>
            <CardTable title="Leads" paginate={paginate} paginateDados={paginateDados} setPaginate={setPaginate}>
                <table className="table-1">
                    <thead>
                    <tr>
                        <th style={{width: 0}}>
                            <Checkbox edge="start" checked={checkedPage || false}
                                      onChange={e => adicionarLeadsCheck(e.target.checked)}/>
                        </th>
                        <th>
                            Leads: {leadsChecked.length} selecionados
                        </th>
                        <th></th>
                        <th className="align-content-end" colSpan={2}>
                            <Stack direction="row" spacing={2}>
                                <TextField label={<small>Ordenar</small>} select size="small" variant="standard" sx={{width: 150}}
                                           onChange={e => setOrdenar(e.target.value)}>
                                    <MenuItem value="">Padrão</MenuItem>
                                    <MenuItem value="id">ID</MenuItem>
                                    <MenuItem value="nome">Nome/Nome Fantasia</MenuItem>
                                    <MenuItem value="razao_social">Nome/Razão Social</MenuItem>
                                </TextField>
                                <TextField select label={<small> </small>} size="small" defaultValue="" variant="standard" sx={{width: 80}}
                                           onChange={e => setFiltroFiltroOrdenarBy(e.target.value)}>
                                    <MenuItem value="">Padrão</MenuItem>
                                    <MenuItem value="asc">ASC</MenuItem>
                                    <MenuItem value="desc">DESC</MenuItem>
                                </TextField>
                            </Stack>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {linhas.map(item => (
                        <tr key={item.id}>
                            <td className="align-top">
                                <Checkbox
                                    edge="start"
                                    checked={leadsChecked.indexOf(item.id) !== -1}
                                    tabIndex={-1}
                                    onChange={() => handleToggle(item.id)}
                                />
                            </td>
                            <td style={{width: '40%'}}>
                                <Typography variant="body1"><b>{item.nome}</b></Typography>
                                {(item.nome !== item.razao_social) && <Typography variant="body2">{item.razao_social}</Typography>}
                                <Stack direction="row" spacing={2} className="mb-2">
                                    <Typography variant="body2">#{item.id}</Typography>
                                    <Typography variant="body2">Cadastrado: {item.data_criacao}</Typography>
                                    <Typography variant="body2">Setor: {item.setor}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={3}>
                                    <Typography variant="body2">CNPJ: {item.cnpj}</Typography>
                                    <Typography variant="body2">Tel.: {item.telefone}</Typography>
                                </Stack>
                                <Typography variant="body2">Localidade: {item.cidade}/{item.estado}</Typography>
                            </td>
                            <td className="align-top">
                                <Typography variant="body2"><b>SDR:</b> {item.sdr}</Typography>
                                <Typography variant="body2" className="mb-2"><b>Consultor(a):</b> {item.consultor}</Typography>
                                <Stack direction="row" spacing={2}>
                                    {!!item.data_encaminhado ? <Chip label="Já Atendido" size="small"/> : <Chip label="Novo" size="small"/>}
                                    {!!item.pedido_emitido && <Chip label="Ativado" size="small"/>}
                                </Stack>
                            </td>
                            <td style={{width: '15%'}}>
                                <Chip className="mb-3" label={item.status_nome.nome} sx={{bgcolor: item.status_nome.cor, color: '#fff'}} size="small"/>
                                {!!item.status_data && <Typography variant="body2">Status: {item.status_data}</Typography>}
                                {!!item.data_encaminhado && <Typography variant="body2">Encaminhado: {item.data_encaminhado}</Typography>}
                            </td>
                            <td style={{width: '5%'}} className="text-center">
                                <a href={route('admin.clientes.leads.leads-main.show', item.id)}><Eye size={20}/></a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </CardTable>
        </CardContainer>
    )
}
