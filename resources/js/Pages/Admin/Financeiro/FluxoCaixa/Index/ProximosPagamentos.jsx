import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {ArrowDownShort, ArrowUpShort, CalendarEvent, CurrencyDollar, Eye, Files, List, Truck} from "react-bootstrap-icons";
import {Typography, Checkbox, Stack} from "@mui/material";
import CardBody from "@/Components/Cards/CardBody.jsx";
import CardContainer from "@/Components/Cards/CardContainer.jsx";
import React, {useEffect, useState} from "react";
import convertFloatToMoney from "@/Helpers/converterDataHorario.jsx";

import {Dialog, DialogContent} from "@mui/material";

import axios from 'axios';
import PagarEntrada from "@/Pages/Admin/Financeiro/FluxoCaixa/Components/PagarEntrada.jsx";
import PagarSaida from "@/Pages/Admin/Financeiro/FluxoCaixa/Components/PagarSaida.jsx";
import CampoTexto from "@/Components/CampoTexto.jsx";
import CardTable from "@/Components/Cards/CardTable.jsx";

const ProximosPagamentos = () => {
    const [pagamentos, setPagamentos] = useState([]);

    const fetchPagamentos = async () => {
        try {
            const response = await axios.get(route('admin.financeiro.fluxo-caixa.proximos-pagamentos'));
            setPagamentos(response.data.pagamentos);
        } catch (error) {
            console.error('Erro ao buscar pagamentos:', error);
        }
    };

    useEffect(() => {
        fetchPagamentos();
    }, []);


    const [openDialog, setOpenDialog] = useState(false);
    const [selectedPagamento, setSelectedPagamento] = useState(null);


    // Função para atualizar o status do pagamento
    // const handleUpdateStatus = async () => {
    //     try {
    //         await axios.post(route('admin.financeiro.fluxo-caixa.atualizar-status', {id: selectedPagamento.id}));
    //         // Atualize os pagamentos após a alteração
    //         fetchPagamentos();
    //         setOpenDialog(false);
    //     } catch (error) {
    //         console.error('Erro ao atualizar status:', error);
    //     }
    // };

    // Função para abrir o dialog com as informações do pagamento
    const handleOpenDialog = (pagamento) => {
        setSelectedPagamento(pagamento);
        setOpenDialog(true);
    };

    return (<>
        {/*<CardContainer>*/}
        <CardContainer>
            <CardTitle
                title="Próximas Pagamentos" icon={<List size={25}/>}
                children={(
                    <Stack direction="row" spacing={2}>
                        <Stack direction="row" alignItems="center">
                            <Checkbox size="small" defaultChecked={true}/><Typography variant="body2">Entradas</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center">
                            <Checkbox size="small" defaultChecked={true}/><Typography variant="body2">Saídas</Typography>
                        </Stack>
                    </Stack>
                )}
            />
        </CardContainer>

        <div style={{maxHeight: 800, overflow: 'auto'}}>
            {pagamentos.length > 0 ? pagamentos.map(item => (
                <CardContainer key={item.id}>
                    <CardBody>
                        <Stack direction="row" onClick={() => handleOpenDialog(item)} spacing={1} sx={{cursor: 'pointer'}}>
                            <Stack>
                                {item.nota_fiscal.tipo === 'entrada' ? (
                                    <ArrowUpShort size={40} color="green"/>
                                ) : (
                                    <ArrowDownShort size={40} color="red"/>
                                )}
                            </Stack>
                            <Stack spacing={1} sx={{overflow: 'hidden', width: '100%'}}>
                                <Stack direction="row" justifyContent="space-between">
                                    <Stack spacing={1} direction="row" alignItems="center">
                                        <CalendarEvent/>
                                        <Typography>{item.data}</Typography>
                                    </Stack>
                                    <Stack spacing={1} direction="row" alignItems="center">
                                        <Eye/>
                                    </Stack>
                                </Stack>
                                <Stack spacing={1} direction="row" alignItems="center" sx={{overflow: 'hidden'}}>
                                    <Stack>
                                        <Truck size={20}/>
                                    </Stack>
                                    <Typography sx={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}>
                                        {item.nota_fiscal.fornecedor.nome}
                                    </Typography>
                                </Stack>
                                <Stack spacing={1} direction="row" alignItems="center" sx={{overflow: 'hidden'}}>
                                    <CurrencyDollar/>
                                    <Typography>R$ {convertFloatToMoney(item.valor)}</Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </CardBody>
                </CardContainer>
            )) : <Typography variant="body2">Não há registros.</Typography>}
        </div>

        {/* Dialog para mostrar informações do pagamento */}
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            fullWidth
            maxWidth="xl"
            PaperProps={{
                sx: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',              // Remove a sombra para um visual consistente
                },
            }}>
            <DialogContent>
                {selectedPagamento && <>
                    <CardContainer>
                        <CardTitle title="Atualizar Pagamento"
                                   icon={selectedPagamento.nota_fiscal.tipo === 'entrada'
                                       ? <ArrowUpShort size={25} color="green"/>
                                       : <ArrowDownShort size={28} color="red"/>}/>
                        <CardBody>
                            <CampoTexto titulo="Fornecedor" texto={selectedPagamento.nota_fiscal.fornecedor.nome}/>
                            <CampoTexto titulo="Nota Fiscal" texto={selectedPagamento.nota_fiscal.nota}/>
                            <CampoTexto titulo="Franquia" texto={selectedPagamento.nota_fiscal.franquia.nome}/>
                            <CampoTexto titulo="Descrição" texto={selectedPagamento.nota_fiscal.descricao}/>
                        </CardBody>
                    </CardContainer>

                    <CardContainer>
                        <CardTable title="Pagamentos" icon={<Files size={22}/>}>
                            {selectedPagamento.nota_fiscal.tipo === 'entrada'
                                ? <PagarEntrada dadosPagamento={selectedPagamento}/>
                                : <PagarSaida dadosPagamento={selectedPagamento}/>}
                        </CardTable>
                    </CardContainer>
                </>}
            </DialogContent>
        </Dialog>
        {/*</CardContainer>*/}
    </>)
}
export default ProximosPagamentos
