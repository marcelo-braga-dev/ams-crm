import CardContainer from "@/Components/Cards/CardContainer.jsx";
import CardTitle from "@/Components/Cards/CardTitle.jsx";
import {ArrowDownShort, ArrowUpShort} from "react-bootstrap-icons";
import CardBody from "@/Components/Cards/CardBody.jsx";
import React, {useEffect, useMemo, useState} from "react";
import CampoTexto from "@/Components/CampoTexto.jsx";
import convertFloatToMoney from "@/Helpers/converterDataHorario.jsx";
import {DialogContent, Divider, Stack, Typography} from "@mui/material";
import PagarEntrada from "@/Pages/Admin/Financeiro/FluxoCaixa/Components/PagarEntrada.jsx";
import PagarSaida from "@/Pages/Admin/Financeiro/FluxoCaixa/Components/PagarSaida.jsx";
import Dialog from "@mui/material/Dialog";
import {router} from "@inertiajs/react";

const PagamentosFiltrados = ({filtros}) => {
    const [registros, setRegistros] = useState([])

    useEffect(() => {
        fethRegistros()
    }, [filtros]);

    const registrosCards = useMemo(async () => {

    }, []);

    const fethRegistros = async () => {
        await axios.get(route('admin.financeiro.fluxo-caixa.registros-filtrados', {...filtros}))
            .then(res => setRegistros(res.data))
    }

    const [open, setOpen] = React.useState(false);
    const [openDialogId, setOpenDialogId] = useState('');

    const handleClickOpen = (id) => {
        setOpenDialogId(id)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        registros?.length > 0 && registros.map(item => {
            const isEntrada = item.tipo === 'entrada'

            return (
                <CardContainer>
                    <CardTitle title={isEntrada ? 'Entrada' : 'Saída'} icon={isEntrada ?
                        <ArrowUpShort size={30} color="green"/> : <ArrowDownShort size={30} color="red"/>}/>
                    <CardBody>
                        {/*<CampoTexto titulo="Fornecedor" texto={item?.fornecedor?.nome} nowrap/>*/}
                        {/*<CampoTexto titulo="Franquia" texto={item?.franquia?.nome}/>*/}
                        {/*{item?.empresa?.nome && <CampoTexto titulo="Empresa" texto={item?.empresa?.nome}/>}*/}
                        {/*<CampoTexto titulo="Pagamentos" texto={`${item?.pagos_qtd}/${item?.pagamentos_qtd}`}/>*/}

                        {item?.pagamentos.map(pagamentos => (
                            <CardContainer>
                                <CardBody>
                                    <CampoTexto titulo="Data Pagamento" texto={pagamentos.data}/>
                                    <div className="row">
                                        <div className="col"><CampoTexto titulo="Status" texto={pagamentos.status.toUpperCase()}/></div>
                                        <div className="col"><CampoTexto titulo="Valor" texto={`R$ ${convertFloatToMoney(pagamentos.valor)}`}/></div>
                                    </div>

                                    {pagamentos.data_baixa && <>
                                        <Divider color="gray" className="mb-2"/>
                                        <Typography variant="body2">Informações da Baixa</Typography>
                                        <div className="row">
                                            {pagamentos.valor_baixa && <div className="col">
                                                <CampoTexto titulo="Valor Baixa" texto={`R$ ${convertFloatToMoney(pagamentos.valor_baixa)}`}/></div>}
                                            {pagamentos.data_baixa &&
                                                <div className="col"><CampoTexto titulo="Data Baixa" texto={pagamentos.data_baixa}/></div>}
                                            {pagamentos.forma_pagamento &&
                                                <div className="col"><CampoTexto titulo="Forma Pagamento" texto={pagamentos.forma_pagamento}/></div>}
                                            {pagamentos.banco &&
                                                <div className="col"><CampoTexto titulo="Banco" texto={pagamentos?.banco?.nome}/></div>}
                                        </div>
                                    </>}

                                    {pagamentos.status === 'aberto' &&
                                        <button className="btn btn-success" onClick={() => handleClickOpen(pagamentos.id)}>
                                            Pagar
                                        </button>
                                    }

                                    {(openDialogId === pagamentos.id) &&
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            fullWidth
                                            maxWidth="lg"
                                        >
                                            <DialogContent>
                                                <CampoTexto titulo="Fornecedor" texto={item?.fornecedor?.nome} nowrap/>
                                                <CampoTexto titulo="Franquia" texto={item?.franquia?.nome}/>
                                                {item?.empresa?.nome && <CampoTexto titulo="Empresa" texto={item?.empresa?.nome}/>}
                                            </DialogContent>
                                            {(isEntrada ? <PagarEntrada dadosPagamento={pagamentos}/> : <PagarSaida dadosPagamento={pagamentos}/>)}
                                        </Dialog>
                                    }

                                </CardBody>
                            </CardContainer>
                        ))}
                    </CardBody>


                </CardContainer>
            )
        })
    )
}
export default PagamentosFiltrados
