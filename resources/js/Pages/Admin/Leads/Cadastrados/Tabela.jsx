import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { Badge, Divider, Stack, TextField, Typography } from '@mui/material';
import CardContainer from '@/Components/Cards/CardContainer';
import Chip from '@mui/material/Chip';
import { Eye, People } from 'react-bootstrap-icons';
import CardTable from '@/Components/Cards/CardTable';
import MenuItem from '@mui/material/MenuItem';
import LeadShow from '@/Pages/Geral/Leads/Dialogs/LeadShow.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import CampoTexto from '@/Components/CampoTexto.jsx';
import { TbBrandWhatsapp, TbFileStack, TbHash, TbHeadset, TbMapPin, TbPhone, TbUser, TbUserEdit } from 'react-icons/tb';
import SetorIcone from '@/Components/Icons/SetorIcone.jsx';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';

export default function Tabela({
                                   leads, setPaginate, paginate, paginateDados, setOrdenar, setFiltroFiltroOrdenarBy,carregando,
                                   leadsChecked, setLeadsChecked, checkedPage, adicionarLeadsCheck, setFiltroQtdPagina, filtroQtdPagina,
                               }) {

    const linhas = leads.map(function(items) {
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
                <CardTable title="Leads" icon={<People size="23" />} paginate={paginate} paginateDados={paginateDados} setPaginate={setPaginate} />

                <div className="row justify-content-between px-4 pb-2">
                    <div className="col" style={{ width: 0 }}>
                        <Checkbox
                            edge="start"
                            checked={checkedPage || false}
                            onChange={e => adicionarLeadsCheck(e.target.checked)} />
                        Leads: {leadsChecked.length} selecionados
                    </div>

                    <div className="col-auto">
                        <Stack direction="row" spacing={2}>
                            <TextField label={<small>Ordenar</small>} select size="small" sx={{ width: 150 }}
                                       onChange={e => setOrdenar(e.target.value)}>
                                <MenuItem value="">Padrão</MenuItem>
                                <MenuItem value="id">ID</MenuItem>
                                <MenuItem value="nome">Nome/Nome Fantasia</MenuItem>
                                <MenuItem value="razao_social">Nome/Razão Social</MenuItem>
                            </TextField>
                            <TextField select label={<small> </small>} size="small" defaultValue="" sx={{ width: 100 }}
                                       onChange={e => setFiltroFiltroOrdenarBy(e.target.value)}>
                                <MenuItem value="">Padrão</MenuItem>
                                <MenuItem value="asc">Ordem Crescente</MenuItem>
                                <MenuItem value="desc">Ordem Decrescente</MenuItem>
                            </TextField>
                            <TextField label={<small>Qtd. por Página</small>} size="small" defaultValue={filtroQtdPagina} sx={{ width: 100 }}
                                       onChange={e => setFiltroQtdPagina(e.target.value)}>
                            </TextField>
                        </Stack>
                    </div>
                </div>
            </CardContainer>

            {carregando && <LinearProgress />}

            {!carregando && linhas.map(lead => (
                <CardContainer key={lead.id}>
                    <CardBody>
                        <div className="row">
                            <div className="text-center" style={{ width: 70 }}>
                                <Checkbox
                                    edge="start" tabIndex={-1}
                                    checked={leadsChecked.indexOf(lead.id) !== -1}
                                    onChange={() => handleToggle(lead.id)}
                                />
                            </div>
                            <div className="col">
                                {lead.razao_social && <CampoTexto titulo="Razão Social" icone={TbUser} texto={lead.razao_social} />}
                                {lead.nome && <CampoTexto titulo="Nome/Nome Fantasia" icone={TbUser} texto={lead.nome} />}
                                <Stack direction="row" spacing={3}>
                                    <CampoTexto titulo="ID" icone={TbHash} texto={`#${lead.id}`} />
                                    <CampoTexto titulo="Setor" icone={SetorIcone} texto={lead.setor} />
                                </Stack>
                                <CampoTexto titulo="CNPJ" icone={TbFileStack} texto={lead.cnpj} />
                                <CampoTexto titulo="Localidade" icone={TbMapPin} texto={lead.cidade_estado} />
                            </div>
                            <div className="col-2">
                                <Chip
                                    className="mb-3 mt-2"
                                    label={lead.status_nome.nome}
                                    variant="outlined" sx={{ borderColor: lead.status_nome.cor, color: lead.status_nome.cor }}
                                    size="small" />
                                <Typography variant="body2">Status: {lead.status_data}</Typography>
                                <Typography variant="body2">Cadastro: {lead.data_criacao}</Typography>
                            </div>
                            <div className="col-2">
                                <CampoTexto titulo="Contatos" icone={TbHeadset} />
                                <Stack spacing={1}>
                                    {lead?.telefones?.map(telefone => (
                                        <Stack spacing={1} direction="row" alignItems="center">
                                            <TbBrandWhatsapp size={15} color={telefone.status_whatsapp === 0 ? 'gray' : 'green'} />
                                            <Typography variant="body2">{telefone.telefone}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </div>
                            <div className="col-auto">
                                <LeadShow leadId={lead.id} iconButton={<Eye size={20} color="black" />} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-auto" style={{ width: 70 }} />
                            <div className="col">
                                <Divider sx={{ marginBlock: 2 }} />
                                <CampoTexto
                                    titulo="Consultor(a)"
                                    icone={TbUserEdit}
                                    texto={lead.consultor && <Stack direction="row" spacing={1}>
                                        <Avatar src={lead.consultor_avatar} sx={{ width: 30, height: 30 }} />
                                        <Typography>{lead.consultor}</Typography>
                                    </Stack>}
                                />
                            </div>
                        </div>
                        {(lead.classificacao || lead.pedido_emitido || lead.enriquecido) && (
                            <div className="row mb-2">
                                <div className="col-auto" style={{ width: 70 }} />
                                <div className="col">
                                    <Divider sx={{ marginBlock: 2 }} />
                                    <Stack direction="row" spacing={2}>
                                        {lead.classificacao && <Typography>{lead.classificacao}</Typography>}
                                        {lead.pedido_emitido && <Chip label={`Pedido Emitido em ${lead.pedido_data} há ${lead.pedido_periodo} dias`} size="small" />}
                                        {lead.enriquecido && <Chip label="Enriquecido" size="small" />}
                                    </Stack>
                                </div>
                            </div>
                        )}
                    </CardBody>
                </CardContainer>
            ))}
        </>
    );
}
