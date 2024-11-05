import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import { TbFilter } from 'react-icons/tb';
import CardBody from '@/Components/Cards/CardBody.jsx';
import { useGerenciarLeads } from '@/Pages/Geral/Leads/Gerenciar/Context.jsx';
import { FormControlLabel, MenuItem, Stack, Switch, TextField } from '@mui/material';
import React from 'react';

const Filtro = () => {

    const {filtros, filtrar} = useGerenciarLeads();

    return (
        <CardContainer>
            <CardTitle title="Filtros" icon={<TbFilter size={22} />} />
            <CardBody>
                <div className="row justify-content-between">
                    <div className="col-md-2">
                        <TextField label="Setor" select fullWidth size="small" className="mb-3"
                                   onChange={e => setSetorSelecionado(e.target.value)}>
                            {filtros.setores.map((option) => <MenuItem key={option.id} value={option.id}>{option.nome}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-md-2">
                        <TextField select label="Importação" fullWidth size="small" onChange={e => setImportacao(e.target.value)}>
                            <MenuItem value="">Todas as datas</MenuItem>
                            {filtros.datasImportacao.map(item => <MenuItem key={item.id} value={item.id}>#{item.id} {item.data}</MenuItem>)}
                        </TextField>
                    </div>
                    <div className="col-md-2">
                        <TextField fullWidth select label="Status" defaultValue="" size="small"
                                   onChange={event => setStatus(event.target.value)}>
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="novo">Novos</MenuItem>
                            <MenuItem value="fazer">A Fazer</MenuItem>
                            <MenuItem value="progresso">Em Progresso</MenuItem>
                            <MenuItem value="revisao">Revisão</MenuItem>
                            <MenuItem value="concluido">Concluídos</MenuItem>
                            <MenuItem value="finalizado">Finalizados</MenuItem>
                            <MenuItem value="inativo">Inativos</MenuItem>
                            <MenuItem value="inicio_funil">Início Funil</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-md-2">
                        <TextField fullWidth select label="Leads" defaultValue="" size="small"
                                   onChange={event => setFiltroLeads(event.target.value)}>
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="novos">Novos</MenuItem>
                            <MenuItem value="atendidos">Já Atendidos</MenuItem>
                            <MenuItem value="ativados">Ativados</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-md-3">
                        <Stack direction="row">
                            <TextField label="Filtro" select defaultValue="id" size="small" fullWidth sx={{ width: '10rem' }}
                                       onChange={event => setFiltro(event.target.value)}>
                                <MenuItem value="id">ID</MenuItem>
                                <MenuItem value="nome">Nome/Razão Social</MenuItem>
                                <MenuItem value="cnpj">CNPJ</MenuItem>
                                <MenuItem value="cidade">Cidade</MenuItem>
                                <MenuItem value="ddd">DDD</MenuItem>
                                <MenuItem value="telefone">Telefone</MenuItem>
                            </TextField>
                            <TextField placeholder="Pesquisar..." fullWidth
                                       onChange={e => setFiltroValor(e.target.value)} size="small" />
                        </Stack>
                    </div>
                    <div className="col-auto">
                        <TextField select size="small" style={{ width: 60 }} onChange={event => setFiltroClassificacao(event.target.value)}>
                            <MenuItem value="" style={{ height: 30 }}></MenuItem>
                            <MenuItem value="😁">😁</MenuItem>
                            <MenuItem value="🙂">🙂</MenuItem>
                            <MenuItem value="😐">😐</MenuItem>
                            <MenuItem value="☹️">☹️</MenuItem>
                            <MenuItem value="❌">❌</MenuItem>
                        </TextField>
                    </div>
                </div>
                <div className="row justify-content-between">
                    <div className="col-auto">
                        <Stack direction="row" spacing={4}>
                            <FormControlLabel label={<small>Apenas SEM SDR</small>}
                                              control={<Switch size="small"
                                                               onChange={e => setComSdr(e.target.checked)} />} />
                            <FormControlLabel label={<small>Apenas SEM Consultor(a)</small>}
                                              control={<Switch size="small"
                                                               onChange={e => setComConsultor(e.target.checked)} />} />
                            <FormControlLabel label={<small>Enriquecidos</small>}
                                              control={<Switch size="small"
                                                               onChange={e => setFiltroEnriquecidos(e.target.checked)} />} />
                        </Stack>
                    </div>
                </div>

            </CardBody>
        </CardContainer>
    );
};
export default Filtro;
