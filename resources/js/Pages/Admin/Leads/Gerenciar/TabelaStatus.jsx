import {Button, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Menu, Stack, TextField, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {TbDotsVertical} from "react-icons/tb";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import {useEffect, useMemo, useState} from "react";
import LinearProgress from "@mui/material/LinearProgress";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import Dialog from "@mui/material/Dialog";
import CampoTexto from "@/Components/CampoTexto.jsx";
import LeadsStatusDialog from "@/Pages/Admin/Leads/Gerenciar/LeadsStatusDialog.jsx";

const statusColunas = {
    oportunidade: 'OPORTUNIDADES',
    super_oportunidade: 'SUPER OPORTUNIDADES',
    conexao_proativo: 'CONEXÃO PROATIVA',
    contato_direto: 'CONTATO DIRETO 360º',
    cotacao_enviado: 'COTAÇÃO ENVIADA',
    ativo: 'ATIVO'
}

const TabelaStatus = () => {

    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null)
    const [statusSelecionado, setStatusSelecionado] = useState(null)

    const [statusLeads, setStatusLeads] = useState([])

    const [usuarioEncaminhar, setUsuarioEncaminhar] = useState(null)

    const [carregando, setCarregando] = useState(true)
    const [openDialogEncaminhar, setOpenDialogEncaminhar] = useState(false)
    const [openDialogRemover, setOpenDialogRemover] = useState(false)

    const fetchRegistros = async () => {
        const response = await axios.get(route('admin.leads.gerenciar.get-registros'))
            .finally(() => setCarregando(false))

        setStatusLeads(response.data.registros)
    }

    useEffect(() => {
        fetchRegistros()
    }, []);

    const [anchorElMap, setAnchorElMap] = React.useState({});

    const handleMenuOpen = (event, index) => {
        setAnchorElMap((prev) => ({
            ...prev,
            [index]: event.currentTarget,
        }));
    };

    const handleMenuClose = (index) => {
        setAnchorElMap((prev) => ({
            ...prev,
            [index]: null,
        }));
    };

    const totals = statusLeads.reduce(
        (acc, dado) => {
            const {oportunidade = 0, super_oportunidade = 0, conexao_proativo = 0, contato_direto = 0, cotacao_enviado = 0, ativo = 0} = dado.status;
            const total = oportunidade + super_oportunidade + conexao_proativo + contato_direto + cotacao_enviado + ativo;

            acc.totalLeads += total;
            acc.totalOportunidades += oportunidade;
            acc.totalSuperOportunidades += super_oportunidade;
            acc.totalConexaoProativo += conexao_proativo;
            acc.totalContatoDireto += contato_direto;
            acc.totalCotacaoEnviado += cotacao_enviado;
            acc.totalAtivo += ativo;

            acc.rows.push({
                id: dado.id,
                usuario: dado.nome,
                status: {oportunidade, super_oportunidade, conexao_proativo, contato_direto, cotacao_enviado, ativo},
                total,
            });

            return acc;
        },
        {
            totalLeads: 0,
            totalOportunidades: 0,
            totalSuperOportunidades: 0,
            totalConexaoProativo: 0,
            totalContatoDireto: 0,
            totalCotacaoEnviado: 0,
            totalAtivo: 0,
            rows: [],
        }
    );

    const handdleOpenDialogRemover = (user, status) => {
        setOpenDialogRemover(true)
        setUsuarioSelecionado(user)
        setStatusSelecionado(status)
        handleMenuClose(user + status)
    }

    const handdleCloseDialogRemover = () => {
        setOpenDialogRemover(false)
        setUsuarioSelecionado(null)
        setStatusSelecionado(null)
    }

    const fetchRemover = async () => {
        await axios.post(route('admin.leads.gerenciar.remover-status-consultor',
            {user: usuarioSelecionado, status: statusSelecionado, _method: 'PUT'}))
            .finally(() => fetchRegistros())
        handdleCloseDialogRemover()
    }

    const handdleOpenDialogEncaminhar = (user, status) => {
        setOpenDialogEncaminhar(true)
        setUsuarioSelecionado(user)
        setStatusSelecionado(status)
        handleMenuClose(user + status)
    }

    const handdleCloseDialogEncaminhar = () => {
        setOpenDialogEncaminhar(false)
        setUsuarioSelecionado(null)
        setStatusSelecionado(null)
        setUsuarioEncaminhar(null)
    }

    const fetchEncaminhar = async () => {
        if (usuarioEncaminhar) {
            await axios.post(route('admin.leads.gerenciar.encaminhar-status',
                {user: usuarioSelecionado, new_user: usuarioEncaminhar, status: statusSelecionado, _method: 'PUT'}))
                .finally(() => fetchRegistros())
            handdleCloseDialogEncaminhar()
        }
    }

    const tabela = useMemo(() => {
        return totals.rows.map((row) => (
            <tr key={row.id}>
                <td className="text-wrap text-start">
                    <Stack direction="row" alignItems="center">
                        <Avatar src={row.usuario.foto} sx={{width: 25, height: 25}} className="me-2"/>
                        <Typography component="span"><b>{row.usuario.nome}</b></Typography>
                    </Stack>
                </td>
                {Object.entries(row.status).map(([key, value]) => (
                    <td key={key}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Typography>{value}</Typography>
                            <IconButton onClick={(e) => handleMenuOpen(e, row.id + key)}>
                                <TbDotsVertical size={20}/>
                            </IconButton>
                            <Menu
                                id={`menu-${row.id}-${key}`}
                                anchorEl={anchorElMap[row.id + key]}
                                open={Boolean(anchorElMap[row.id + key])}
                                onClose={() => handleMenuClose(row.id + key)}
                            >
                                <MenuItem><LeadsStatusDialog user={row.id} status={key} onClose={() => handleMenuClose(row.id + key)}/></MenuItem>
                                <MenuItem onClick={() => handdleOpenDialogEncaminhar(row.id, key)}>Encaminhar</MenuItem>
                                <MenuItem onClick={() => handdleOpenDialogRemover(row.id, key)}>Remover do Consultor</MenuItem>
                            </Menu>
                        </Stack>
                    </td>
                ))}
                <td className="bg-light"><strong>{row.total}</strong></td>
            </tr>
        ))
    }, [totals.rows, anchorElMap]);

    return (
        <CardContainer>
            <CardTitle title="Quantidade de Leads atualmente em cada Consultor"/>
            {carregando && <LinearProgress/>}
            {!carregando &&
                <div className="table-responsive">
                    <table className="table-1">
                        <thead>
                        <tr>
                            <th>NOME</th>
                            <th>OPORTUNIDADES</th>
                            <th>SUPER OPORTUNIDADES</th>
                            <th>CONEXÃO PROATIVA</th>
                            <th>CONTATO DIRETO 360º</th>
                            <th>COTAÇÃO ENVIADA</th>
                            <th>ATIVO</th>
                            <th>TOTAL</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tabela}
                        <tr className="bg-light">
                            <td><b>TOTAL</b></td>
                            <td>{totals.totalOportunidades}</td>
                            <td>{totals.totalSuperOportunidades}</td>
                            <td>{totals.totalConexaoProativo}</td>
                            <td>{totals.totalContatoDireto}</td>
                            <td>{totals.totalCotacaoEnviado}</td>
                            <td>{totals.totalAtivo}</td>
                            <td><strong>{totals.totalLeads}</strong></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            }

            {/*Dialog Remover*/}
            <Dialog
                open={openDialogRemover}
                onClose={handdleCloseDialogRemover}
                fullWidth
                maxWidth="sm"
            >
                <DialogContent>
                    <Typography variant="h5" marginBottom={2}>CONFIRMAR A REMOÇÃO DO LEADS DESTE CONSULTOR(A)</Typography>
                    <Typography marginBottom={2}>Os status dos leads serão alterados para "oportunidades" e removido o consultor(a).</Typography>
                    <CampoTexto titulo="Consultor(a)" texto={(statusLeads?.find(item => item.id === usuarioSelecionado))?.nome.nome}/>
                    <CampoTexto titulo="Status" texto={statusColunas?.[statusSelecionado]}/>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handdleCloseDialogRemover}>Fechar</Button>
                    <Button color="error" onClick={fetchRemover}>Remover</Button>
                </DialogActions>
            </Dialog>

            {/*Dialog Encaminhar*/}
            <Dialog
                open={openDialogEncaminhar}
                onClose={handdleCloseDialogEncaminhar}
                fullWidth
                maxWidth="sm"
            >

                <DialogContent>
                    <Typography variant="h5" marginBottom={2}>Encaminhar Leads</Typography>
                    <Stack marginBottom={4}>
                        <CampoTexto titulo="Consultor(a)" texto={(statusLeads?.find(item => item.id === usuarioSelecionado))?.nome.nome}/>
                        <CampoTexto titulo="Status" texto={statusColunas?.[statusSelecionado]}/>
                    </Stack>
                    <Grid container spacing={3}>
                        <Grid item sm={9}>
                            <TextField
                                fullWidth
                                label="Enviar leads para..."
                                select
                                onChange={e => setUsuarioEncaminhar(e.target.value)}>
                                {statusLeads.map(item => <MenuItem value={item.id}>
                                    <Stack direction="row" alignItems="center">
                                        <Avatar src={item.nome.foto} sx={{width: 20, height: 20}} className="me-2"/>
                                        <Typography>{item.nome.nome}</Typography>
                                    </Stack>
                                </MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item sm={3}>
                            <Button color="success" onClick={fetchEncaminhar}>Enviar</Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </CardContainer>
    );
};

export default TabelaStatus;
