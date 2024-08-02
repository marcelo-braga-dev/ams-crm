import * as React from "react";
import CardContainer from "@/Components/Cards/CardContainer";
import CardBody from "@/Components/Cards/CardBody";
import {router} from "@inertiajs/react";
import {Stack, Typography} from "@mui/material";

export default function HistoricoPedidos({historicos}) {
    return (
        <>
            {historicos.map(item => (
                <CardContainer>
                    <CardBody>
                        <div className="row justify-content-between cursor-pointer"
                             onClick={() => router.get(route('admin.pedidos.show', item.id))}>
                            <Stack spacing={1}>
                                <Typography variant="body1"><b>ID do Pedido:</b> #{item.id}</Typography>
                                <Typography variant="body1"><b>Status:</b> {item.status}</Typography>
                                <Typography variant="body1"><b>Valor:</b> R$ {item.valor}</Typography>
                                <Typography variant="body1"><b>Consultor(a):</b> {item.consultor}</Typography>
                                <Typography variant="body1"><b>Data do Pedido:</b> {item.data_criacao}</Typography>
                            </Stack>
                        </div>
                    </CardBody>
                </CardContainer>
            ))}
            {historicos.length === 0 && <div className="row text-center">
                <span>Não há histórico de pedidos.</span>
            </div>}
        </>
    )
}
