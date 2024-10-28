import CardBody from '@/Components/Cards/CardBody.jsx';
import { MenuItem, Stack, TextField } from '@mui/material';
import SelectMesesMultiples from '@/Components/Inputs/SelectMesesMultiples.jsx';
import CardContainer from '@/Components/Cards/CardContainer.jsx';

const FiltrosComponent = ({ setor, setores, filters, ano, handleFilterChange, handleFiltrar }) => {
    return (
        <CardContainer>
            <CardBody>
                <div className="row">
                    <div className="col-2">
                        <TextField
                            label="Setor"
                            select
                            fullWidth
                            defaultValue={setor}
                            onChange={(e) => handleFilterChange('setorSelecionado', e.target.value)}
                        >
                            {setores.map(item => (<MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>))}
                        </TextField>
                    </div>
                    <div className="col-3">
                        <Stack direction="row">
                            <SelectMesesMultiples
                                label="Mês Referência"
                                value={filters.mesesSelecionado}
                                useState={(value) => handleFilterChange('mesesSelecionado', value)}
                            />
                            <TextField
                                label="Ano"
                                select
                                fullWidth
                                defaultValue={ano}
                                style={{ width: '10rem' }}
                                onChange={(e) => handleFilterChange('anoSelecionado', e.target.value)}
                            >
                                <MenuItem value="2023">2023</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                            </TextField>
                        </Stack>
                    </div>
                    <div className="col-3">
                        <Stack direction="row">
                            <SelectMesesMultiples
                                label="Comparar Meses"
                                value={filters.mesesSelecionadoComp}
                                useState={(value) => handleFilterChange('mesesSelecionadoComp', value)}
                            />
                            <TextField
                                label="Comparar Ano"
                                select
                                fullWidth
                                style={{ width: '10rem' }}
                                onChange={(e) => handleFilterChange('anoSelecionadoComp', e.target.value)}
                            >
                                <MenuItem value="2023">2023</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                            </TextField>
                        </Stack>
                    </div>
                    <div className="col-2">
                        <button className="btn btn-primary btn-sm" onClick={handleFiltrar}>
                            Filtrar
                        </button>
                    </div>
                </div>
            </CardBody>
        </CardContainer>
    );
};
export default FiltrosComponent;
