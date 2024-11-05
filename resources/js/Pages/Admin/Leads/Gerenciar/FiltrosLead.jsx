import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardBody from "@/Components/Cards/CardBody.jsx";
import {Box, Button, FormControlLabel, Grid, MenuItem, Stack, Switch, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {TbMinus, TbPlus} from "react-icons/tb";
import Checkbox from "@mui/material/Checkbox";

const FiltrosLead = ({
                         filtros,
                         setFiltros,

                         setores,
                         datasImportacao,
                         setorSelecionado,
                         carregando,
                         statusleads,
                     }) => {

    const [maisFiltros, setMaisFiltros] = useState(false)

    const handleFiltro = () => {
        setMaisFiltros(value => !value)
    }

    return (
        <CardContainer>
            <CardBody>
                <Box>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <TextField label="Setor" select fullWidth size="small" className="mb-3"
                                       onChange={e => setFiltros({...filtros, setor: e.target.value})}>
                                {setores.map((option) => <MenuItem key={option.id} value={option.id}>{option.nome}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField fullWidth select label="Status" defaultValue="" size="small"
                                       onChange={e => setFiltros({...filtros, status: e.target.value})}>
                                <MenuItem value="">Todos</MenuItem>
                                {statusleads.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack direction="row">
                                <TextField label="Filtro" select defaultValue="id" size="small" fullWidth sx={{width: '10rem'}}
                                           onChange={e => setFiltros({...filtros, filtro: e.target.value})}>
                                    <MenuItem value="id">ID</MenuItem>
                                    <MenuItem value="nome">Nome/Razão Social</MenuItem>
                                    <MenuItem value="cnpj">CNPJ</MenuItem>
                                    <MenuItem value="cidade">Cidade</MenuItem>
                                    <MenuItem value="ddd">DDD</MenuItem>
                                    <MenuItem value="telefone">Telefone</MenuItem>
                                </TextField>
                                <TextField placeholder="Pesquisar..." fullWidth
                                           onChange={e => setFiltros({...filtros, filtro_valor: e.target.value})} size="small"/>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>

                {maisFiltros && <Box marginBottom={3}>
                    <Grid container marginBottom={1} gap={1}>
                        <Grid xs={12} md={3}>
                            <FormControlLabel
                                label={<small>Apenas SEM SDR</small>}
                                control={<Checkbox size="small" disabled={carregando}
                                                   onChange={e => setFiltros({...filtros, sdr: e.target.checked})}/>}/>
                        </Grid>
                        <Grid xs={12} md={3}>
                            <FormControlLabel
                                label={<small>Apenas SEM Consultor(a)</small>}
                                control={<Checkbox size="small" disabled={carregando}
                                                   onChange={e => setFiltros({...filtros, consultor: e.target.checked})}/>}/>
                        </Grid>
                        <Grid xs={12} md={3}>
                            <FormControlLabel
                                label={<small>Enriquecidos</small>}
                                control={<Checkbox size="small" disabled={carregando}
                                                   onChange={e => setFiltros({...filtros, enriquecidos: e.target.checked})}/>}/>
                        </Grid>
                    </Grid>
                    <Grid container gap={3}>
                        <Grid xs={12} md={2}>
                            <TextField select label="Importação" fullWidth size="small" onChange={e => setFiltros({...filtros, importacao: e.target.value})}>
                                <MenuItem value="">Todas as datas</MenuItem>
                                {datasImportacao.map(item => <MenuItem key={item.id} value={item.id}>#{item.id} {item.data}</MenuItem>)}
                            </TextField>
                        </Grid>
                        <Grid xs={12} md={2}>
                            <TextField fullWidth select label="Leads" defaultValue="" size="small"
                                       onChange={e => setFiltros({...filtros, leads: e.target.value})}>
                                <MenuItem value="">Todos</MenuItem>
                                <MenuItem value="novos">Nunca Atendidos</MenuItem>
                                <MenuItem value="atendidos">Já Atendidos</MenuItem>
                                <MenuItem value="ativados">Com Pedidos</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid xs={12} md={2}>
                            <TextField label="Classificação" select size="small" fullWidth
                                       onChange={e => setFiltros({...filtros, classificacao: e.target.value})}>
                                <MenuItem value="" style={{height: 30}}></MenuItem>
                                <MenuItem value="😁">😁</MenuItem>
                                <MenuItem value="🙂">🙂</MenuItem>
                                <MenuItem value="😐">😐</MenuItem>
                                <MenuItem value="☹️">☹️</MenuItem>
                                <MenuItem value="❌">❌</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid xs={12} md={2}>
                            <TextField label="Contatos" select size="small" fullWidth
                                       onChange={e => setFiltros({...filtros, contato: e.target.value})}>
                                <MenuItem value="" >Todos</MenuItem>
                                <MenuItem value="sem_telefone">Sem Telefone</MenuItem>
                                <MenuItem value="com_telefone">Com Telefone</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>}

                <Button color="warning" size="small" onClick={handleFiltro} startIcon={maisFiltros ? <TbMinus size={15}/> : <TbPlus size={15}/>}>Filtros</Button>
            </CardBody>
        </CardContainer>
    )
}
export default FiltrosLead
