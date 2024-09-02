import Layout from "@/Layouts/Layout.jsx";
import React, {useEffect, useState, useMemo, useCallback} from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {Typography} from "@mui/material";
import CardKanbanLeads from "@/Pages/Admin/Leads/Kanban/Components/CardKanbanLeads.jsx";
import ScrollContainer from "react-indiana-drag-scroll";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import {debounce} from 'lodash';
import {Pencil, PersonFill, Ticket} from "react-bootstrap-icons";
import InputAdornment from "@mui/material/InputAdornment";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";

const Page = () => {
    const [setor, setSetor] = useState("");
    const [usuario, setUsuario] = useState("");

    const [registros, setRegistros] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [setores, setSetores] = useState([]);
    const [colunas, setColunas] = useState([]);

    const [carregando, setCarregando] = useState(false);

    // Função para buscar os dados e aplicar filtros com debouncing para melhorar a performance
    const fetchData = useCallback(
        debounce(async (setor, usuario) => {
            setCarregando(true);
            try {
                const response = await axios.get(route('auth.leads.funil-vendas-kanban.index-registros'), {
                    params: {setor, usuario},
                });
                setRegistros(response.data.registros);
                setUsuarios(response.data.usuarios);
                setSetores(response.data.setores);
                setColunas(response.data.colunas);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setCarregando(false);
            }
        }, 300), []); // Debounce para evitar chamadas excessivas

    // useEffect para buscar os dados iniciais e aplicar filtros quando setor ou usuario mudarem
    useEffect(() => {
        fetchData(setor, usuario);
    }, [setor, usuario, fetchData]);

    const atualizar = () => {
        fetchData(setor, usuario);
    }

    // useMemo para memorizar a estrutura das colunas e registros para evitar renderizações desnecessárias
    const renderedColumns = useMemo(() => (
        Object.values(colunas).map((item) => (
            <th key={item.status}
                style={{position: 'sticky', top: 0, zIndex: 2}}>
                <div className="row p-2 mx-1 justify-content-between rounded-top"
                     style={{
                         backgroundColor: item.cor ?? 'black',
                         width: 370,
                     }}
                >
                    <div className="col-auto">
                        <Typography fontWeight="bold" color="white">{item.nome}</Typography>
                    </div>
                    <div className="col-auto">
                        <Typography fontWeight="bold" color="white">Qdt: {item?.items?.length ?? 0}</Typography>
                    </div>
                </div>
            </th>
        ))
    ), [colunas]);

    const renderedRows = useMemo(() => (
        Object.values(colunas).map(({status}) => {
            const statusGroup = registros[status];
            return (
                <td key={status} style={{padding: 10}}>
                    {statusGroup?.items?.map((item) => (
                        <CardKanbanLeads key={item.id} item={item} fetchData={atualizar}/>
                    ))}
                </td>
            );
        })
    ), [colunas, registros]);

    return (
        <Layout titlePage="Funil de Vendas" menu="leads" submenu="leads-kanban">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <TextField
                        label="Representante"
                        select
                        fullWidth
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Pencil size={20} color="gray"/> {/* Ícone à esquerda */}
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        {usuarios?.map(({id, nome}) => (
                            <MenuItem key={id} value={id}>
                                {nome}
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
                                    <Ticket size={20} color="gray"/>
                                </InputAdornment>
                            ),
                        }}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        {setores?.map(({id, nome}) => (
                            <MenuItem key={id} value={id}>
                                {nome}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            </div>

            {carregando && <LinearProgress/>}

            <ScrollContainer
                vertical={true}
                horizontal={true}
                activationDistance={10}
                style={{
                    cursor: 'grab',
                    overflow: 'scroll',
                    maxHeight: 'calc(100vh - 11rem)',
                    whiteSpace: 'nowrap'
                }}
                className="scroll-container"
            >
                {!carregando && (
                    <div style={{minWidth: '1000px'}}>
                        <table>
                            <thead style={{position: 'sticky', top: 0, zIndex: 2}}>
                            <tr>
                                {renderedColumns}
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="align-top">
                                {renderedRows}
                            </tr>
                            </tbody>
                        </table>
                        {/*{colunas.length <= 0 && <CardContainer>*/}
                        {/*    <CardBody>*/}
                        {/*        <Typography>Não há status de leads cadastrados para este usuário;</Typography>*/}
                        {/*    </CardBody>*/}
                        {/*</CardContainer>}*/}
                    </div>
                )}
            </ScrollContainer>
        </Layout>
    );
};

export default Page;
