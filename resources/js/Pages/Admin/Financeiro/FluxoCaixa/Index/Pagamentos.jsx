import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import Chip from '@mui/material/Chip';
import CampoTexto from '@/Components/CampoTexto.jsx';
import { TbCalendarDollar, TbEye } from 'react-icons/tb';
import convertFloatToMoney from '@/Helpers/converterDataHorario.jsx';
import { Button, DialogContent, IconButton, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React, { useState } from 'react';
import InfoNota from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/InfoNota.jsx';
import RealizarPagamento from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/RealizarPagamento.jsx';

const Pagamentos = ({ pagamentos }) => {

    const [open, setOpen] = React.useState(false);
    const [openInfo, setOpenInfo] = React.useState(false);
    const [openDialogPagar, setOpenDialogPagar] = useState('');
    const [openDialogInfo, setOpenDialogInfo] = useState('');

    const isEntrada = pagamentos.tipo === 'entrada';

    const handleClickOpenPagar = (id) => {
        setOpenDialogPagar(id);
        setOpen(true);
    };

    const handleClosePagar = () => {
        setOpen(false);
        setOpenDialogPagar('');
    };

    const handleClickOpenInfo = (id) => {
        setOpenDialogInfo(id);
        setOpenInfo(true);
    };

    const handleCloseInfo = () => {
        setOpenInfo(false);
        setOpenDialogInfo('');
    };

    return pagamentos?.pagamentos.map((pagamento) => (
        <CardContainer key={pagamento.id}>
            <CardBody>
                <div className="row">

                    <div className="col">
                        {pagamento.status === 'pago' ? (
                            <Chip label="Pago" size="small" color="success" />
                        ) : pagamento.status === 'aberto' && (
                            pagamento.vencido < 0 ? (
                                <Chip label="Em Atraso" size="small" color="error" />
                            ) : (
                                <Chip label="Em Aberto" size="small" color="info" />
                            )
                        )}

                    </div>
                    <div className="col">
                        <CampoTexto icone={TbCalendarDollar} texto={pagamento.data} />
                    </div>

                    <div className="col">
                        <CampoTexto texto={`R$ ${convertFloatToMoney(pagamento.valor)}`} />
                    </div>
                    <div className="col-2 text-center">
                        {pagamento.status === 'aberto' && (
                            <Button color="success" size="small" onClick={() => handleClickOpenPagar(pagamento.id)}>
                                Pagar
                            </Button>
                        )}
                        {pagamento.status === 'pago' && (
                            <IconButton onClick={() => handleClickOpenInfo(pagamento.id)}>
                                <TbEye />
                            </IconButton>
                        )}
                    </div>
                </div>

                {openDialogInfo === pagamento.id && (
                    <Dialog open={openInfo} onClose={handleCloseInfo} fullWidth maxWidth="lg">
                        <DialogContent>
                            <CardContainer>
                                <CardBody>
                                    <InfoNota nota={pagamentos} />
                                </CardBody>
                            </CardContainer>
                            <CardContainer>
                                <CardBody>
                                    {pagamento.data_baixa && (
                                        <>
                                            <Typography variant="body2">Informações da Baixa</Typography>
                                            <div className="row">
                                                {pagamento.valor_baixa && (
                                                    <div className="col">
                                                        <CampoTexto
                                                            titulo="Valor Baixa"
                                                            texto={`R$ ${convertFloatToMoney(pagamento.valor_baixa)}`}
                                                        />
                                                    </div>
                                                )}
                                                {pagamento.data_baixa && (
                                                    <div className="col">
                                                        <CampoTexto
                                                            titulo="Data Baixa"
                                                            texto={pagamento.data_baixa}
                                                        />
                                                    </div>
                                                )}
                                                {pagamento.forma_pagamento && (
                                                    <div className="col">
                                                        <CampoTexto
                                                            titulo="Forma Pagamento"
                                                            texto={pagamento.forma_pagamento}
                                                        />
                                                    </div>
                                                )}
                                                {pagamento.banco && (
                                                    <div className="col">
                                                        <CampoTexto
                                                            titulo="Banco"
                                                            texto={pagamento?.banco?.nome}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <CampoTexto
                                                titulo="Autor"
                                                texto={pagamento?.autor?.nome}
                                            />
                                        </>
                                    )}
                                </CardBody>
                            </CardContainer>
                        </DialogContent>
                    </Dialog>
                )}

                {openDialogPagar === pagamento.id && (
                    <RealizarPagamento
                        nota={pagamentos}
                        pagamento={pagamento}
                        open={open}
                        close={handleClosePagar}
                    />
                )}
            </CardBody>
        </CardContainer>
    ));
};
export default Pagamentos;
