import CardTitle from '@/Components/Cards/CardTitle.jsx';
import { ArrowDownShort, ArrowUpShort, CalendarEvent, CurrencyDollar, Eye, List, Truck } from 'react-bootstrap-icons';
import { Typography, Checkbox, Stack, Button } from '@mui/material';
import CardBody from '@/Components/Cards/CardBody.jsx';
import CardContainer from '@/Components/Cards/CardContainer.jsx';
import React, { useContext, useEffect, useState } from 'react';
import convertFloatToMoney from '@/Helpers/converterDataHorario.jsx';

import axios from 'axios';
import Chip from '@mui/material/Chip';
import RealizarPagamento from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/RealizarPagamento.jsx';
import { ContextFluxoCaixa } from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/ContextFluxoCaixa.jsx';
import LinearProgress from '@mui/material/LinearProgress';
import { round } from 'lodash';
import { TbChevronDown } from 'react-icons/tb';

const ProximosPagamentos = () => {
    const [pagamentos, setPagamentos] = useState([]);
    const [tipoEntrada, setTipoEntrada] = useState(true);
    const [tipoSaida, setTipoSaida] = useState(true);
    const [qtdPagamentosVisualizar, setQtdPagamentosVisualizar] = useState(10);

    const [carregando, setCarregando] = useState(false);

    const { atualizarRegistros } = useContext(ContextFluxoCaixa);

    const fetchPagamentos = async () => {
        setCarregando(true);
        try {
            const response = await axios.get(route('admin.financeiro.fluxo-caixa.proximos-pagamentos', {
                tipo_saida: !tipoSaida,
                tipo_entrada: !tipoEntrada,
            })).finally(() => setCarregando(false));
            setPagamentos(response.data.pagamentos);

        } catch (error) {
            console.error('Erro ao buscar pagamentos:', error);
        }
    };

    useEffect(() => {
        fetchPagamentos();
    }, [tipoEntrada, tipoSaida, atualizarRegistros]);


    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPagamento, setSelectedPagamento] = useState(null);

    // Função para abrir o dialog com as informações do pagamento
    const handleOpenDialog = (pagamento) => {
        setSelectedPagamento(pagamento);
        setOpenDialog(true);
    };

    const handleQtdVisualizar = () => {
        setQtdPagamentosVisualizar(e => e + 30);
    };

    const chipPazo = (prazo) => {
        let chipLabel = '';
        let chipColor = '';

        switch (true) {
            case prazo < -1:
                chipLabel = `Vencido há ${Math.round(Math.abs(prazo))} dias`;
                chipColor = 'error';
                break;
            case prazo < 0:
                chipLabel = 'Vence Hoje';
                chipColor = 'warning';
                break;
            case prazo < 1:
                chipLabel = 'Vence Amanhã';
                chipColor = 'info';
                break;
            default:
                chipLabel = `Vencerá em ${Math.round(prazo)} dias`;
                chipColor = 'info';
                break;
        }

        return <Chip label={chipLabel} size="small" color={chipColor} />;
    };

    return (<>
        <CardContainer>
            <CardTitle
                title="Próximos Pagamentos" icon={<List size={25} />}
                children={(
                    <Stack direction="row" spacing={2}>
                        <Stack direction="row" alignItems="center">
                            <Checkbox
                                size="small"
                                defaultChecked={tipoSaida}
                                onChange={e => setTipoSaida(e.target.checked)} />
                            <Typography variant="body2">Entradas</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <Checkbox
                                size="small"
                                defaultChecked={tipoEntrada}
                                onChange={e => setTipoEntrada(e.target.checked)}
                            />
                            <Typography variant="body2">Saidas</Typography>
                        </Stack>
                    </Stack>
                )}
            />

            <CardBody>
                {carregando ? <LinearProgress /> :
                    <div style={{ maxHeight: '60vh', overflow: 'auto' }}>
                        {pagamentos.length > 0 ? pagamentos.map((item, index) => (
                            index < qtdPagamentosVisualizar &&
                            <CardContainer key={item.id}>
                                <CardBody>
                                    <Stack direction="row" onClick={() => handleOpenDialog(item)} spacing={1} sx={{ cursor: 'pointer' }}>
                                        <Stack spacing={1} sx={{ overflow: 'hidden', width: '100%' }}>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Stack spacing={0} direction="row" alignItems="center">
                                                    {item.nota_fiscal.tipo === 'entrada'
                                                        ? <><ArrowUpShort size={28} color="green" /><Typography color="green">Entrada</Typography></>
                                                        : <><ArrowDownShort size={28} color="red" /><Typography color="red">Saída</Typography></>
                                                    }
                                                </Stack>
                                                <Stack spacing={1} direction="row" alignItems="center">
                                                    <Eye />
                                                </Stack>
                                            </Stack>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Stack spacing={1} direction="row" alignItems="center">
                                                    <CalendarEvent />
                                                    <Typography>{item.data}</Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack spacing={1} direction="row" alignItems="center" sx={{ overflow: 'hidden' }}>
                                                <Stack>
                                                    <Truck size={20} />
                                                </Stack>
                                                <Typography sx={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}>
                                                    {item.nota_fiscal?.fornecedor?.nome}
                                                </Typography>
                                            </Stack>
                                            <Stack spacing={1} direction="row" alignItems="center" sx={{ overflow: 'hidden' }}>
                                                <CurrencyDollar />
                                                <Typography>R$ {convertFloatToMoney(item.valor)}</Typography>
                                            </Stack>
                                            {chipPazo(item?.vencido)}
                                        </Stack>
                                    </Stack>
                                </CardBody>
                            </CardContainer>

                        )) : <Typography variant="body2">Não há registros.</Typography>}

                        {pagamentos.length > qtdPagamentosVisualizar &&
                            <Stack
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                spacing={1}
                                onClick={handleQtdVisualizar}
                                className="cursor-pointer"
                                marginBottom={2}
                            >
                                <Typography>Ver mais</Typography>
                                <TbChevronDown size={22}/>
                            </Stack>
                        }
                    </div>
                }
            </CardBody>
        </CardContainer>

        {/* Dialog para mostrar informações do pagamento */}
        <RealizarPagamento
            nota={selectedPagamento?.nota_fiscal}
            pagamento={selectedPagamento}
            open={openDialog}
            close={setOpenDialog}
        />
    </>);
};
export default ProximosPagamentos;
