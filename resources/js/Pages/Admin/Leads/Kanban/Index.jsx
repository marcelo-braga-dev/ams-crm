import Layout from "@/Layouts/Layout.jsx";
import React, {useEffect, useState, useMemo, useCallback} from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import {Avatar, Stack, Typography} from "@mui/material";
import CardKanbanLeads from "@/Pages/Admin/Leads/Kanban/Components/CardKanbanLeads.jsx";
import ScrollContainer from "react-indiana-drag-scroll";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import {debounce} from 'lodash';
import {Box, Pencil} from "react-bootstrap-icons";
import InputAdornment from "@mui/material/InputAdornment";

const Page = () => {
    const [setor, setSetor] = useState("");
    const [usuario, setUsuario] = useState("");

    const [cards, setCards] = useState([]);

    const [usuarios, setUsuarios] = useState([]);
    const [setores, setSetores] = useState([]);
    const [colunas, setColunas] = useState([]);

    const [carregando, setCarregando] = useState(false);

    // Função para buscar os dados e aplicar filtros com debouncing para melhorar a performance
    const fetchData = useCallback(
        debounce(async (setor, usuario) => {
            try {
                const response = await axios.get(route('auth.leads.funil-vendas-kanban.index-registros'), {
                    params: {setor, usuario},
                });
                setCards(response.data.cards)
                console.log(response.data.cards)


                setUsuarios(response.data.usuarios);
                setSetores(response.data.setores);
                setColunas(response.data.colunas);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setCarregando(false);
            }
        }, 300), []);

    useEffect(() => {
        setCarregando(true);
        fetchData(setor, usuario);
    }, [setor, usuario, fetchData]);

    const atualizarCards = () => {
        fetchData(setor, usuario);
    }

    // useMemo para memorizar a estrutura das colunas e registros para evitar renderizações desnecessárias
    const renderedColumns = useMemo(() => (
        Object.values(colunas).map((item) => (
            <th key={item.status}
                style={{position: 'sticky', top: 0, zIndex: 2}}>
                <div className="row mx-1 justify-content-between"
                     style={{
                         backgroundColor: item.cor ?? 'black',
                         width: 370,
                         paddingBlock: 10,
                         paddingInline: 15,
                         borderTopLeftRadius: 15,
                         borderTopRightRadius: 15,
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
        Object.values(colunas).map(({status, cor}) => {
            const statusGroup = cards[status];

            return (
                <td key={status} style={{padding: 10}}>
                    {statusGroup?.map((item, index) => (
                        index < 20 ? <CardKanbanLeads
                            key={item.id}
                            card={item}
                            cor={cor}
                            emitePedidos={statusGroup?.status_dados?.emite_pedidos}
                            atualizarCards={atualizarCards}
                        /> : ''
                    ))}
                </td>
            );
        })
    ), [colunas, cards]);

    return (
        <Layout titlePage="Funil de Vendas" menu="leads" submenu="leads-kanban">
            {usuarios.length > 1 && (
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <TextField
                            label="Representante"
                            select fullWidth value={usuario} onChange={(e) => setUsuario(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Pencil size={20} color="gray"/>
                                    </InputAdornment>
                                ),
                            }}
                        >
                            <MenuItem value="">Todos</MenuItem>
                            {usuarios?.map(({id, nome, foto}) => (
                                <MenuItem key={id} value={id}>
                                    <Stack direction="row" spacing={1}>
                                        <Avatar src={foto} sx={{width: 20, height: 20}}/>
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
                                        <Box size={20} color="gray"/>
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
            )}

            {carregando && <LinearProgress/>}

            {!carregando && (
                <ScrollContainer
                    vertical={true}
                    horizontal={true}
                    activationDistance={10}
                    hideScrollbars={false}
                    style={{
                        cursor: 'grab',
                        height: 'calc(100vh - 10rem)'
                    }}
                >
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

                        {colunas.length === 0 &&
                            <Typography>Não há status de funil cadastrados para este usuário;</Typography>
                        }
                    </div>

                </ScrollContainer>
            )}
        </Layout>
    );
};

export default Page;
