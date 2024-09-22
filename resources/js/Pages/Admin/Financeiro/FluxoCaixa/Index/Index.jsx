import Layout from '@/Layouts/Layout';
import React, { useEffect, useState } from 'react';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import Filtros from './Filtros.jsx';
import CreateDialog from '../Create/CreateDialog.jsx';
import ProximosPagamentos from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/ProximosPagamentos.jsx';
import PagamentosFiltrados from '@/Pages/Admin/Financeiro/FluxoCaixa/Index/PagamentosFiltrados.jsx';

import { ProviderFluxoCaixa } from './ContextFluxoCaixa.jsx';
import { Button } from '@mui/material';
import { TbHistory } from 'react-icons/tb';
import { Link } from '@inertiajs/inertia-react';

export default function({ fornecedores, franquias, empresas }) {
    const [filtros, setFiltros] = useState({
        tipo: '',
        status: '',
        fornecedor: '',
        franquia: '',
        empresa: '',
        periodoInicio: '',
        periodoFim: '',
    });

    return (
        <Layout titlePage="Fluxo de Caixa" menu="financeiro" submenu="fluxo-caixa">
            <ProviderFluxoCaixa>
                <div className="mb-2 row justify-content-ce nter">
                    <div className="col-md-8">
                        <Filtros filtros={filtros} setFiltros={setFiltros} empresas={empresas} franquias={franquias} fornecedores={fornecedores} />
                        <div className="row justify-content-between">
                            <div className="col">
                                <CreateDialog />
                            </div>
                            <div className="col-auto">
                                <Button
                                    startIcon={<TbHistory />}
                                    component={Link}
                                >
                                    Histórico Pagamentos
                                </Button>
                            </div>
                        </div>

                        <PagamentosFiltrados filtros={filtros} />
                    </div>
                    <div className="col-md-4">
                        <ProximosPagamentos />
                    </div>
                </div>
            </ProviderFluxoCaixa>
        </Layout>
    );
}
