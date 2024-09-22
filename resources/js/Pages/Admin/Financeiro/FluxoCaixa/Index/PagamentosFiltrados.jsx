import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import React, { useContext, useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { TbArrowDown, TbArrowUp } from 'react-icons/tb';
import InfoNota from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/InfoNota.jsx';
import Pagamentos from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/Pagamentos.jsx';
import { ContextFluxoCaixa } from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/ContextFluxoCaixa.jsx';

const PagamentosFiltrados = ({ filtros }) => {
    const [registros, setRegistros] = useState([]);
    const { atualizarRegistros } = useContext(ContextFluxoCaixa);

    useEffect(() => {
        fethRegistros();
    }, [filtros, atualizarRegistros]);

    const fethRegistros = async () => {
        await axios
            .get(
                route('admin.financeiro.fluxo-caixa.registros-filtrados', {
                    ...filtros,
                }),
            )
            .then((res) => setRegistros(res.data));
    };


    return (
        registros?.length > 0 &&
        registros.map((item) => {
            const isEntrada = item.tipo === 'entrada';

            return (
                <CardContainer map={item.id}>
                    <CardBody>
                        <div className="row">
                            <div className="col-1">
                                <Stack spacing={1} alignItems="center">
                                    {isEntrada ? <TbArrowUp size={35} color="green" /> : <TbArrowDown size={35} color="red" />}
                                    <Typography>{`${item?.pagos_qtd}/${item?.pagamentos_qtd}`}</Typography>
                                </Stack>
                            </div>
                            <div className="col-11">
                                <InfoNota nota={item} />
                                <Pagamentos pagamentos={item} />
                            </div>
                        </div>
                    </CardBody>
                </CardContainer>
            );
        })
    );
};
export default PagamentosFiltrados;
