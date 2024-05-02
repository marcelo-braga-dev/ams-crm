import Layout from "@/Layouts/VendedorLayout/LayoutConsultor";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import { sum } from "lodash";
import { router } from "@inertiajs/react";

export default function ({ vendas, usuario, periodo }) {
    const total = sum(vendas.map(item => item.valor))

    return (
        <Layout titlePage="Vendas do Período"
            voltar={route('consultor.relatorios.metas.index')}>
            <div className="mb-4 card card-body">
                <div className="row">
                    <div className="mb-2 col">
                        <h6>{usuario.nome}</h6>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <span className="d-block">Período: {periodo}</span>
                    </div>
                    <div className="col">
                        <span className="d-block">Total: R$ {convertFloatToMoney(total)}</span>
                    </div>
                    <div className="col">
                        <span className="d-block">Qtd. Pedidos: {vendas?.length}</span>
                    </div>
                </div>
            </div>

            <div className="mb-4 card card-body">
                <div className="table-responsive">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>ID do Pedido</th>
                                <th>Data</th>
                                <th></th>
                                <th>Status Atual</th>
                                <th>Valor</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendas.map(item => {
                                return (
                                    <tr key={item.id} className="cursor-pointer" onClick={() => router.get(route('consultor.pedidos.show', item.id))}>
                                        <td className="text-center col-1">#{item.id}</td>
                                        <td>{item.data}</td>
                                        <td>
                                            <b>Cliente:</b> {item.cliente}<br />
                                            <b>Integrador:</b> {item.lead}
                                        </td>
                                        <td>{item.status}</td>
                                        <td>R$ {convertFloatToMoney(item.valor)}</td>
                                        <td>
                                            <a className="btn btn-primary"
                                                href={route('consultor.pedidos.show', item.id)}>Ver</a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}