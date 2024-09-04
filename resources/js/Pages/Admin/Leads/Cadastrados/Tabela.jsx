import React, {useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import {Badge, Box, Stack, TextField, Typography} from "@mui/material";
import CardContainer from "@/Components/Cards/CardContainer";
import Chip from "@mui/material/Chip";
import {Eye, People, Trash} from "react-bootstrap-icons";
import CardTable from "@/Components/Cards/CardTable";
import MenuItem from "@mui/material/MenuItem";
import {router} from "@inertiajs/react";

export default function Tabela({
                                   leads, setPaginate, paginate, paginateDados, setOrdenar, setFiltroFiltroOrdenarBy,
                                   leadsChecked, setLeadsChecked, checkedPage, adicionarLeadsCheck, setFiltroQtdPagina, filtroQtdPagina
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
            setor: items.infos.setor,
            classificacao: items.cliente.classificacao,
            status_periodo: items.infos.status_periodo,
            pedido_data: items.infos.pedido_data,
            pedido_periodo: items.infos.pedido_periodo,
            telefones: items.cliente.telefones,
            enriquecido: items.enriquecido.qtd,
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
            <CardTable title="Leads" icon={<People size="23"/>} paginate={paginate} paginateDados={paginateDados} setPaginate={setPaginate}>
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
                                <TextField label={<small>Qtd. por Página</small>} size="small" defaultValue={filtroQtdPagina} variant="standard" sx={{width: 80}}
                                           onChange={e => setFiltroQtdPagina(e.target.value)}>
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
                                    edge="start" tabIndex={-1}
                                    checked={leadsChecked.indexOf(item.id) !== -1}
                                    onChange={() => handleToggle(item.id)}
                                />
                            </td>
                            <td style={{width: '40%'}}>
                                <Typography variant="body1" className="cursor-pointer" fontWeight="bold"
                                            onClick={() => router.get(route('admin.clientes.leads.leads-main.show', item.id))}>{item.nome}</Typography>
                                {(item.nome !== item.razao_social) && <Typography variant="body2">{item.razao_social}</Typography>}
                                <Stack direction="row" spacing={2} marginBottom={1}>
                                    <Typography variant="body2">#{item.id}</Typography>
                                    <Typography variant="body2">{item.classificacao}</Typography>
                                    <Typography variant="body2"><b>Cadastrado:</b> {item.data_criacao}</Typography>
                                    <Typography variant="body2"><b>Setor:</b> {item.setor}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={3}>
                                    <Typography variant="body2"><b>CNPJ:</b> {item.cnpj}</Typography>
                                </Stack>
                                <Typography variant="body2">
                                    <b>Tel.:</b> {item.telefones.map((tel, index) =>
                                    <Chip label={tel.telefone} variant="outlined" size="small" className="me-2 mb-1"/>)}
                                </Typography>
                                <Typography variant="body2"><b>Localidade:</b> {item.cidade}/{item.estado}</Typography>
                            </td>
                            <td className="align-top">
                                <Typography variant="body2"><b>SDR:</b> {item.sdr}</Typography>
                                <Typography variant="body2" className="mb-2"><b>Consultor(a):</b> {item.consultor}</Typography>
                                <Stack direction="row" spacing={2}>
                                    {!!item.data_encaminhado ? <Chip label="Já Atendido" size="small"/> : <Chip label="Novo" size="small"/>}
                                    {!!item.pedido_emitido && <Chip label="Ativado" size="small"/>}
                                    {!!item.enriquecido && <Chip label="Enriquecido" size="small"/>}
                                </Stack>
                            </td>
                            <td style={{width: '15%'}}>
                                <Chip className="mb-3" label={item.status_nome.nome} sx={{bgcolor: item.status_nome.cor, color: '#fff'}} size="small"/>
                                {!!item.status_data && <Typography variant="body2">Status: {item.status_data} há {item.status_periodo} dias</Typography>}
                                {!!item.data_encaminhado && <Typography variant="body2">Encaminhado: {item.data_encaminhado}</Typography>}
                                {!!item.pedido_data && <Typography variant="body2">Último Pedido: {item.pedido_data} há {item.pedido_periodo}</Typography>}
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
