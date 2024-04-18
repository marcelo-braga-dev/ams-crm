import Layout from "@/Layouts/AdminLayout/LayoutAdmin";
import convertFloatToMoney from "@/Helpers/converterDataHorario";
import { sum } from "lodash";
import { router } from "@inertiajs/react";

export default function ({ vendas, usuario, periodo }) {

    const total = sum(vendas.map(item => item.valor))

    return (
        <Layout titlePage="Vendas Realizadas" menu="menu-meta-vendas" submenu="meta-vendas"
            voltar={route('admin.dashboard.vendas.index')}>
            <div className="card card-body mb-4">
                <div className="row">
                    <div className="col mb-2">
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

            <div className="card card-body mb-4">
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
                                    <tr key={item.id} className="cursor-pointer" onClick={() => router.get(route('admin.pedidos.show', item.id))}>
                                        <td className="text-center col-1">#{item.id}</td>
                                        <td>{item.data}</td>
                                        <td>
                                            <b>Integrador:</b> {item.lead}<br />
                                            <b>Cliente:</b> {item.cliente}<br />
                                        </td>
                                        <td>{item.status}</td>
                                        <td>R$ {convertFloatToMoney(item.valor)}</td>
                                        <td>
                                            <a className="btn btn-primary"
                                                href={route('admin.pedidos.show', item.id)}>Ver</a>
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
