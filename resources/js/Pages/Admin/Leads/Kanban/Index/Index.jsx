import Layout from '@/Layouts/Layout.jsx';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Stack, Typography } from '@mui/material';
import CardKanbanLeads from './Card.jsx';
import ScrollContainer from 'react-indiana-drag-scroll';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import { debounce } from 'lodash';
import { Box, Pencil, PersonFill, Ticket } from 'react-bootstrap-icons';
import InputAdornment from '@mui/material/InputAdornment';

const Page = () => {

    const [leadsColunas, setLeadsColunas] = useState([]);
    const [setor, setSetor] = useState('');
    const [usuario, setUsuario] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [filtros, setFiltros] = useState();

    const fetchLeads = async () => {
        const response = await axios.get(route('auth.lead.get-leads-kanban'))
            .finally(() => setCarregando(false));

        setLeadsColunas(response.data.dados);


        const res = await axios.get(route('auth.leads.funil-vendas-kanban.index-registros'), {
            params: { setor, usuario },
        }).finally(() => setCarregando(false));
        setFiltros({ setores: res.data.setores, usuarios: res.data.usuarios });
    };

    useEffect(() => {
        fetchLeads();
    }, []);



    const cabecalho = useMemo(() => (
        leadsColunas.map((column, index) => (
            <th key={index} style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                <div className="row mx-1 justify-content-between"
                     style={{
                         backgroundColor: column.cor ?? 'black',
                         width: 350,
                         paddingBlock: 10,
                         paddingInline: 15,
                         borderTopLeftRadius: 15,
                         borderTopRightRadius: 15,
                     }}
                >
                    <div className="col-auto">
                        <Typography fontWeight="bold" color="white">{column.nome}</Typography>
                    </div>
                    <div className="col-auto">
                        {/*<Typography fontWeight="bold" color="white">Qdt: {item?.items?.length ?? 0}</Typography>*/}
                    </div>
                </div>
            </th>
        ))
    ), [leadsColunas]);

    const corpo = useMemo(() => (
        leadsColunas.map((column, index) => {
            return (
                <td key={index} style={{ padding: 10 }}>
                    {column.leads.map(lead => <CardKanbanLeads lead={lead} cor={column.cor} />)}
                </td>
            );
        })
    ), [leadsColunas]);

    return (
        <Layout titlePage="Funil de Vendas" menu="leads" submenu="leads-kanban">
            {filtros?.usuarios?.length > 1 && (
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <TextField
                            label="Representante"
                            select fullWidth value={usuario} onChange={(e) => setUsuario(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Pencil size={20} color="gray" />
                                    </InputAdornment>
                                ),
                            }}
                        >
                            <MenuItem value="">Todos</MenuItem>
                            {filtros?.usuarios?.map(({ id, nome, foto }) => (
                                <MenuItem key={id} value={id}>
                                    <Stack direction="row" spacing={1}>
                                        <Avatar src={foto} sx={{ width: 20, height: 20 }} />
                                        <Typography>{nome}</Typography>
                                    </Stack>
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div className="col-md-3 mb-4">
                        <TextField
                            label="Setor"
                            select
                            fullWidth
                            value={setor}
                            onChange={(e) => setSetor(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box size={20} color="gray" />
                                    </InputAdornment>
                                ),
                            }}
                        >
                            <MenuItem value="">Todos</MenuItem>
                            {filtros?.setores?.map(({ id, nome }) => (
                                <MenuItem key={id} value={id}>
                                    {nome}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                </div>
            )}

            {carregando && <LinearProgress />}

            {!carregando && (
                <ScrollContainer
                    vertical={true}
                    horizontal={true}
                    activationDistance={10}
                    hideScrollbars={false}
                    style={{
                        cursor: 'grab',
                        height: 'calc(100vh - 10rem)',
                    }}
                >
                    <div style={{ minWidth: '1000px' }}>
                        <table>
                            <thead style={{ position: 'sticky', top: 0, zIndex: 2 }}>
                            <tr>
                                {cabecalho}
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="align-top">
                                {corpo}
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </ScrollContainer>
            )}
        </Layout>
    );
};

export default Page;
