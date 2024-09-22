import PagarEntrada from '@/Pages/Admin/Financeiro/FluxoCaixa/Components/PagarEntrada.jsx';
import PagarSaida from '@/Pages/Admin/Financeiro/FluxoCaixa/Components/PagarSaida.jsx';
import React, { useContext, useEffect, useState } from 'react';
import { Dialog, DialogContent } from '@mui/material';
import CardContainer from '@/Components/Cards/CardContainer.jsx';
import CardBody from '@/Components/Cards/CardBody.jsx';
import InfoNota from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/InfoNota.jsx';
import CardTable from '@/Components/Cards/CardTable.jsx';
import { Files } from 'react-bootstrap-icons';
import { useForm } from '@inertiajs/inertia-react';
import { router } from '@inertiajs/react';
import { ContextFluxoCaixa } from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/ContextFluxoCaixa.jsx';

const RealizarPagamento = ({ nota, pagamento, open, close }) => {

    const { setAtualizarRegistros } = useContext(ContextFluxoCaixa);

    const { data, setData } = useForm();

    const [opcoes, setOpcoes] = useState();

    useEffect(() => {
        axios.get(route('admin.financeiro.opcoes'))
            .then(res => setOpcoes(res.data));
    }, []);

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.financeiro.fluxo-caixa.atualizar-pagamento'),
            { ...data, 'pagamento_id': pagamento?.id },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setAtualizarRegistros(e => !e);
                    close(false);
                },
            });
    };

    return (
        <Dialog
            open={open}
            onClose={() => close(false)}
            fullWidth
            maxWidth="xl"
            PaperProps={{
                sx: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',              // Remove a sombra para um visual consistente
                },
            }}>
            <DialogContent>
                <CardContainer>
                    <CardBody>
                        {nota && <>
                            <CardContainer>
                                <CardBody>
                                    <InfoNota nota={nota} />
                                </CardBody>
                            </CardContainer>

                            <CardContainer>
                                <CardTable title="Pagamentos" icon={<Files size={22} />}>
                                    {nota.tipo === 'entrada'
                                        ? <PagarEntrada
                                            pagamento={pagamento}
                                            opcoes={opcoes}
                                            setData={setData}
                                            submit={submit}
                                        />
                                        : <PagarSaida
                                            pagamento={pagamento}
                                            opcoes={opcoes}
                                            setData={setData}
                                            submit={submit} />
                                    }
                                </CardTable>
                            </CardContainer>
                        </>}
                    </CardBody>
                </CardContainer>
            </DialogContent>
        </Dialog>
    );
};
export default RealizarPagamento;
