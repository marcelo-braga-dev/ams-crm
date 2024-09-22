import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { DialogContent } from '@mui/material';
import CampoTexto from '@/Components/CampoTexto.jsx';
import PagarEntrada from '@/Pages/Admin/Financeiro/FluxoCaixa/Components/PagarEntrada.jsx';
import PagarSaida from '@/Pages/Admin/Financeiro/FluxoCaixa/Components/PagarSaida.jsx';

const DialogsFluxoCaixa = ({pagamento, btnPagar}) => {
    const [open, setOpen] = React.useState(false);
    const [openInfo, setOpenInfo] = React.useState(false);
    const [openDialogPagar, setOpenDialogPagar] = useState('');
    const [openDialogInfo, setOpenDialogInfo] = useState('');

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

    return (<>
        {btnPagar === pagamento.id && (
            <Dialog open={openInfo} onClose={handleCloseInfo} fullWidth maxWidth="lg">
                <DialogContent>
                    INFO
                </DialogContent>
            </Dialog>
        )}

        {openDialogPagar === pagamento.id && (
            <Dialog open={open} onClose={handleClosePagar} fullWidth maxWidth="lg">
                <DialogContent>
                    <CampoTexto titulo="Fornecedor" texto={item?.fornecedor?.nome} nowrap />
                    <CampoTexto titulo="Franquia" texto={item?.franquia?.nome} />
                    {item?.empresa?.nome && <CampoTexto titulo="Empresa" texto={item?.empresa?.nome} />}
                </DialogContent>
                {isEntrada ? <PagarEntrada dadosPagamento={pagamento} /> : <PagarSaida dadosPagamento={pagamento} />}
            </Dialog>
        )}
    </>)
}

export default DialogsFluxoCaixa
