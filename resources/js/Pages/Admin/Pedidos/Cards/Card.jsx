import CardPedidos from "./CardPedidos";
import MenuMore from './Menu';
import avancarStatus from "./AvancarStatus";
import Alert from "@mui/material/Alert";
import React from "react";

function AlertsCard({dados}) {
    return (
        <>
            {dados.prazos.prazo_atrasado && <Alert severity='error' className='mb-2'>Pedido com Atrasos</Alert>}
            {dados.infos.alerta && <Alert severity='warning' className='mb-2'>{dados.infos.alerta}</Alert>}
        </>
    )
}

export default function Card({dados, status, cor, permissoesStatus}) {

    return <CardPedidos
        dados={dados}
        menuMore={<MenuMore id={dados.id} status={status}/>}
        btnAvancaStatus={permissoesStatus.some(item => item === dados.status) ? avancarStatus(dados.id, status, dados.infos.situacao) : ''}
        alerts={<AlertsCard dados={dados}/>}
        border={cor}/>
}
