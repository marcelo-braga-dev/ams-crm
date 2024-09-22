import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import { DateRange } from 'react-date-range';
import { Stack, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from '@mui/material/Autocomplete';
import React, { useState } from 'react';
import { ptBR } from 'react-date-range/src/locale';
import { router } from '@inertiajs/react';
import CardTitle from '@/Components/Cards/CardTitle.jsx';
import { ChevronDown, ChevronUp, ListCheck } from 'react-bootstrap-icons';

const Filtros = ({ filtros, setFiltros, fornecedores, franquias, empresas }) => {

    const [openFiltro, setOpenFiltro] = useState(false);

    const [state, setState] = useState([
        {
            startDate: new Date,
            endDate: new Date,
            key: 'selection',
            color: '#102030',
        },
    ]);

    const itemsFornecedor = [
        { label: 'Todos', id: '' },
        ...fornecedores.map(item => {
            return { label: item.valor, id: item.id };
        }),
    ];

    const limparFiltroData = () => {
        router.get(route('admin.financeiro.fluxo-caixa.index'));
    };

    return (
        <CardContainer>
            <CardTitle
                title="Filtrar" cursorPointer onClick={() => setOpenFiltro(!openFiltro)}
                icon={<ListCheck size={22} />}
                children={openFiltro ? <ChevronUp size={22} /> : <ChevronDown size={22} />} />

            {openFiltro && <CardBody>
                <div className="row">
                    <div className="col-auto">
                        <DateRange
                            onChange={item => {
                                setFiltros({
                                    ...filtros,
                                    periodoInicio: item.selection.startDate,
                                    periodoFim: item.selection.endDate,
                                });
                                setState([item.selection]);
                            }}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={1}
                            scroll={{ enabled: true }}
                            ranges={state}
                            direction="vertical"
                            minDate={new Date('2023-01-01')}
                            maxDate={new Date('2026-01-01')}
                            showDateDisplay={false}
                            locale={ptBR}
                            dateDisplayFormat="d/MM/yyyy"
                        />
                    </div>
                    <div className="col">
                        <Stack spacing={1}>
                            <TextField className="" label="Tipo" select fullWidth value={filtros.tipo ?? ''}
                                       onChange={e => setFiltros({ ...filtros, tipo: e.target.value })}>
                                <MenuItem value={undefined}>Todas</MenuItem>
                                <MenuItem value="entrada">Entrada</MenuItem>
                                <MenuItem value="saida">Saída</MenuItem>
                            </TextField>

                            <TextField label="Status" select fullWidth
                                       value={filtros.status ?? ''}
                                       onChange={e => setFiltros({ ...filtros, status: e.target.value })}>
                                <MenuItem value={undefined}>Todas</MenuItem>
                                <MenuItem value="pago">Pago</MenuItem>
                                <MenuItem value="aberto">Aberto</MenuItem>
                            </TextField>

                            <Autocomplete
                                disablePortal
                                options={itemsFornecedor}
                                getOptionLabel={(option) => option.label}
                                onChange={(event, newValue) => {
                                    setFiltros({ ...filtros, fornecedor: newValue ? newValue.id : null });
                                }}
                                renderInput={(params) => <TextField {...params} label="Fornecedor:" />}
                            />

                            <TextField label="Franquia" select fullWidth
                                       value={filtros.franquia ?? ''}
                                       onChange={e => setFiltros({ ...filtros, franquia: e.target.value })}>
                                <MenuItem value={undefined}>Todas</MenuItem>
                                {franquias.map(item => <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>)}
                            </TextField>

                            <TextField label="Empresa" select fullWidth
                                       value={filtros.empresa ?? ''}
                                       onChange={e => setFiltros({ ...filtros, empresa: e.target.value })}>>
                                <MenuItem value={undefined}>Todas</MenuItem>
                                {empresas.map(item => <MenuItem key={item.id} value={item.id}>{item.valor}</MenuItem>)}
                            </TextField>
                        </Stack>
                        <div className="mt-4 row">
                            <div className="col">
                            </div>
                            <div className="col-auto">
                                <small className="cursor-pointer" onClick={() => limparFiltroData()}>Limpar filtro</small>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
            }
        </CardContainer>
    );
};
export default Filtros;
